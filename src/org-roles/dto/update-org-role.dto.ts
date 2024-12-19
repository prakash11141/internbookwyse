import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsInt,
  MinLength,
  IsOptional,
} from 'class-validator';
import { CreateOrgRoleDto } from './create-org-role.dto';

export class UpdateOrgRoleDto extends PartialType(CreateOrgRoleDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @IsEnum(['Active', 'Inactive'])
  @IsOptional()
  status?: 'Active' | 'Inactive';
  @IsOptional()
  @IsEnum(['OrgUser'], {
    message: 'Role must be one of: OrgUser',
  })
  role?: 'OrgUser';

  @IsOptional()
  @IsInt({ message: 'Organization ID must be an integer' })
  organizationId?: number;
}
