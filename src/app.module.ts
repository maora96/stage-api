import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProcessModule } from './process/process.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './process/process.entity';
import { APP_PIPE } from '@nestjs/core';
import { DepartmentController } from './department/department.controller';
import { DepartmentModule } from './department/department.module';
import { Department } from './department/department.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ProcessModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [Process, Department],
      synchronize: true,

      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST.toString(),
      database: process.env.PGDATABASE,
      port: Number(process.env.PGPORT),
      // ssl: {
      //   rejectUnauthorized: false,
      //   ca: process.env.CACERT,
      // },
    }),
    DepartmentModule,
  ],
  controllers: [],
  providers: [ {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  },],
})
export class AppModule {}
