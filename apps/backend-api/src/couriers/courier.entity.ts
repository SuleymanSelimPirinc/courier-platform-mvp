import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CourierStatus, VehicleType } from '@courier/types';

@Entity('couriers')
export class CourierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: CourierStatus,
    default: CourierStatus.OFFLINE,
  })
  status: CourierStatus;

  // --- YENİ ALANLAR ---

  @Column({
    type: 'enum',
    enum: VehicleType,
    default: VehicleType.MOTORCYCLE, // Varsayılan motor
  })
  vehicleType: VehicleType;

  @Column({ nullable: true })
  plateNumber?: string;

  @Column('float', { default: 0 })
  totalRating: number;

  @Column('int', { default: 0 })
  ratingCount: number;

  // İstatistikler
  @Column('int', { default: 0 })
  completedDeliveries: number;

  @Column('int', { default: 0 })
  assignedDeliveries: number;

  @Column('int', { default: 0 })
  onTimeDeliveries: number;

  @Column('int', { default: 0 })
  cancelledDeliveries: number;

  @Column('int', { default: 0 })
  totalOnlineMinutes: number;

  // Sanal Alan: Ortalama Puan (Veritabanında tutulmaz, hesaplanır)
  get averageRating(): number {
    return this.ratingCount > 0 ? Number((this.totalRating / this.ratingCount).toFixed(1)) : 5.0; // Yeni kurye 5 başlar
  }

  // Eski score alanı (geriye uyumluluk veya internal score için tutulabilir, ama şimdilik kaldırabiliriz veya yeni mantığa göre güncelleyebiliriz. Entity'de score alanı vardı, onu averageRating ile değiştirelim ya da internalScore olarak kullanalım.)
  // Mevcut score alanını tutuyorum, internal score olarak kullanacağız.
  @Column('float', { default: 5.0 })
  score: number;

  @Column('jsonb', { nullable: true })
  currentLocation?: { lat: number; lng: number };
}
