import { Transform } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { transformToNumber } from "src/common/transforms/transform";

export class HistoryRequest {
  @IsNotEmpty()
  @IsNumber()
  @Transform(transformToNumber)
  deviceId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}