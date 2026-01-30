import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { DeliveryStatus, PackageSize } from '@courier/types';
import { MerchantEntity } from '../merchants/merchant.entity';
import { CourierEntity } from '../couriers/courier.entity';

@Entity('deliveries')
export class DeliveryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Esnaf ilişkisi
    @Column('uuid')
    merchantId: string;

    @ManyToOne(() => MerchantEntity)
    @JoinColumn({ name: 'merchantId' })
    merchant: MerchantEntity;

    // Kurye ilişkisi (opsiyonel - başta atanmayabilir)
    @Column('uuid', { nullable: true })
    courierId?: string;

    @ManyToOne(() => CourierEntity, { nullable: true })
    @JoinColumn({ name: 'courierId' })
    courier?: CourierEntity;

    // Teslimat durumu
    @Column({
        type: 'enum',
        enum: DeliveryStatus,
        default: DeliveryStatus.PENDING,
    })
    status: DeliveryStatus;

    // Alım noktası
    @Column()
    pickupAddress: string;

    @Column('jsonb')
    pickupLocation: { lat: number; lng: number };

    // Teslim noktası
    @Column()
    dropoffAddress: string;

    @Column('jsonb')
    dropoffLocation: { lat: number; lng: number };

    // Paket bilgisi
    @Column()
    packageDescription: string;

    @Column({
        type: 'enum',
        enum: PackageSize,
        default: PackageSize.SMALL,
    })
    packageSize: PackageSize;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    estimatedPrice?: number;

    @Column({ nullable: true })
    notes?: string;

    // Zaman damgaları
    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    assignedAt?: Date;

    @Column({ type: 'timestamp', nullable: true })
    pickedUpAt?: Date;

    @Column({ type: 'timestamp', nullable: true })
    deliveredAt?: Date;
}
