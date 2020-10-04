import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/services';
import { Memo } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class MemoService extends BaseService<Memo> {
  static API = 'v1/memo';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return MemoService.API;
  }
}
