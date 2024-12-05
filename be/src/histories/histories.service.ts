import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateHistory } from './entities/state-history.entity';
import { Repository } from 'typeorm';
import { DashboardFilter } from './dto/dashboard.dto';
import { DateUtils } from 'src/utils/date.util';

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
}
