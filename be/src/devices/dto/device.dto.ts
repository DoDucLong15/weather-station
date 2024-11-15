import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { DeviceLocationType } from "../types/location-device.type";
import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";

export class DeviceLocationDto {
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;
}

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  deviceName: string;

  @IsNotEmpty()
  @IsString()
  embedId: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DeviceLocationDto)
  location: DeviceLocationDto;
}

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}