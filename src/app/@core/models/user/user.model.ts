import { BaseEntity } from '../../base/models';
import { Status } from '../../enums';
import { Role } from '../role/role.model';

export class User extends BaseEntity {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  status?: Status;
  role?: Role;
}
