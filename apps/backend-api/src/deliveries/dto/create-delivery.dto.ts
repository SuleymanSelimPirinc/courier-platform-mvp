import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    ValidateNested,
    IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PackageSize } from '@courier/types';

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

    @IsEnum(PackageSize)
    @IsNotEmpty()
    packageSize: PackageSize;

    @IsNumber()
    @IsOptional()
    estimatedPrice?: number;

    @IsString()
    @IsOptional()
    notes?: string;
}
