import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/services';
import { MemoType } from '../../models/memo/memo-type.model';

@Injectable({
  providedIn: 'root',
})
export class MemoTypeService extends BaseService<MemoType> {
  static API = 'v1/memo-type';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return MemoTypeService.API;
  }
}
