import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Organization } from './organizations/entities/organization.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles/roles.guard';

import { OrgRolesModule } from './org-roles/org-roles.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      models: [User, Organization],
    }),
    OrganizationsModule,
    UsersModule,
    AuthModule,

    OrgRolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
