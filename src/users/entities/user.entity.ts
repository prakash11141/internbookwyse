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
export class User extends Model<User> {
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
    type: DataType.ENUM('SuperAdmin', 'OrgAdmin', 'OrgUser', 'Customer'),
    allowNull: false,
  })
  role: 'SuperAdmin' | 'OrgAdmin' | 'OrgUser' | 'Customer';

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
