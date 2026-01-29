import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsOptional,
    IsEmail,
    ValidateNested,
    IsNumber,
    IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MerchantCategory } from '@courier/types';

// Konum için nested DTO
class LocationDto {
    @IsNumber()
    @IsNotEmpty()
    lat: number;

    @IsNumber()
    @IsNotEmpty()
    lng: number;
}

// Çalışma saatleri için nested DTO
class WorkingHoursDto {
    @IsString()
    @IsNotEmpty()
    open: string;

    @IsString()
    @IsNotEmpty()
    close: string;
}

export class CreateMerchantDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(MerchantCategory)
    @IsOptional()
    category?: MerchantCategory;

    @IsString()
    @IsNotEmpty()
    taxNumber: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @ValidateNested()
    @Type(() => LocationDto)
    @IsNotEmpty()
    location: LocationDto;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WorkingHoursDto)
    @IsOptional()
    workingHours?: WorkingHoursDto[];
}
