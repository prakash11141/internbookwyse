import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsEnum(['Active', 'Inactive'], { message: 'must be Active or Inactive' })
  status: 'Active' | 'Inactive';

  @IsString()
  @IsOptional()
  subscriptionPlan?: string;
}
