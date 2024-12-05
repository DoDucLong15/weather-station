import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { transformToNumber } from "src/common/transforms/transform";

export class DashboardFilter {
  @IsNotEmpty()
  @IsNumber()
  @Transform(transformToNumber)
  deviceId: number;
}