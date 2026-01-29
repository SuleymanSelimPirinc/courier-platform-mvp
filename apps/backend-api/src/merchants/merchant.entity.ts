import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import {
    MerchantCategory,
    VerificationStatus,
} from '@courier/types';

@Entity('merchants')
export class MerchantEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: MerchantCategory,
        default: MerchantCategory.RESTAURANT,
    })
    category: MerchantCategory;

    @Column()
    taxNumber: string;

    @Column({
        type: 'enum',
        enum: VerificationStatus,
        default: VerificationStatus.PENDING,
    })
    verificationStatus: VerificationStatus;

    @Column()
    address: string;

    @Column('jsonb')
    location: { lat: number; lng: number };

    @Column()
    phone: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column('jsonb', { nullable: true })
    workingHours?: { open: string; close: string }[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
