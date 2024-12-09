import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateHistory } from './entities/state-history.entity';
import { Repository } from 'typeorm';
import { DashboardFilter } from './dto/dashboard.dto';
import { DateUtils } from 'src/utils/date.util';
import { HistoryRequest } from './dto/history.dto';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(StateHistory)
    private readonly repository: Repository<StateHistory>
  ){}

  public async getDashboard(query: DashboardFilter): Promise<any> {
    const data = await this.repository.createQueryBuilder()
      .select('AVG(temperature)', 'avgTemperature')
      .addSelect('AVG(humidity)', 'avgHumidity')
      .where('SPLIT_PART(time, \' \', 1) = :today', { today: DateUtils.getTodayWithTimezone() })
      .andWhere('device_id = :deviceId', {deviceId: query.deviceId})
      .getRawOne()
    return {
      date: DateUtils.getTodayWithTimezone(),
      temperature: data.avgTemperature,
      humidity: data.avgHumidity
    }
  }

  public async getHistory(request: HistoryRequest) {
    const data = await this.repository.createQueryBuilder()
      .where('SPLIT_PART(time, \' \', 1) >= :startDate', { startDate: request.startDate })
      .andWhere('SPLIT_PART(time, \' \', 1) <= :endDate', { endDate: request.endDate })
      .andWhere('device_id = :deviceId', {deviceId: request.deviceId})
      .getMany();
    return this.processData(data, `${request.startDate} 00:00:00`, `${request.endDate} 23:59:59`);
  }

  private processData(data: any[], startTime: string, endTime: string) {
    const result: any[] = [];
    if(data.length === 0) return result;
    const interval = 2 * 60 * 60 * 1000; // 2 giờ tính bằng milliseconds

    // Sắp xếp dữ liệu theo thời gian
    data.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    
    let currentStartTime = new Date(startTime);
    let currentEndTime = new Date(currentStartTime.getTime() + interval);
    let tempSum = 0;
    let humiditySum = 0;
    let count = 0;

    while(!(new Date(data[0].time) >= new Date(currentStartTime) && new Date(data[0].time) < new Date(currentEndTime)) && currentEndTime <= new Date(endTime)) {
      const {year, month, day, hours, minutes, seconds} = DateUtils.parseDateWithTimezone(currentStartTime, 7);
      result.push({
        time: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
        avgTemperature: 0,
        avgHumidity: 0
      })
      currentStartTime = currentEndTime;
      currentEndTime = new Date(currentStartTime.getTime() + interval);
    }
    if(currentEndTime === new Date(endTime)) return result;

    for(const record of data) {
      const recordTime = new Date(record.time);
      if (recordTime < currentEndTime) {
        tempSum += record.temperature;
        humiditySum += record.humidity;
        count++;
      } else {
        const avgTemp = tempSum / count;
        const avgHumidity = humiditySum / count;
        const {year, month, day, hours, minutes, seconds} = DateUtils.parseDateWithTimezone(currentStartTime, 7);
        result.push({
          time: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
          avgTemperature: avgTemp,
          avgHumidity: avgHumidity
        });

        currentStartTime = currentEndTime;
        currentEndTime = new Date(currentStartTime.getTime() + interval);
        while(!(new Date(record.time) >= new Date(currentStartTime) && new Date(record.time) < new Date(currentEndTime)) && currentEndTime <= new Date(endTime)) {
          const {year, month, day, hours, minutes, seconds} = DateUtils.parseDateWithTimezone(currentStartTime, 7);
          result.push({
            time: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
            avgTemperature: 0,
            avgHumidity: 0
          })
          currentStartTime = currentEndTime;
          currentEndTime = new Date(currentStartTime.getTime() + interval);
        }
        if(currentEndTime === new Date(endTime)) break;
        
        tempSum = record.temperature;
        humiditySum = record.humidity;
        count = 1;
      }
    }

    if (count > 0) {
      const avgTemp = tempSum / count;
      const avgHumidity = humiditySum / count;
      const {year, month, day, hours, minutes, seconds} = DateUtils.parseDateWithTimezone(currentStartTime, 7);
      result.push({
        time: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
        avgTemperature: avgTemp,
        avgHumidity: avgHumidity
      });
    }

    return result;
  }
}
