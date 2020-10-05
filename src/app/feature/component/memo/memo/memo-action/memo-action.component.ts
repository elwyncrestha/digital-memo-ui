import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { DocAction, DocStatus } from 'src/app/@core/enums';
import { Memo, User } from 'src/app/@core/models';
import { MemoService, UserService } from 'src/app/@core/services';
import { EnumUtils } from 'src/app/@core/utils/app/enum.utils';
import { Alert, AlertType } from 'src/app/@theme/model/alert';
import { ToastService } from 'src/app/@theme/services/toast.service';

@Component({
  selector: 'app-memo-action',
  templateUrl: './memo-action.component.html',
  styleUrls: ['./memo-action.component.scss'],
})
export class MemoActionComponent implements OnInit {
  @Input() memo: Memo;
  @Input() action: DocAction;
  @Input() currentUser: User;

  form: FormGroup;
  DocAction = DocAction;
  EnumUtils = EnumUtils;
  forwardUsers: User[];
  spinner = false;

  constructor(
    public nbDialogRef: NbDialogRef<MemoActionComponent>,
    private userService: UserService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private memoService: MemoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      memoId: [this.memo.id, Validators.required],
      docAction: [this.action, Validators.required],
      toUser: [
        undefined,
        EnumUtils.getEnum(DocAction, DocAction.FORWARD) === this.action
          ? Validators.required
          : undefined,
      ],
      documentStatus: [
        this.getDocStatusByAction(this.action),
        Validators.required,
      ],
      comment: [undefined, Validators.required],
    });
  }

  submit() {
    const obj = this.form.value;
    obj.toUser = { id: this.form.get('toUser').value };
    this.memoService.action(obj).subscribe(
      () => {
        this.nbDialogRef.close();
        this.toastService.show(
          new Alert(
            AlertType.SUCCESS,
            `Successfully ${this.action.toLowerCase()}ed memo`
          )
        );
        this.router.navigate(['/feature/memo/home/inbox']);
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(
            AlertType.ERROR,
            `Failed to ${this.action.toLowerCase()} memo`
          )
        );
      }
    );
  }

  getDocStatusByAction(docAction: DocAction): DocStatus {
    switch (docAction) {
      case EnumUtils.getEnum(DocAction, DocAction.APPROVE):
        return EnumUtils.getEnum(DocStatus, DocStatus.APPROVED);
      case EnumUtils.getEnum(DocAction, DocAction.REJECT):
        return EnumUtils.getEnum(DocStatus, DocStatus.REJECTED);
      default:
        return EnumUtils.getEnum(DocStatus, DocStatus.PENDING);
    }
  }

  private loadUsers(): void {
    this.userService
      .getAll()
      .pipe(
        map((v) =>
          (v.detail as User[]).filter((u) => u.id !== this.currentUser.id)
        )
      )
      .subscribe(
        (response) => {
          this.forwardUsers = response;
        },
        (error) => {
          console.error(error);
          this.toastService.show(
            new Alert(AlertType.ERROR, 'Failed to load users')
          );
        }
      );
  }
}
