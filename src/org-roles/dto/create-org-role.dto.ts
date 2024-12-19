import { IsString, IsEmail, IsEnum, IsInt, MinLength } from 'class-validator';

export class CreateOrgRoleDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
  @IsEnum(['Active', 'Inactive'], { message: 'must be Active or Inactive' })
  status: 'Active' | 'Inactive';

  @IsEnum(['OrgUser'], {
    message: 'Role must be one of: OrgUser',
  })
  role = 'OrgUser' as const; // Default value set to 'OrgUser'

  @IsInt({ message: 'Organization ID is required and must be an integer' })
  organizationId?: number;
}
