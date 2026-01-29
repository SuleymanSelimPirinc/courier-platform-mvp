import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MerchantEntity } from '../merchants/merchant.entity';
import { CourierEntity } from '../couriers/courier.entity';
import { RegisterMerchantDto, RegisterCourierDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
    UserRole,
    VerificationStatus,
    MerchantCategory,
    CourierStatus,
} from '@courier/types';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(MerchantEntity)
        private merchantRepo: Repository<MerchantEntity>,
        @InjectRepository(CourierEntity)
        private courierRepo: Repository<CourierEntity>,
        private jwtService: JwtService,
    ) { }

    // Esnaf Kaydı
    async registerMerchant(dto: RegisterMerchantDto) {
        // Email kontrolü
        const exists = await this.merchantRepo.findOneBy({ email: dto.email });
        if (exists) {
            throw new ConflictException('Bu email zaten kayıtlı');
        }

        // Şifre hashleme
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Esnaf oluştur
        const merchant = this.merchantRepo.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            category: dto.category || MerchantCategory.RESTAURANT,
            taxNumber: dto.taxNumber,
            address: dto.address,
            location: dto.location,
            phone: dto.phone,
            verificationStatus: VerificationStatus.PENDING,
        });

        await this.merchantRepo.save(merchant);

        // Token oluştur
        return this.generateToken(merchant.id, merchant.email, UserRole.MERCHANT);
    }

    // Kurye Kaydı
    async registerCourier(dto: RegisterCourierDto) {
        // Email kontrolü
        const exists = await this.courierRepo.findOneBy({ email: dto.email });
        if (exists) {
            throw new ConflictException('Bu email zaten kayıtlı');
        }

        // Şifre hashleme
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Kurye oluştur
        const courier = this.courierRepo.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            phone: dto.phone,
            status: CourierStatus.OFFLINE,
            score: 5.0,
        });

        await this.courierRepo.save(courier);

        // Token oluştur
        return this.generateToken(courier.id, courier.email, UserRole.COURIER);
    }

    // Login
    async login(dto: LoginDto) {
        // Önce merchantlarda ara
        let user: MerchantEntity | CourierEntity | null = await this.merchantRepo.findOneBy({ email: dto.email });
        let role = UserRole.MERCHANT;

        // Bulunamadıysa kuryede ara
        if (!user) {
            user = await this.courierRepo.findOneBy({ email: dto.email });
            role = UserRole.COURIER;
        }

        if (!user) {
            throw new UnauthorizedException('Geçersiz email veya şifre');
        }

        // Şifre kontrolü
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Geçersiz email veya şifre');
        }

        return this.generateToken(user.id, user.email, role);
    }

    // Token oluşturma
    private generateToken(userId: string, email: string, role: UserRole) {
        const payload = {
            sub: userId,
            email: email,
            role: role,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: userId,
                email: email,
                role: role,
            },
        };
    }

    // Kullanıcı bilgisi getir
    async getMe(userId: string, role: UserRole) {
        if (role === UserRole.MERCHANT) {
            return this.merchantRepo.findOneBy({ id: userId });
        } else {
            return this.courierRepo.findOneBy({ id: userId });
        }
    }
}
