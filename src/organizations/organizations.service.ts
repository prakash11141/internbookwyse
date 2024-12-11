import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Organization } from './entities/organization.entity';
import { NotFoundError } from 'rxjs';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization) private organizationModel: typeof Organization,
  ) {}
  //register a organization
  async create(createOrganizationDto: CreateOrganizationDto) {
    const { name, status, subscriptionPlan } = createOrganizationDto;

    //organization already exists
    const existingOrg = await this.organizationModel.findOne({
      where: { name },
    });

    if (existingOrg) {
      throw new BadRequestException(
        'Organization with this name already exists',
      );
    }
    // Create the new organization
    const newOrganization = await this.organizationModel.create({
      name,
      status,
      subscriptionPlan,
    });

    return {
      message: 'Organization registered successfully',
      organization: newOrganization,
    };
  }
  //find all org
  async findAll() {
    return await this.organizationModel.findAll();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} organization`;
  // }
  //update org
  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const { name, status, subscriptionPlan } = updateOrganizationDto;
    const organization = await this.organizationModel.findByPk(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    //if name already exist for diff org
    if (name && name !== organization.name) {
      const existingOrg = await this.organizationModel.findOne({
        where: { name },
      });
      if (existingOrg) {
        throw new BadRequestException(
          `Another organization with the name '${name}' already exists`,
        );
      }
    }
    await organization.update({
      name: name ?? organization.name,
      status: status ?? organization.status,
      subscriptionPlan: subscriptionPlan ?? organization.subscriptionPlan,
    });
    return {
      message: 'Organization details updated successfully',
      organization,
    };
  }
  //delete org
  async deleteOrganization(id: number) {
    const organization = await this.organizationModel.findByPk(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    await organization.destroy();

    return {
      message: `Organization with ID ${id} has been deleted successfully.`,
    };
  }
  //deactivate org
  async deactivateOrganization(id: number) {
    const organization = await this.organizationModel.findByPk(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    // Update the organization's status to 'Inactive'
    organization.status = 'Inactive';
    await organization.save();

    return {
      message: `Organization with ID ${id} has been deactivated successfully.`,
      organization,
    };
  }
  //by filter
  async getOrganizations(filters: any) {
    const whereCondition: any = {};

    if (filters.search) {
      whereCondition.name = { [Op.iLike]: `%${filters.search}%` };
    }
    if (filters.status) {
      whereCondition.status = Sequelize.where(
        Sequelize.cast(Sequelize.col('status'), 'text'),
        {
          [Op.iLike]: filters.status,
        },
      );
    }
    if (filters.subscriptionPlan) {
      whereCondition.subscriptionPlan = Sequelize.where(
        Sequelize.cast(Sequelize.col('subscriptionPlan'), 'text'),
        {
          [Op.iLike]: filters.subscriptionPlan,
        },
      );
    }
    const limit = filters.limit || 10;
    const offset = (filters.page - 1) * limit || 0;

    const { count, rows } = await this.organizationModel.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      total: count,
      currentPage: filters.page || 1,
      totalPages: Math.ceil(count / limit),
    };
  }
}
