import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RoleComponent } from './component/role/role.component';
import { UserComponent } from './component/user/user.component';
import { MemoTypeComponent } from './component/memo/memo-type/memo-type.component';
import { MemoComponent } from './component/memo/memo/memo.component';
import { MemoComposeComponent } from './component/memo/memo/memo-compose/memo-compose.component';
import { MemoReadComponent } from './component/memo/memo/memo-read/memo-read.component';
import { MemoPreviewComponent } from './component/memo/memo/memo-preview/memo-preview.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'roles',
        component: RoleComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'memo',
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },
          {
            path: 'home',
            component: MemoComponent,
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'read/inbox',
              },
              {
                path: 'compose/:id',
                component: MemoComposeComponent,
              },
              {
                path: 'preview/:id',
                component: MemoPreviewComponent,
              },
              {
                path: 'read/:type',
                component: MemoReadComponent,
              },
            ],
          },
          {
            path: 'type',
            component: MemoTypeComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
