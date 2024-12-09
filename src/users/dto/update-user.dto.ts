import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsInt,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEnum(['SuperAdmin', 'OrgAdmin', 'OrgUser', 'Customer'], {
    message: 'Role must be one of: SuperAdmin, OrgAdmin, OrgUser, Customer',
  })
  @IsOptional()
  role: 'SuperAdmin' | 'OrgAdmin' | 'OrgUser' | 'Customer';

  @IsOptional()
  @IsInt()
  organizationId?: number;
}
