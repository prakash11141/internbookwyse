import { Test, TestingModule } from '@nestjs/testing';
import { OrgRolesService } from './org-roles.service';

describe('OrgRolesService', () => {
  let service: OrgRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgRolesService],
    }).compile();

    service = module.get<OrgRolesService>(OrgRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
