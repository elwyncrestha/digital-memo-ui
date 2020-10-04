import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { RoleType, Status } from 'src/app/@core/enums';
import { Role, User } from 'src/app/@core/models';
import { RoleService } from 'src/app/@core/services/role/role.service';
import { ObjectUtils } from 'src/app/@core/utils';
import { EnumUtils } from 'src/app/@core/utils/app/enum.utils';
import { Action } from 'src/app/@theme/model/action.enum';
import { Alert, AlertType } from 'src/app/@theme/model/alert';
import {
  DialogResponse,
  DialogResponseType,
} from 'src/app/@theme/model/dialog-response';
import { ToastService } from 'src/app/@theme/services/toast.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent implements OnInit {
  @Input() model: Role;
  @Input() action: Action;
  spinner = false;
  form: FormGroup;
  RoleTypes = EnumUtils.pairs(RoleType);

  constructor(
    public nbDialogRef: NbDialogRef<RoleFormComponent>,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public submit() {
    this.spinner = true;
    this.model = this.form.value as Role;
    this.roleService.save(this.model).subscribe(
      (response: any) => {
        this.toastService.show(
          new Alert(
            AlertType.SUCCESS,
            `Role ${this.action.toLowerCase()} successful`
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
            `Failed to ${this.action.toLowerCase()} role`
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
      roleType: [this.model?.roleType, Validators.required],
      version: [this.model?.version],
    });
  }
}
