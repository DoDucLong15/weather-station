import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';
import { DeviceEntity } from './entities/device.entity';
import { Any, DeleteResult } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/authentication/guard/accessToken.guard';

@ApiTags('DeviceService')
@ApiBearerAuth()
@Controller('devices')
@UseGuards(AccessTokenGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  public async createDevice(@Body() request: CreateDeviceDto, @Req() req: Request): Promise<DeviceEntity> {
    // @ts-ignore
    return await this.devicesService.createDevice(request, req.user['email']);
  }

  @Patch()
  public async updateDevice(@Body() request: UpdateDeviceDto, @Req() req: Request): Promise<DeviceEntity> {
    // @ts-ignore
    return await this.devicesService.updateDevice(request, req.user['email']);
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
  public async getDevices(@Req() req: Request): Promise<DeviceEntity[]> {
    return await this.devicesService.getDevices({
      where: [
        // @ts-ignore
        {owner: req.user['email']},
        // @ts-ignore
        {sharedMails: Any([req.user['email']])}
      ]
    });
  }

  @Delete('/:id')
  public async deleteDevice(@Param('id') id: number, @Req() req: Request): Promise<DeleteResult> {
    // @ts-ignore
    return await this.devicesService.deleteDevice(id, req.user['email']);
  }
}
