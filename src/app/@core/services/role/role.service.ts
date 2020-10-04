import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/services';
import { Role } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseService<Role> {
  static API = 'v1/roles';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return RoleService.API;
  }
}
