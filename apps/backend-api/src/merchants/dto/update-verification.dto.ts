import { IsEnum, IsNotEmpty } from 'class-validator';
import { VerificationStatus } from '@courier/types';

export class UpdateVerificationDto {
    @IsEnum(VerificationStatus)
    @IsNotEmpty()
    status: VerificationStatus;
}
