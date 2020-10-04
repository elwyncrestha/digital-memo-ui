import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Role } from 'src/app/@core/models';
import { RoleService } from 'src/app/@core/services/role/role.service';
import { DialogUtils } from 'src/app/@core/utils/ui/dialog.utils';
import { Action } from 'src/app/@theme/model/action.enum';
import { RoleFormComponent } from './role-form/role-form.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  dataList: Role[];

  constructor(
    private roleService: RoleService,
    private dialogService: NbDialogService
  ) {}

  static load(component: RoleComponent) {
    component.roleService.getAll().subscribe((v) => {
      component.dataList = v.detail;
    });
  }

  ngOnInit(): void {
    RoleComponent.load(this);
  }

  public add() {
    const dialogRef = this.dialogService.open(RoleFormComponent, {
      context: {
        model: new Role(),
        action: Action.ADD,
      },
    });
    DialogUtils.resolve(dialogRef, RoleComponent.load, this);
  }

  public edit(data: Role) {
    const dialogRef = this.dialogService.open(RoleFormComponent, {
      context: {
        model: data,
        action: Action.UPDATE,
      },
    });
    DialogUtils.resolve(dialogRef, RoleComponent.load, this);
  }
}
