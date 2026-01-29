import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsEnum,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MerchantCategory } from '@courier/types';

// Konum için nested DTO
class LocationDto {
    @IsNotEmpty()
    lat: number;

    @IsNotEmpty()
    lng: number;
}

// Esnaf kaydı için DTO
export class RegisterMerchantDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

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
}

// Kurye kaydı için DTO
export class RegisterCourierDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}
