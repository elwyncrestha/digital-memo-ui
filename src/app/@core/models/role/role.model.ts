import { BaseEntity } from '../../base/models';
import { RoleType, Status } from '../../enums';

export class Role extends BaseEntity {
  name?: string;
  status?: Status;
  roleType?: RoleType;
}
