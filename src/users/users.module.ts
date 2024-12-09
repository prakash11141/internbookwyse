import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Organization } from 'src/organizations/entities/organization.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Organization])],
  exports: [SequelizeModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
