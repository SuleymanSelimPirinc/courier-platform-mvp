import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouriersModule } from './couriers/couriers.module'; // <-- Yeni Modülümüz

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'courier_platform',
      autoLoadEntities: true, // Entity'leri otomatik bulur (Artık manuel yazmaya gerek yok)
      synchronize: true,
    }),
    CouriersModule, // <-- BURAYA EKLEDIK
  ],
})
export class AppModule {}
