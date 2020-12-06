// Nest imports
import { Module, OnModuleInit, Type, DynamicModule, ForwardReference, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

// Imports from Gateway
import { configSchema } from '@app/api-gateway/config/schema';
import { CatsAPIControllerV1 } from '@app/api-gateway/api/v1/cats.controller';
import { DogsAPIControllerV1 } from '@app/api-gateway/api/v1/dogs.controller';

// Imports from libs/libs
import { CatsModule } from 'libs/lib-cats/src/cats.module';
import { DogsModule } from 'libs/lib-dogs/src/dogs.module';

type NestModuleImport = Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>;

// PG config
import * as pg from 'pg';
import * as pgInterval from 'postgres-interval';

import { Duration } from 'luxon';

pg.types.setTypeParser(pg.types.builtins.INTERVAL, (value) => {
  // This returns the long iso string: eg P0Y0M3DT0H0M0S
  const longIsoString = pgInterval(value).toISOString();
  // This shorten P0Y0M3DT0H0M0S into P3D
  return Duration.fromISO(longIsoString).toISO();
});

// SubModule used by the server
const appModules: NestModuleImport[] = [CatsModule, DogsModule];

// Infrastructure Modules (DB, config) used by the server
const infrastructureModules: NestModuleImport[] = [
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: configSchema,
  }),
  TerminusModule,
];

const controllers: any[] = [CatsAPIControllerV1, DogsAPIControllerV1];

@Module({
  imports: [...appModules, ...infrastructureModules],
  controllers: [...controllers],
  exports: [ConfigModule],
  providers: [Logger],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly config: ConfigService, private readonly logger: Logger) {}

  onModuleInit(): void {
    this.logger.setContext('AppModule');
    this.logger.debug(`The config "heathz.ok" is "${this.config.get('HEALTHZ_OK')}"`);
  }
}
