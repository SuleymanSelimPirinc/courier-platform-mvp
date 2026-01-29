import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MerchantEntity } from './merchant.entity';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { VerificationStatus, MerchantCategory } from '@courier/types';

@Injectable()
export class MerchantsService {
    constructor(
        @InjectRepository(MerchantEntity)
        private merchantRepo: Repository<MerchantEntity>,
    ) { }

    // Tüm esnafları getir
    findAll() {
        return this.merchantRepo.find();
    }

    // Tek esnaf getir
    async findOne(id: string) {
        const merchant = await this.merchantRepo.findOneBy({ id });
        if (!merchant) {
            throw new NotFoundException(`Esnaf bulunamadı: ${id}`);
        }
        return merchant;
    }

    // Yeni esnaf oluştur
    async create(createMerchantDto: CreateMerchantDto) {
        const merchant = this.merchantRepo.create({
            ...createMerchantDto,
            category: createMerchantDto.category || MerchantCategory.RESTAURANT,
            verificationStatus: VerificationStatus.PENDING,
        });
        return this.merchantRepo.save(merchant);
    }

    // Esnaf güncelle
    async update(id: string, updateMerchantDto: UpdateMerchantDto) {
        const merchant = await this.findOne(id);
        Object.assign(merchant, updateMerchantDto);
        return this.merchantRepo.save(merchant);
    }

    // Doğrulama durumunu güncelle
    async updateVerificationStatus(id: string, status: VerificationStatus) {
        const merchant = await this.findOne(id);
        merchant.verificationStatus = status;
        return this.merchantRepo.save(merchant);
    }

    // Esnaf sil
    async delete(id: string) {
        const merchant = await this.findOne(id);
        return this.merchantRepo.remove(merchant);
    }
}
