import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RoleComponent } from './component/role/role.component';
import { RoleFormComponent } from './component/role/role-form/role-form.component';
import { NbDialogModule } from '@nebular/theme';
import { UserComponent } from './component/user/user.component';
import { UserFormComponent } from './component/user/user-form/user-form.component';


@NgModule({
  declarations: [FeatureComponent, DashboardComponent, RoleComponent, RoleFormComponent, UserComponent, UserFormComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    ThemeModule,
    NbDialogModule.forChild({
      closeOnEsc: true,
      hasScroll: true,
      closeOnBackdropClick: false,
    }),
  ],
})
export class FeatureModule {
}
