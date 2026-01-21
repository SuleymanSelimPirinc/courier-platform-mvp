import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ICourier, CourierStatus } from '@courier/types'; // Ortak paketten geliyor!

@Entity('couriers') // Veritabanındaki tablo adı: 'couriers' olacak
export class CourierEntity implements ICourier {
  @PrimaryGeneratedColumn('uuid') // Rastgele benzersiz ID (uuid)
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CourierStatus,
    default: CourierStatus.OFFLINE,
  })
  status: CourierStatus;

  @Column('float', { default: 0 })
  score: number;

  // Konum şimdilik basit tutalım, ileride PostGIS kullanacağız
  @Column('jsonb', { nullable: true })
  currentLocation?: { lat: number; lng: number };
}
