import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}
  //create
  @Post('register')
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }
  //find all
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.organizationsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.organizationsService.findOne(+id);
  // }
  //update
  @Patch(':id')
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(+id, updateOrganizationDto);
  }
  //delete
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.organizationsService.deleteOrganization(+id);
  }
  //deactivate
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: number) {
    return this.organizationsService.deactivateOrganization(+id);
  }
  //filter
  @Get('filter')
  async getOrganizations(
    @Query('search') search: string,
    @Query('status') status: string,
    @Query('subscriptionPlan') subscriptionPlan: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const filters = { search, status, subscriptionPlan, page, limit };
    console.log('Query parameters:', {
      search,
      status,
      subscriptionPlan,
      page,
      limit,
    });
    return this.organizationsService.getOrganizations(filters);
  }
}
