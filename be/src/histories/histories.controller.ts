import { Controller, Get, Query } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { DashboardFilter } from './dto/dashboard.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HistoryRequest } from './dto/history.dto';

@ApiTags('State History')
@ApiBearerAuth()
@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Get('dashboard')
  async getDashboard(@Query() query: DashboardFilter): Promise<any> {
    return await this.historiesService.getDashboard(query);
  }

  @Get('analytics')
  async getHistory(@Query() query: HistoryRequest): Promise<any> {
    return await this.historiesService.getHistory(query);
  }
}
