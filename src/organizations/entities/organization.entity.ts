import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({ tableName: 'Organizations' })
export class Organization extends Model<Organization> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.ENUM('Active', 'Inactive'),
    allowNull: false,
  })
  status: 'Active' | 'Inactive';

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  subscriptionPlan: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  userCount: number;

  @HasMany(() => User) // One-to-Many relationship
  users: User[];
}
