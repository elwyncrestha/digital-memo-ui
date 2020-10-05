import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocStatus } from 'src/app/@core/enums';
import { Memo, MemoType } from 'src/app/@core/models';
import { MemoService, MemoTypeService } from 'src/app/@core/services';
import { ObjectUtils } from 'src/app/@core/utils';
import { EnumUtils } from 'src/app/@core/utils/app/enum.utils';
import { Alert, AlertType } from 'src/app/@theme/model/alert';
import { ToastService } from 'src/app/@theme/services/toast.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-memo-compose',
  templateUrl: './memo-compose.component.html',
  styleUrls: ['./memo-compose.component.scss'],
})
export class MemoComposeComponent implements OnInit {
  memoTask: 'Compose New' | 'Edit';
  form: FormGroup;
  memoTypes: MemoType[];
  spinner = false;
  memoId: number;
  editor = ClassicEditor;

  constructor(
    private memoTypeService: MemoTypeService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private memoService: MemoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner = true;
    this.fetchMemoTypes();
    this.buildForm(new Memo());
    this.memoId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.memoId === 0) {
      this.memoTask = 'Compose New';
    } else {
      this.memoTask = 'Edit';
      this.memoService.detail(this.memoId).subscribe(
        (response) => {
          this.buildForm(response.detail as Memo);
        },
        () => {
          console.error('Failed to fetch memo detail');
        }
      );
    }
  }

  save() {
    const memo: Memo = this.form.value;
    memo.type = { id: this.form.get('type').value };
    this.memoService.save(this.form.value).subscribe(
      (response: any) => {
        const savedCreditMemo = response.detail;
        this.router
          .navigate([`/feature/memo/home/preview/${savedCreditMemo.id}`])
          .then(() => {
            this.toastService.show(
              new Alert(AlertType.SUCCESS, 'Successfully saved memo!')
            );
          });
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(AlertType.ERROR, 'Unable to save memo!')
        );
      }
    );
  }

  private buildForm(memo: Memo): void {
    this.form = this.formBuilder.group({
      id: [memo?.id],
      version: [memo?.version],
      type: [memo?.type?.id, Validators.required],
      referenceNumber: [memo?.referenceNumber, Validators.required],
      subject: [memo?.subject, Validators.required],
      content: [memo?.content, Validators.required],
      documentStatus: [
        EnumUtils.getEnum(DocStatus, DocStatus.PENDING),
        Validators.required,
      ],
      previousStageList: [memo?.previousStageList],
      currentStage: [memo?.currentStage],
    });
  }

  private fetchMemoTypes(): void {
    this.memoTypeService.getAll().subscribe(
      (response) => {
        this.memoTypes = response.detail;
        this.spinner = false;
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(AlertType.ERROR, 'Failed to load memo types')
        );
        this.spinner = false;
      }
    );
  }
}
