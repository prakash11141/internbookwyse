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
  NotFoundException,
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
  @Post()
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }
  //search by filters is static so should bt at top before dynamic
  @Get('filters')
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getOrganizationsByFilters(
    @Query('search') search: string,
    @Query('isActive') isActive: boolean,
    @Query('subscriptionPlan') subscriptionPlan: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const filters = { search, isActive, subscriptionPlan, page, limit };
    console.log('Query parameters:', {
      search,
      isActive,
      subscriptionPlan,
      page,
      limit,
    });
    return this.organizationsService.getOrganizationsByFilters(filters);
  }
  //find all
  @Get()
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return this.organizationsService.findAll();
  }

  //update
  @Patch(':id')
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(+id, updateOrganizationDto);
  }
  //delete
  @Delete(':id')
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: number) {
    return this.organizationsService.deleteOrganization(+id);
  }
  //deactivate
  @Patch(':id/deactivate')
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deactivate(@Param('id') id: number) {
    return this.organizationsService.deactivateOrganization(+id);
  }
  //find one
  @Get(':id')
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getOrganizationById(@Param('id') id: number) {
    return this.organizationsService.findById(id);
  }
}
