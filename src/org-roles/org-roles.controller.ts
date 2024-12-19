import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  Request,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { OrgRolesService } from './org-roles.service';
import { CreateOrgRoleDto } from './dto/create-org-role.dto';
import { UpdateOrgRoleDto } from './dto/update-org-role.dto';
import { OrgRole } from './entities/org-role.entity';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('organization')
export class OrgRolesController {
  constructor(private readonly orgRolesService: OrgRolesService) {}

  @Roles(Role.OrgAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('admin/add-user')
  async create(
    @Body() createOrgRoleDto: CreateOrgRoleDto,
    @Request() req,
  ): Promise<OrgRole> {
    const user = req.user; // Get the user from the request (set after JWT validation)
    return this.orgRolesService.create(createOrgRoleDto, user);
  }

  @Get()
  findAll() {
    return this.orgRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orgRolesService.findOne(+id);
  }
  @Roles(Role.OrgAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('admin/edit/:id')
  async update(
    @Param('id') id: number,
    @Body() updateOrgRoleDto: UpdateOrgRoleDto,
    @Request() req,
  ) {
    const user = req.user;
    console.log(user);
    // Ensure the logged-in user is authorized to update this role

    if (user.organizationId !== updateOrgRoleDto.organizationId) {
      throw new ForbiddenException(
        `You are not authorized to edit users from organization ${updateOrgRoleDto.organizationId}. Your organization ID is ${user.organizationId}.`,
      );
    }
    // Pass the user object to the service for further validation/logic
    return this.orgRolesService.update(+id, updateOrgRoleDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orgRolesService.remove(+id);
  }
}
