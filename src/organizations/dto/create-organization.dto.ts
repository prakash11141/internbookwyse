import { IsString, IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  @IsOptional()
  subscriptionPlan?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  userCount: number;
}
