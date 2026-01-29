import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CourierStatus } from '@courier/types';

@Entity('couriers')
export class CourierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

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

  @Column('float', { default: 5.0 })
  score: number;

  @Column('jsonb', { nullable: true })
  currentLocation?: { lat: number; lng: number };
}
