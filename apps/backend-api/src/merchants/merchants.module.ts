import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantEntity } from './merchant.entity';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MerchantEntity])],
    controllers: [MerchantsController],
    providers: [MerchantsService],
    exports: [MerchantsService], // Diğer modüller kullanabilsin
})
export class MerchantsModule { }
