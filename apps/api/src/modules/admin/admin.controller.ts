import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getPlatformStats();
  }

  @Get('sellers/pending')
  getPendingSellers() {
    return this.adminService.getPendingSellers();
  }

  @Post('sellers/:id/verify')
  verifySeller(
    @Param('id') id: string,
    @Body() body: { status: 'APPROVED' | 'REJECTED'; notes?: string },
  ) {
    return this.adminService.verifySeller(id, body.status, body.notes);
  }

  @Get('audit-logs')
  getAuditLogs() {
    return this.adminService.getAuditLogs();
  }
}
