import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateHistory } from './entities/state-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StateHistory])],
  controllers: [HistoriesController],
  providers: [HistoriesService],
  exports: [HistoriesService]
})
export class HistoriesModule {}
