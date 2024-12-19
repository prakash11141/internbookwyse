import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateOrgRoleDto } from './dto/create-org-role.dto';
import { UpdateOrgRoleDto } from './dto/update-org-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrgRole } from './entities/org-role.entity';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrgRolesService {
  constructor(
    @InjectModel(OrgRole)
    private readonly orgRoleModel: typeof OrgRole,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  //create user
  async create(
    createOrgRoleDto: CreateOrgRoleDto,
    user: User,
  ): Promise<OrgRole> {
    const { email, password, organizationId } = createOrgRoleDto;

    if (user.organizationId !== organizationId) {
      throw new ForbiddenException(
        `You are not authorized to create users for organization ${organizationId}. Your organization ID is ${user.organizationId}.`,
      );
    }

    const existingUser = await this.orgRoleModel.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email is already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new OrgRole record
    const newOrgRole = await this.orgRoleModel.create({
      ...createOrgRoleDto,
      password: hashedPassword,
    });

    return newOrgRole;
  }
  async update(
    id: number,
    updateOrgRoleDto: UpdateOrgRoleDto,
    user: User,
  ): Promise<OrgRole> {
    const { email, password, organizationId } = updateOrgRoleDto;

    const currentUser = await this.userModel.findByPk(id); // Find the user by ID

    if (!currentUser) {
      throw new BadRequestException('User not found');
    }

    // Ensure the organizationId of the current user matches the organizationId in the DTO

    if (user.organizationId !== currentUser.organizationId) {
      throw new ForbiddenException(
        `You are not authorized to edit users from organization ${currentUser.organizationId}. Your organization ID is ${user.organizationId}.`,
      );
    }

    // Ensure that the organizationId from the DTO is the same as the authenticated user's organizationId
    if (user.organizationId !== organizationId) {
      throw new ForbiddenException(
        `You cannot edit a user from a different organization. Your organization ID is ${user.organizationId}.`,
      );
    }

    // Check if email is already taken by another user in the same organization
    if (email && email !== currentUser.email) {
      const existingUser = await this.userModel.findOne({ where: { email } });
      if (existingUser) {
        throw new BadRequestException('Email is already in use.');
      }
    }

    // Hash the password if a new one is provided
    let hashedPassword = currentUser.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user information
    currentUser.email = email || currentUser.email;
    currentUser.password = hashedPassword;

    // Save the user with the updated data
    await currentUser.save();

    // Find or create OrgRole for this user
    let orgRole = await this.orgRoleModel.findOne({ where: { id: id } });

    if (orgRole) {
      // Ensure the role in OrgRole is "OrgUser" (not other roles like "Admin" or "SuperAdmin")
      orgRole.role = 'OrgUser'; // Set to "OrgUser"
      await orgRole.save();
    } else {
      // If the OrgRole does not exist, create a new one with "OrgUser" role
      orgRole = await this.orgRoleModel.create({
        id: id,
        organizationId: user.organizationId, // Ensure it's tied to the user's organization
        role: 'OrgUser', // Default to "OrgUser"
      });
    }

    return orgRole; // Return the updated OrgRole
  }
  findAll() {
    return `This action returns all orgRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orgRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} orgRole`;
  }
}
