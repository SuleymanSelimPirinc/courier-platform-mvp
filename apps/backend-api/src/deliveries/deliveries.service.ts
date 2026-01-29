import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryEntity } from './delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryStatus, UserRole, CourierStatus } from '@courier/types';
import { CourierEntity } from '../couriers/courier.entity';

@Injectable()
export class DeliveriesService {
    constructor(
        @InjectRepository(DeliveryEntity)
        private deliveryRepo: Repository<DeliveryEntity>,
        @InjectRepository(CourierEntity)
        private courierRepo: Repository<CourierEntity>,
    ) { }

    // Teslimat oluştur (esnaf)
    async create(merchantId: string, dto: CreateDeliveryDto) {
        const delivery = this.deliveryRepo.create({
            merchantId,
            ...dto,
            status: DeliveryStatus.PENDING,
        });
        return this.deliveryRepo.save(delivery);
    }

    // Tüm teslimatları getir
    findAll() {
        return this.deliveryRepo.find({
            relations: ['merchant', 'courier'],
            order: { createdAt: 'DESC' },
        });
    }

    // Bekleyen teslimatlar (kuryeler için)
    findPending() {
        return this.deliveryRepo.find({
            where: { status: DeliveryStatus.PENDING },
            relations: ['merchant'],
            order: { createdAt: 'ASC' },
        });
    }

    // Kullanıcının teslimatları
    async findMy(userId: string, role: UserRole) {
        if (role === UserRole.MERCHANT) {
            return this.deliveryRepo.find({
                where: { merchantId: userId },
                relations: ['courier'],
                order: { createdAt: 'DESC' },
            });
        } else {
            return this.deliveryRepo.find({
                where: { courierId: userId },
                relations: ['merchant'],
                order: { createdAt: 'DESC' },
            });
        }
    }

    // Tek teslimat getir
    async findOne(id: string) {
        const delivery = await this.deliveryRepo.findOne({
            where: { id },
            relations: ['merchant', 'courier'],
        });
        if (!delivery) {
            throw new NotFoundException('Teslimat bulunamadı');
        }
        return delivery;
    }

    // Kurye teslimatı al
    async assign(deliveryId: string, courierId: string) {
        const delivery = await this.findOne(deliveryId);

        if (delivery.status !== DeliveryStatus.PENDING) {
            throw new BadRequestException('Bu teslimat zaten alınmış');
        }

        // Güncelle
        await this.deliveryRepo.update(deliveryId, {
            courierId: courierId,
            status: DeliveryStatus.ASSIGNED,
            assignedAt: new Date(),
        });

        // Kurye durumunu BUSY yap
        await this.courierRepo.update(courierId, { status: CourierStatus.BUSY });

        // Güncel veriyi relations ile döndür
        return this.findOne(deliveryId);
    }

    // Paketi aldım
    async pickup(deliveryId: string, courierId: string) {
        const delivery = await this.findOne(deliveryId);

        if (delivery.courierId !== courierId) {
            throw new ForbiddenException('Bu teslimat size ait değil');
        }

        if (delivery.status !== DeliveryStatus.ASSIGNED) {
            throw new BadRequestException('Teslimat durumu uygun değil');
        }

        delivery.status = DeliveryStatus.PICKED_UP;
        delivery.pickedUpAt = new Date();

        return this.deliveryRepo.save(delivery);
    }

    // Teslim ettim
    async deliver(deliveryId: string, courierId: string) {
        const delivery = await this.findOne(deliveryId);

        if (delivery.courierId !== courierId) {
            throw new ForbiddenException('Bu teslimat size ait değil');
        }

        if (delivery.status !== DeliveryStatus.PICKED_UP) {
            throw new BadRequestException('Önce paketi almanız gerekiyor');
        }

        delivery.status = DeliveryStatus.DELIVERED;
        delivery.deliveredAt = new Date();

        // Kurye durumunu IDLE yap (yeni iş alabilir)
        await this.courierRepo.update(courierId, { status: CourierStatus.IDLE });

        return this.deliveryRepo.save(delivery);
    }

    // İptal et
    async cancel(deliveryId: string, userId: string, role: UserRole) {
        const delivery = await this.findOne(deliveryId);

        // Sadece sahibi iptal edebilir
        if (role === UserRole.MERCHANT && delivery.merchantId !== userId) {
            throw new ForbiddenException('Bu teslimatı iptal edemezsiniz');
        }
        if (role === UserRole.COURIER && delivery.courierId !== userId) {
            throw new ForbiddenException('Bu teslimatı iptal edemezsiniz');
        }

        // Teslim edilmiş sipariş iptal edilemez
        if (delivery.status === DeliveryStatus.DELIVERED) {
            throw new BadRequestException('Teslim edilmiş sipariş iptal edilemez');
        }

        // Kurye atanmışsa, durumunu IDLE yap
        if (delivery.courierId) {
            await this.courierRepo.update(delivery.courierId, {
                status: CourierStatus.IDLE,
            });
        }

        delivery.status = DeliveryStatus.CANCELLED;

        return this.deliveryRepo.save(delivery);
    }
}
