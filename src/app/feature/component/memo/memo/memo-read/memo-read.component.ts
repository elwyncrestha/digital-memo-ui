import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocStatus } from 'src/app/@core/enums';
import { Memo } from 'src/app/@core/models';
import { MemoService, UserStates } from 'src/app/@core/services';
import { EnumUtils } from 'src/app/@core/utils/app/enum.utils';
import { Alert, AlertType } from 'src/app/@theme/model/alert';
import { ToastService } from 'src/app/@theme/services/toast.service';

@Component({
  selector: 'app-memo-read',
  templateUrl: './memo-read.component.html',
  styleUrls: ['./memo-read.component.scss'],
})
export class MemoReadComponent implements OnInit, OnDestroy {
  memoTitle = '';
  dataList: Memo[];
  spinner = false;
  search = {
    'currentStage.toUser.id': undefined,
    documentStatus: undefined,
  };
  navigationSubscription: Subscription;

  constructor(
    private memoService: MemoService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userStates: UserStates
  ) {}

  static load(component: MemoReadComponent) {
    component.spinner = true;
    switch (component.activatedRoute.snapshot.paramMap.get('type')) {
      case 'inbox':
        component.memoTitle = 'Inbox';
        component.search.documentStatus = EnumUtils.getEnum(
          DocStatus,
          DocStatus.PENDING
        );
        break;
      case 'approved':
        component.memoTitle = 'Approved';
        component.search.documentStatus = EnumUtils.getEnum(
          DocStatus,
          DocStatus.APPROVED
        );
        break;
      case 'rejected':
        component.memoTitle = 'Rejected';
        component.search.documentStatus = EnumUtils.getEnum(
          DocStatus,
          DocStatus.REJECTED
        );
        break;
    }
    component.memoService.getAllWithSearch(component.search).subscribe(
      (response) => {
        component.dataList = response.detail;
        component.spinner = false;
      },
      (error) => {
        console.error(error);
        component.toastService.show(
          new Alert(AlertType.ERROR, 'Failed to load memos')
        );
        component.spinner = false;
      }
    );
  }

  ngOnInit(): void {
    this.userStates.authenticated$.subscribe((user) => {
      this.search['currentStage.toUser.id'] = user?.id?.toString();
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          MemoReadComponent.load(this);
        }
      });
      MemoReadComponent.load(this);
    });
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }

  view(memoId: number) {
    this.router.navigate([`/feature/memo/home/preview/${memoId}`]);
  }
}
