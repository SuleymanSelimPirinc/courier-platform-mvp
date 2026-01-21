import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { CourierStatus } from '@courier/types';

export class CreateCourierDto {
  @IsString()
  @IsNotEmpty()
  name: string; // İsim olmak ZORUNDA

  @IsEnum(CourierStatus)
  @IsOptional()
  status?: CourierStatus; // Durum göndermek isteğe bağlı (default: OFFLINE yaparız)
}
