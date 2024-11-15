import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceEntity } from './entities/device.entity';
import { DeleteResult, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';

@Injectable()
export class DevicesService {
  private TAG: string = 'DeviceService'
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>
  ){}

  public async createDevice(dto: CreateDeviceDto): Promise<DeviceEntity> {
    Logger.debug('Create Device', this.TAG);
    return await this.deviceRepository.save(dto);
  }

  public async getDevice(options: FindOneOptions<DeviceEntity>): Promise<DeviceEntity | null> {
    Logger.debug('Get Device', this.TAG);
    return await this.deviceRepository.findOne(options)
  }

  public async getDevices(options?: FindManyOptions<DeviceEntity>): Promise<DeviceEntity[]> {
    Logger.debug('Get Devices', this.TAG);
    return await this.deviceRepository.find(options);
  }

  public async updateDevice(dto: UpdateDeviceDto): Promise<DeviceEntity> {
    Logger.debug('Update Device', this.TAG);
    const device = await this.getDevice({
      where: {
        id: dto.id
      }
    });
    if(!device) {
      throw new NotFoundException(`Device ${dto.id} not found!`);
    }
    const deviceUpdated = {
      ...device,
      ...dto
    };
    return await this.deviceRepository.save(deviceUpdated);
  }

  public async deleteDevice(id: number): Promise<DeleteResult> {
    Logger.debug('Delete Device', this.TAG);
    const device = await this.getDevice({
      where: {
        id: id
      }
    });
    if(!device) {
      throw new NotFoundException(`Device ${id} not found!`);
    }
    return await this.deviceRepository.delete(id);
  }
}
