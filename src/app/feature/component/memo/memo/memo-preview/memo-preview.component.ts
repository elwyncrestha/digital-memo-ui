import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DocAction, DocStatus, RoleType } from 'src/app/@core/enums';
import { Memo, User } from 'src/app/@core/models';
import { MemoService, UserStates } from 'src/app/@core/services';
import { EnumUtils } from 'src/app/@core/utils/app/enum.utils';
import { MemoActionComponent } from '../memo-action/memo-action.component';

@Component({
  selector: 'app-memo-preview',
  templateUrl: './memo-preview.component.html',
  styleUrls: ['./memo-preview.component.scss'],
})
export class MemoPreviewComponent implements OnInit {
  memo: Memo;
  spinner = false;
  EnumUtils = EnumUtils;
  DocStatus = DocStatus;
  RoleType = RoleType;
  DocAction = DocAction;
  currentUser: User;

  constructor(
    private sanitizer: DomSanitizer,
    private userStates: UserStates,
    private dialogService: NbDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memoService: MemoService
  ) {}

  ngOnInit(): void {
    this.userStates.authenticated$.subscribe((response) => {
      this.currentUser = response;
    });
    const memoId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.memoService.detail(memoId).subscribe((response) => {
      this.memo = response.detail;
    });
  }

  public safeHtml(value: any) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  memoAction(action: DocAction) {
    this.dialogService.open(MemoActionComponent, {
      context: {
        memo: this.memo,
        action,
        currentUser: this.currentUser,
      },
    });
  }

  editMemo(id: number) {
    this.router.navigate([`/feature/memo/home/compose/${id}`]);
  }
}
