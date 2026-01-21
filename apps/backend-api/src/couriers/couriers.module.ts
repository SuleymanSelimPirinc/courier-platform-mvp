import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourierEntity } from './courier.entity';
import { CouriersService } from './couriers.service';
import { CouriersController } from './couriers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourierEntity])], // Entity'i içeri al
  controllers: [CouriersController],
  providers: [CouriersService],
})
export class CouriersModule {}
