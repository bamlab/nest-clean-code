import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { DNSHealthIndicator, HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('healthz')
export class HealthzController {
  constructor(private health: HealthCheckService, private dns: DNSHealthIndicator) {}

  @Get()
  @HealthCheck()
  @ApiExcludeEndpoint()
  check() {
    return this.health.check([() => this.dns.pingCheck('google', 'https://google.fr')]);
  }
}
