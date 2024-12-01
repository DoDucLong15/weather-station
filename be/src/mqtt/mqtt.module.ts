import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { DevicesModule } from 'src/devices/devices.module';
import { HistoriesModule } from 'src/histories/histories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateHistory } from 'src/histories/entities/state-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StateHistory]), DevicesModule, HistoriesModule],
  controllers: [MqttController],
  providers: [MqttService],
  exports: [MqttService]
})
export class MqttModule {}
