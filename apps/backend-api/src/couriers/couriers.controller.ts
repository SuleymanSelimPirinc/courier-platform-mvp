import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('couriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) { }

  // 1. Tüm Kuryeleri Getir
  @Get()
  getAllCouriers() {
    return this.couriersService.findAll();
  }

  // 2. Yeni Kurye Oluştur (DTO ile)
  @Post()
  createCourier(@Body() createCourierDto: CreateCourierDto) {
    return this.couriersService.create(createCourierDto);
  }

  // 3. Kurye Konumunu Güncelle (ID ve DTO ile)
  @Patch(':id/location')
  updateCourierLocation(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.couriersService.updateLocation(id, updateLocationDto);
  }

  // Puan verme (Esnaf -> Kurye)
  @Post(':id/rate')
  rateCourier(
    @Param('id') id: string,
    @Body('score') score: number,
  ) {
    return this.couriersService.rateCourier(id, score);
  }
}
