import { Test, TestingModule } from '@nestjs/testing';
import { OrgRolesController } from './org-roles.controller';
import { OrgRolesService } from './org-roles.service';

describe('OrgRolesController', () => {
  let controller: OrgRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgRolesController],
      providers: [OrgRolesService],
    }).compile();

    controller = module.get<OrgRolesController>(OrgRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
