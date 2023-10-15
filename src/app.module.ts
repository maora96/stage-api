import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProcessModule } from './process/process.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './process/process.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ProcessModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [Process],
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
      // username: 'postgres',
      // password: 'postgres',
      // host: 'localhost',
      // database: 'aroacedb',
      // port: 5432,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
