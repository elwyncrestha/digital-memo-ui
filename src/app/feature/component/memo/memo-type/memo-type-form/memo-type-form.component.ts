import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Status } from 'src/app/@core/enums';
import { MemoType } from 'src/app/@core/models/memo/memo-type.model';
import { MemoTypeService } from 'src/app/@core/services/memo/memo-type.service';
import { EnumUtils } from 'src/app/@core/utils/app/enum.utils';
import { Action } from 'src/app/@theme/model/action.enum';
import { Alert, AlertType } from 'src/app/@theme/model/alert';
import {
  DialogResponse,
  DialogResponseType,
} from 'src/app/@theme/model/dialog-response';
import { ToastService } from 'src/app/@theme/services/toast.service';

@Component({
  selector: 'app-memo-type-form',
  templateUrl: './memo-type-form.component.html',
  styleUrls: ['./memo-type-form.component.scss'],
})
export class MemoTypeFormComponent implements OnInit {
  @Input() model: MemoType;
  @Input() action: Action;
  spinner = false;
  form: FormGroup;

  constructor(
    public nbDialogRef: NbDialogRef<MemoTypeFormComponent>,
    private formBuilder: FormBuilder,
    private memoTypeService: MemoTypeService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public submit() {
    this.spinner = true;
    this.model = this.form.value as MemoType;
    this.memoTypeService.save(this.model).subscribe(
      (response: any) => {
        this.toastService.show(
          new Alert(
            AlertType.SUCCESS,
            `Memo Type ${this.action.toLowerCase()} successful`
          )
        );
        this.spinner = false;
        this.nbDialogRef.close(
          new DialogResponse(DialogResponseType.SUCCESS, response)
        );
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(
            AlertType.ERROR,
            `Failed to ${this.action.toLowerCase()} memo type`
          )
        );
        this.spinner = false;
        this.nbDialogRef.close(
          new DialogResponse(DialogResponseType.ERROR, error)
        );
      }
    );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [this.model?.id],
      name: [this.model?.name, Validators.required],
      status: [this.model?.status || EnumUtils.getEnum(Status, Status.ACTIVE)],
      version: [this.model?.version],
    });
  }
}
