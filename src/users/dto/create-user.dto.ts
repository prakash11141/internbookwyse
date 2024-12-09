import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsInt,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEnum(['SuperAdmin', 'OrgAdmin', 'OrgUser', 'Customer'], {
    message: 'Role must be one of: SuperAdmin, OrgAdmin, OrgUser, Customer',
  })
  role: 'SuperAdmin' | 'OrgAdmin' | 'OrgUser' | 'Customer';

  @IsOptional()
  @IsInt()
  organizationId?: number;
}
