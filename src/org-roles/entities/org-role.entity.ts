import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Organization } from 'src/organizations/entities/organization.entity';

@Table({ tableName: 'Users' })
export class OrgRole extends Model<OrgRole> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('OrgUser'),
    allowNull: false,
    defaultValue: 'OrgUser',
  })
  role: 'OrgUser';

  @Column({
    type: DataType.ENUM('Active', 'Inactive'),
  })
  status: 'Active' | 'Inactive';

  @ForeignKey(() => Organization)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  organizationId: number;

  @BelongsTo(() => Organization)
  organization: Organization;

  toJSON() {
    const attributes: any = { ...this.get() };
    delete attributes.password;
    return attributes;
  }
}
