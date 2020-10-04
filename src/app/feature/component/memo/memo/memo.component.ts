import { Component, OnInit } from '@angular/core';
import { RoleType } from 'src/app/@core/enums';
import { UserStates } from 'src/app/@core/services';
import { EnumUtils } from 'src/app/@core/utils/app/enum.utils';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
})
export class MemoComponent implements OnInit {
  isMaker = false;

  constructor(private userStates: UserStates) {}

  ngOnInit(): void {
    this.userStates.authenticated$.subscribe((user) => {
      this.isMaker =
        user?.role?.roleType === EnumUtils.getEnum(RoleType, RoleType.MAKER);
    });
  }
}
