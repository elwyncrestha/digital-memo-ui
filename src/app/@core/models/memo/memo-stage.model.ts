import { BaseEntity } from '../../base/models';
import { DocAction } from '../../enums';
import { User } from '../user/user.model';

export class MemoStage extends BaseEntity {
  fromUser?: User;
  toUser?: User;
  docAction?: DocAction;
  comment?: string;
}
