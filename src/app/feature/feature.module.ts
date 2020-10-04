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
import { MemoTypeComponent } from './component/memo/memo-type/memo-type.component';
import { MemoTypeFormComponent } from './component/memo/memo-type/memo-type-form/memo-type-form.component';
import { MemoComponent } from './component/memo/memo/memo.component';
import { MemoComposeComponent } from './component/memo/memo/memo-compose/memo-compose.component';
import { MemoReadComponent } from './component/memo/memo/memo-read/memo-read.component';
import { MemoPreviewComponent } from './component/memo/memo/memo-preview/memo-preview.component';

@NgModule({
  declarations: [
    FeatureComponent,
    DashboardComponent,
    RoleComponent,
    RoleFormComponent,
    UserComponent,
    UserFormComponent,
    MemoTypeComponent,
    MemoTypeFormComponent,
    MemoComponent,
    MemoComposeComponent,
    MemoReadComponent,
    MemoPreviewComponent,
  ],
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
export class FeatureModule {}
