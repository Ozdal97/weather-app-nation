// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ← ConfigModule’ü en başta global olarak yükle
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration], // configuration.ts’inizi buradan içeri alır
    }),

    // TypeORM’u ConfigService ile konfigüre edin
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port', 3306),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // ← artık migrations kullanacağız
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
       // migrationsRun: true, // uygulama start’ında otomatik migrate et
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    WeatherModule,
    AuthModule,
  ],
})
export class AppModule {}
