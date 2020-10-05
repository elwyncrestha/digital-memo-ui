import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../base/services';
import { Memo } from '../../models';
import { AppUtils } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class MemoService extends BaseService<Memo> {
  static API = 'v1/memo';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  public action(obj: any): Observable<any> {
    const api = `${this.getApi()}/action`;
    const req = AppUtils.getRequest(api);

    return this.http.post(req.url, obj, { headers: req.header });
  }

  protected getApi(): string {
    return MemoService.API;
  }
}
