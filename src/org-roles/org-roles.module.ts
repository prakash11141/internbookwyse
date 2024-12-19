import { Module } from '@nestjs/common';
import { OrgRolesService } from './org-roles.service';
import { OrgRolesController } from './org-roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrgRole } from './entities/org-role.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([OrgRole]), UsersModule],

  controllers: [OrgRolesController],
  providers: [OrgRolesService],
})
export class OrgRolesModule {}
