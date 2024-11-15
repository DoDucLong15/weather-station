import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';
import { DeviceEntity } from './entities/device.entity';
import { DeleteResult } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('DeviceService')
@ApiBearerAuth()
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  public async createDevice(@Body() request: CreateDeviceDto): Promise<DeviceEntity> {
    return await this.devicesService.createDevice(request);
  }

  @Patch()
  public async updateDevice(@Body() request: UpdateDeviceDto): Promise<DeviceEntity> {
    return await this.devicesService.updateDevice(request);
  }

  @Get('/:id')
  public async getDevice(@Param('id') id: number): Promise<DeviceEntity | any> {
    return await this.devicesService.getDevice({
      where: {
        id: id
      },
      relations: {
        stateHistories: true
      }
    }) ?? {};
  }

  @Get()
  public async getDevices(): Promise<DeviceEntity[]> {
    return await this.devicesService.getDevices();
  }

  @Delete('/:id')
  public async deleteDevice(@Param('id') id: number): Promise<DeleteResult> {
    return await this.devicesService.deleteDevice(id);
  }
}
