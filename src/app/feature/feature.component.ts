import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { RoleType } from '../@core/enums';
import { User } from '../@core/models';
import { UserService, UserStates } from '../@core/services';
import { ObjectUtils } from '../@core/utils';
import { EnumUtils } from '../@core/utils/app/enum.utils';
import { MENU_ITEMS, MenuTitle } from './feature-menu';

@Component({
  selector: 'app-feature',
  template: `
    <app-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-one-column-layout>
  `,
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent implements OnInit {
  menu: NbMenuItem[] = [];

  constructor(
    private userStates: UserStates,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.resolveSideBarRoutes();
  }

  private async resolveSideBarRoutes() {
    this.menu = [];
    this.menuPush([MenuTitle.DASHBOARD]);
    let user: User = this.userStates.getAuthenticatedUser();
    if (ObjectUtils.isEmpty(user)) {
      await this.userService
        .getAuthenticated()
        .toPromise()
        .then((v) => (user = v.detail));
    }
    this.userStates.setAuthenticatedUser(user);
    switch (user?.role?.roleType) {
      case EnumUtils.getEnum(RoleType, RoleType.ADMINISTRATOR):
        this.menuPush([MenuTitle.ROLE, MenuTitle.USER]);
        break;
      case EnumUtils.getEnum(RoleType, RoleType.MAKER):
        this.menuPush([MenuTitle.MEMO]);
        break;
      case EnumUtils.getEnum(RoleType, RoleType.APPROVAL):
        this.menuPush([MenuTitle.MEMO]);
        break;
    }
  }

  private menuPush(menuTitle: string[]): void {
    menuTitle.forEach((t) => this.menu.push(MENU_ITEMS.get(t)));
  }
}
