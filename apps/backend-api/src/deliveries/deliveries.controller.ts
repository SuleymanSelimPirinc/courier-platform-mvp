import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards,
} from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@courier/types';

@Controller('deliveries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeliveriesController {
    constructor(private readonly deliveriesService: DeliveriesService) { }

    // 1. Teslimat oluştur (sadece esnaf)
    @Post()
    @Roles(UserRole.MERCHANT)
    create(
        @CurrentUser() user: { id: string },
        @Body() dto: CreateDeliveryDto,
    ) {
        return this.deliveriesService.create(user.id, dto);
    }

    // 2. Tüm teslimatlar (admin için)
    @Get()
    @Roles(UserRole.ADMIN)
    findAll() {
        return this.deliveriesService.findAll();
    }

    // 3. Bekleyen teslimatlar (kurye için)
    @Get('pending')
    @Roles(UserRole.COURIER)
    findPending() {
        return this.deliveriesService.findPending();
    }

    // 4. Kendi teslimatlarım
    @Get('my')
    findMy(@CurrentUser() user: { id: string; role: UserRole }) {
        return this.deliveriesService.findMy(user.id, user.role);
    }

    // 5. Tek teslimat detayı
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.deliveriesService.findOne(id);
    }

    // 6. Teslimatı al (kurye)
    @Patch(':id/assign')
    @Roles(UserRole.COURIER)
    assign(
        @Param('id') id: string,
        @CurrentUser() user: { id: string },
    ) {
        return this.deliveriesService.assign(id, user.id);
    }

    // 7. Paketi aldım (kurye)
    @Patch(':id/pickup')
    @Roles(UserRole.COURIER)
    pickup(
        @Param('id') id: string,
        @CurrentUser() user: { id: string },
    ) {
        return this.deliveriesService.pickup(id, user.id);
    }

    // 8. Teslim ettim (kurye)
    @Patch(':id/deliver')
    @Roles(UserRole.COURIER)
    deliver(
        @Param('id') id: string,
        @CurrentUser() user: { id: string },
    ) {
        return this.deliveriesService.deliver(id, user.id);
    }

    // 9. İptal et (esnaf veya kurye)
    @Patch(':id/cancel')
    cancel(
        @Param('id') id: string,
        @CurrentUser() user: { id: string; role: UserRole },
    ) {
        return this.deliveriesService.cancel(id, user.id, user.role);
    }
}
