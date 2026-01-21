import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourierEntity } from './courier.entity';
import { CreateCourierDto } from './dto/create-courier.dto';
import { CourierStatus } from '@courier/types';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class CouriersService {
  constructor(
    @InjectRepository(CourierEntity)
    private courierRepo: Repository<CourierEntity>,
  ) {}

  findAll() {
    return this.courierRepo.find();
  }

  // Yeni Kurye Oluşturma
  async create(createCourierDto: CreateCourierDto) {
    const courier = this.courierRepo.create({
      ...createCourierDto,
      status: createCourierDto.status || CourierStatus.OFFLINE,
      score: 5.0,
    });
    return this.courierRepo.save(courier);
  }

  // Konum Güncelleme
  async updateLocation(id: string, updateLocationDto: UpdateLocationDto) {
    await this.courierRepo.update(id, {
      currentLocation: {
        lat: updateLocationDto.lat,
        lng: updateLocationDto.lng,
      },
    });
    return this.courierRepo.findOneBy({ id });
  }
}
