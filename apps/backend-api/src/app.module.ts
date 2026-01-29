import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouriersModule } from './couriers/couriers.module';
import { MerchantsModule } from './merchants/merchants.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'courier_platform',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CouriersModule,
    MerchantsModule, // Esnaf modülü eklendi
  ],
})
export class AppModule { }

