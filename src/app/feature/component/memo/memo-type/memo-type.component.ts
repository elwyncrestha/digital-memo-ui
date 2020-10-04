import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Role } from 'src/app/@core/models';
import { MemoType } from 'src/app/@core/models/memo/memo-type.model';
import { MemoTypeService } from 'src/app/@core/services/memo/memo-type.service';
import { DialogUtils } from 'src/app/@core/utils/ui/dialog.utils';
import { Action } from 'src/app/@theme/model/action.enum';
import { MemoTypeFormComponent } from './memo-type-form/memo-type-form.component';

@Component({
  selector: 'app-memo-type',
  templateUrl: './memo-type.component.html',
  styleUrls: ['./memo-type.component.scss'],
})
export class MemoTypeComponent implements OnInit {
  dataList: MemoType[];

  constructor(
    private dialogService: NbDialogService,
    private service: MemoTypeService
  ) {}

  static load(component: MemoTypeComponent) {
    component.service.getAll().subscribe((v) => {
      component.dataList = v.detail;
    });
  }

  ngOnInit(): void {
    MemoTypeComponent.load(this);
  }

  public add() {
    const dialogRef = this.dialogService.open(MemoTypeFormComponent, {
      context: {
        model: new MemoType(),
        action: Action.ADD,
      },
    });
    DialogUtils.resolve(dialogRef, MemoTypeComponent.load, this);
  }

  public edit(data: Role) {
    const dialogRef = this.dialogService.open(MemoTypeFormComponent, {
      context: {
        model: data,
        action: Action.UPDATE,
      },
    });
    DialogUtils.resolve(dialogRef, MemoTypeComponent.load, this);
  }
}
