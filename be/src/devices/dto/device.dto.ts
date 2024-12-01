import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { DeviceLocationType } from "../types/location-device.type";
import { PartialType } from "@nestjs/mapped-types";
import { Transform, Type } from "class-transformer";
import { transformToNumber } from "src/common/transforms/transform";

export class DeviceLocationDto {
  @IsOptional()
  @IsNumber()
  @Transform(transformToNumber)
  longitude: number;

  @IsOptional()
  @IsNumber()
  @Transform(transformToNumber)
  latitude: number;

  @IsOptional()
  @IsString()
  name: string;
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
  @Transform(transformToNumber)
  id: number;
}