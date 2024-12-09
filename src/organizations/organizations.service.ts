import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization) private organizationModel: typeof Organization,
  ) {}
  //Register a organization
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

  findAll() {
    return `This action returns all organizations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
