import { BaseEntity } from '../../base/models';
import { Status } from '../../enums';

export class MemoType extends BaseEntity {
  name?: string;
  status?: Status;
}
