import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToggleComponent } from '@nebular/theme';
import { Status } from 'src/app/@core/enums';
import { User } from 'src/app/@core/models';
import { UserService } from 'src/app/@core/services';
import { EnumUtils } from 'src/app/@core/utils/app/enum.utils';
import { DialogUtils } from 'src/app/@core/utils/ui/dialog.utils';
import { Action } from 'src/app/@theme/model/action.enum';
import { Alert, AlertType } from 'src/app/@theme/model/alert';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  dataList: User[];
  Status = Status;

  constructor(
    private dialogService: NbDialogService,
    private service: UserService,
    private toastService: ToastService
  ) {}

  static load(component: UserComponent) {
    component.service.getAll().subscribe((v) => {
      component.dataList = v.detail;
    });
  }

  ngOnInit(): void {
    UserComponent.load(this);
  }

  public add() {
    const dialogRef = this.dialogService.open(UserFormComponent, {
      context: {
        model: new User(),
        action: Action.ADD,
      },
    });
    DialogUtils.resolve(dialogRef, UserComponent.load, this);
  }

  public edit(user: User) {
    const dialogRef = this.dialogService.open(UserFormComponent, {
      context: {
        model: user,
        action: Action.UPDATE,
      },
    });
    DialogUtils.resolve(dialogRef, UserComponent.load, this);
  }

  public statusChange(user: User, value: NbToggleComponent): void {
    user.status = EnumUtils.getEnum(
      Status,
      value.checked ? Status.ACTIVE : Status.INACTIVE
    );
    this.service.changeStatus(user.id, user.status).subscribe(
      () => {
        this.toastService.show(
          new Alert(AlertType.SUCCESS, 'Successfully updated status!!!')
        );
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(AlertType.ERROR, 'Could not update status!!!')
        );
      }
    );
  }
}
