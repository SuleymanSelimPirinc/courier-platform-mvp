import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterMerchantDto, RegisterCourierDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Esnaf Kaydı
    @Post('register/merchant')
    registerMerchant(@Body() dto: RegisterMerchantDto) {
        return this.authService.registerMerchant(dto);
    }

    // Kurye Kaydı
    @Post('register/courier')
    registerCourier(@Body() dto: RegisterCourierDto) {
        return this.authService.registerCourier(dto);
    }

    // Login (Esnaf & Kurye ortak)
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    // Mevcut kullanıcı bilgisi (korumalı)
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@CurrentUser() user: { id: string; role: string }) {
        return this.authService.getMe(user.id, user.role as any);
    }
}
