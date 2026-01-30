import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourierEntity } from './courier.entity';
import { CreateCourierDto } from './dto/create-courier.dto';
import { CourierStatus, PackageSize, VehicleType } from '@courier/types';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class CouriersService {
  constructor(
    @InjectRepository(CourierEntity)
    private courierRepo: Repository<CourierEntity>,
  ) { }

  findAll() {
    return this.courierRepo.find({
      order: {
        score: 'DESC', // Internal score'a göre sırala (şimdilik public score yoksa)
      },
    });
  }

  create(dto: CreateCourierDto) {
    const courier = this.courierRepo.create(dto);
    return this.courierRepo.save(courier);
  }

  // Konum Güncelleme
  async updateLocation(id: string, dto: UpdateLocationDto) {
    await this.courierRepo.update(id, {
      currentLocation: { lat: dto.lat, lng: dto.lng },
    });
    return this.courierRepo.findOneBy({ id });
  }

  // Puan verme (Esnaf -> Kurye)
  async rateCourier(id: string, score: number) {
    if (score < 1 || score > 5) {
      throw new Error('Puan 1 ile 5 arasında olmalıdır.');
    }

    const courier = await this.courierRepo.findOneBy({ id });
    if (!courier) {
      throw new Error('Kurye bulunamadı.');
    }

    courier.totalRating += score;
    courier.ratingCount += 1;

    // Eski score kolonunu da güncelle (basit ortalama olarak tutuyoruz şimdilik)
    courier.score = Number(courier.averageRating.toFixed(2));

    return this.courierRepo.save(courier);
  }

  // Internal Score Hesaplama (Eşleştirme Algoritması için)
  calculateInternalScore(
    courier: CourierEntity,
    distanceKm: number,
    deliveryType: PackageSize | 'FOOD'
  ): number {
    const wDistance = 0.30;
    const wVehicle = 0.10;
    const wRating = 0.25;
    const wSuccess = 0.15;
    const wTime = 0.10;
    const wCancel = 0.05;
    const wActive = 0.05;

    // 1. Mesafe Skoru (Max 15km varsayımı)
    const maxDist = 15;
    const scoreDistance = Math.max(0, 1 - (distanceKm / maxDist));

    // 2. Araç Uyumu
    const scoreVehicle = this.getVehicleSuitability(courier.vehicleType, distanceKm, deliveryType);

    // 3. Kurye Puanı (1-5 arası -> 0-1 arası)
    const scoreRating = courier.averageRating / 5.0;

    // 4. Başarı Oranı
    const totalAssigned = courier.assignedDeliveries || 1; // Sıfıra bölme hatası önlemi
    const scoreSuccess = (courier.completedDeliveries || 0) / totalAssigned;

    // 5. Zamanında Teslim
    const totalCompleted = courier.completedDeliveries || 1;
    const scoreTime = (courier.onTimeDeliveries || 0) / totalCompleted;

    // 6. İptal Oranı (Tersi makbul)
    const scoreCancel = 1 - ((courier.cancelledDeliveries || 0) / totalAssigned);

    // 7. Aktiflik (Ortalama 300dk online varsayımı)
    const avgOnline = 300 * 5; // Örnek
    const scoreActive = Math.min(1, (courier.totalOnlineMinutes || 0) / avgOnline);

    const internalScore =
      (scoreDistance * wDistance) +
      (scoreVehicle * wVehicle) +
      (scoreRating * wRating) +
      (scoreSuccess * wSuccess) +
      (scoreTime * wTime) +
      (scoreCancel * wCancel) +
      (scoreActive * wActive);

    return Number(internalScore.toFixed(4));
  }

  private getVehicleSuitability(vehicle: VehicleType, distanceKm: number, type: PackageSize | 'FOOD'): number {
    // Matris mantığı
    if (type === PackageSize.XLARGE) {
      if (vehicle === VehicleType.TRUCK || vehicle === VehicleType.VAN) return 1.0;
      return 0.0;
    }

    // Mesafeye göre basit mantık (Plan'daki matrisin özeti)
    if (distanceKm < 3) {
      if (vehicle === VehicleType.BICYCLE || vehicle === VehicleType.WALKER) return 1.0;
      if (vehicle === VehicleType.MOTORCYCLE) return 0.9;
      return 0.5;
    } else if (distanceKm < 10) {
      if (vehicle === VehicleType.MOTORCYCLE) return 1.0;
      if (vehicle === VehicleType.CAR) return 0.9;
      return 0.4;
    } else {
      if (vehicle === VehicleType.CAR) return 1.0;
      if (vehicle === VehicleType.MOTORCYCLE) return 0.7;
      return 0.2;
    }
  }
}
