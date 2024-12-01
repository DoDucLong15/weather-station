import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import { Cron, CronExpression } from '@nestjs/schedule';
import { connect, MqttClient } from 'mqtt';
import { configuration } from 'src/config/configuration';
import { DevicesService } from 'src/devices/devices.service';
import { HistoriesService } from 'src/histories/histories.service';
import { WEATHER_TOPIC } from './constants/topic.constant';
import { WeatherType } from './types/weather.type';
import { InjectRepository } from '@nestjs/typeorm';
import { StateHistory } from 'src/histories/entities/state-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MqttService {
  public readonly mqttClient: MqttClient;

  constructor(
    private readonly deviceService: DevicesService,
    private readonly historyService: HistoriesService,
    @InjectRepository(StateHistory)
    private readonly stateHistoryRepository: Repository<StateHistory>
  ){
    const configService = new ConfigService(configuration());
    const host = configService.get('mqtt.host');
    const port = configService.get('mqtt.port');
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const connectUrl = `tcp://${host}`;

    this.mqttClient = connect(connectUrl, {
      port: port,
      clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });
    // console.log(clientId);

    this.mqttClient.on("connect", function () {
      Logger.verbose("Connected to CloudMQTT");
    });

    this.mqttClient.subscribe(WEATHER_TOPIC, (err: any) => {
      Logger.error(err);
    })

    this.mqttClient.on("error", function (error: any) {
      Logger.error(error, "Error in connecting to CloudMQTT");
    });

    this.mqttClient.on("message", async (topic: any, payload: any) => {
      try {
        const message: WeatherType = JSON.parse(payload.toString());
        if(topic !== WEATHER_TOPIC || !message || !message.embedId || isNaN(message.humidity) || isNaN(message.temperature)) return;
        const device = await this.deviceService.getDevice({
          where: {
            embedId: message.embedId
          }
        });
        if(!device) {
          Logger.error(`Device embedId ${message.embedId} not found!`);
          return;
        }
        await this.stateHistoryRepository.save({
          ...message,
          device: device
        });
        Logger.verbose(`Save data sucess!`);
      } catch (error) {
        Logger.verbose(`Save data failed!`);
      }   
    });
  }
}
