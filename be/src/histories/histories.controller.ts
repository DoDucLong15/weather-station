import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { DashboardFilter } from './dto/dashboard.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HistoryRequest } from './dto/history.dto';
import { AccessTokenGuard } from 'src/authentication/guard/accessToken.guard';

@ApiTags('State History')
@ApiBearerAuth()
@Controller('histories')
@UseGuards(AccessTokenGuard)
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
