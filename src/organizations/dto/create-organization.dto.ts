import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsEnum(['Active', 'Inactive'])
  status: 'Active' | 'Inactive';

  @IsString()
  @IsOptional()
  subscriptionPlan?: string;
}
