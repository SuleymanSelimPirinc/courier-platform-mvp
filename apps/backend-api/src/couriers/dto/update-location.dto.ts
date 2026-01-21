import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class UpdateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(-90) // Dünya'nın sınırlarını aşmasın :)
  @Max(90)
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  lng: number;
}
