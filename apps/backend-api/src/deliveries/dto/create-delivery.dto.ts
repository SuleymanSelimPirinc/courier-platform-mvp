import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
    @IsNumber()
    @IsNotEmpty()
    lat: number;

    @IsNumber()
    @IsNotEmpty()
    lng: number;
}

export class CreateDeliveryDto {
    @IsString()
    @IsNotEmpty()
    pickupAddress: string;

    @ValidateNested()
    @Type(() => LocationDto)
    @IsNotEmpty()
    pickupLocation: LocationDto;

    @IsString()
    @IsNotEmpty()
    dropoffAddress: string;

    @ValidateNested()
    @Type(() => LocationDto)
    @IsNotEmpty()
    dropoffLocation: LocationDto;

    @IsString()
    @IsNotEmpty()
    packageDescription: string;

    @IsNumber()
    @IsOptional()
    estimatedPrice?: number;

    @IsString()
    @IsOptional()
    notes?: string;
}
