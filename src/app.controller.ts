import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { uptime } from 'os';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('health')
  health() {
    return { status: 'UP', uptime: `${(uptime() / 60).toFixed(2)} minutes` };
  }
}
