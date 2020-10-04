import { BaseEntity } from '../../base/models';
import { DocStatus } from '../../enums';
import { MemoStage } from './memo-stage.model';
import { MemoType } from './memo-type.model';

export class Memo extends BaseEntity {
  type?: MemoType;
  referenceNumber?: string;
  subject?: string;
  content?: string;
  documentStatus?: DocStatus;
  previousStageList?: string;
  currentStage?: MemoStage;
}
