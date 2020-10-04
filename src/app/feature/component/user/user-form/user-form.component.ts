import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Role, User } from 'src/app/@core/models';
import { UserService } from 'src/app/@core/services';
import { RoleService } from 'src/app/@core/services/role/role.service';
import { Action } from 'src/app/@theme/model/action.enum';
import { Alert, AlertType } from 'src/app/@theme/model/alert';
import {
  DialogResponse,
  DialogResponseType,
} from 'src/app/@theme/model/dialog-response';
import { ToastService } from 'src/app/@theme/services/toast.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() model: User;
  @Input() action: Action;

  public spinner = false;
  public form: FormGroup;
  public Action = Action;
  public roleList: Role[];

  constructor(
    public nbDialogRef: NbDialogRef<UserFormComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.roleService.getAll().subscribe((response) => {
      this.roleList = response.detail;
    });
  }

  public submit(): void {
    this.spinner = true;
    this.model = this.form.value as User;
    this.model.role = { id: Number(this.form.get('role').value) };
    this.userService.save(this.model).subscribe(
      (response: any) => {
        this.toastService.show(
          new Alert(
            AlertType.SUCCESS,
            `User ${this.action.toLowerCase()} successful`
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
            `Failed to ${this.action.toLowerCase()} user`
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
      version: [this.model?.version],
      name: [this.model?.name, [Validators.required]],
      email: [this.model?.email, [Validators.required, Validators.email]],
      status: [
        this.model?.status,
        this.action === Action.UPDATE ? [Validators.required] : [],
      ],
      role: [this.model?.role?.id, [Validators.required]],
      username: [this.model?.username, [Validators.required]],
      password: [this.model?.password, [Validators.required]],
    });
  }
}
