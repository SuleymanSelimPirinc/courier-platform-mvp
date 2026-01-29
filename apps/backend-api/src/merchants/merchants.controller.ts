import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';

@Controller('merchants')
export class MerchantsController {
    constructor(private readonly merchantsService: MerchantsService) { }

    // 1. Tüm Esnafları Getir
    @Get()
    getAllMerchants() {
        return this.merchantsService.findAll();
    }

    // 2. Tek Esnaf Getir
    @Get(':id')
    getMerchant(@Param('id') id: string) {
        return this.merchantsService.findOne(id);
    }

    // 3. Yeni Esnaf Oluştur
    @Post()
    createMerchant(@Body() createMerchantDto: CreateMerchantDto) {
        return this.merchantsService.create(createMerchantDto);
    }

    // 4. Esnaf Güncelle
    @Patch(':id')
    updateMerchant(
        @Param('id') id: string,
        @Body() updateMerchantDto: UpdateMerchantDto,
    ) {
        return this.merchantsService.update(id, updateMerchantDto);
    }

    // 5. Doğrulama Durumu Güncelle (Admin işlemi)
    @Patch(':id/verify')
    updateVerification(
        @Param('id') id: string,
        @Body() updateVerificationDto: UpdateVerificationDto,
    ) {
        return this.merchantsService.updateVerificationStatus(
            id,
            updateVerificationDto.status,
        );
    }

    // 6. Esnaf Sil
    @Delete(':id')
    deleteMerchant(@Param('id') id: string) {
        return this.merchantsService.delete(id);
    }
}
