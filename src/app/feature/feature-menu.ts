import { NbMenuItem } from '@nebular/theme';

export class MenuTitle {
  public static DASHBOARD = 'Dashboard';
  public static ROLE = 'Role';
  public static USER = 'User';
  public static MEMO = 'Memo';
  public static MEMO_TYPE = 'Memo Type';
}

export const MENU_ITEMS: Map<string, NbMenuItem> = new Map([
  [
    MenuTitle.DASHBOARD,
    {
      title: MenuTitle.DASHBOARD,
      icon: 'home-outline',
      link: '/feature/dashboard',
      home: true,
    },
  ],
  [
    MenuTitle.ROLE,
    {
      title: MenuTitle.ROLE,
      icon: 'lock-outline',
      link: '/feature/roles',
    },
  ],
  [
    MenuTitle.USER,
    {
      title: MenuTitle.USER,
      icon: 'person-add-outline',
      link: '/feature/users',
    },
  ],
  [
    MenuTitle.MEMO,
    {
      title: MenuTitle.MEMO,
      icon: 'email-outline',
      link: '/feature/memo',
    },
  ],
  [
    MenuTitle.MEMO_TYPE,
    {
      title: MenuTitle.MEMO_TYPE,
      icon: 'email-outline',
      link: '/feature/memo/type',
    },
  ],
]);
