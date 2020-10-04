import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppUtils } from '../../utils';

export abstract class BaseService<T> {
  protected constructor(protected http: HttpClient) {}

  protected abstract getApi(): string;

  public save(obj: T): Observable<any> {
    const req = AppUtils.getRequest(this.getApi());

    return this.http.post(req.url, obj, { headers: req.header });
  }

  public saveAny(obj: any): Observable<any> {
    const req = AppUtils.getRequest(this.getApi());

    return this.http.post(req.url, obj, { headers: req.header });
  }

  public saveAll(obj: T[]): Observable<any> {
    const req = AppUtils.getRequest(this.getApi());

    return this.http.post(req.url, obj, { headers: req.header });
  }

  public detail(id: number): Observable<any> {
    const api = `${this.getApi()}/${id}`;
    const req = AppUtils.getRequest(api);

    return this.http.get(req.url, { headers: req.header });
  }

  public getAll(): Observable<any> {
    const api = `${this.getApi()}/all`;
    const req = AppUtils.getRequest(api);
    return this.http.get(req.url, { headers: req.header });
  }

  public getAllWithSearch(searchObj: any): Observable<any> {
    const api = `${this.getApi()}/list/all`;
    const req = AppUtils.getRequest(api);

    return this.http.post(req.url, searchObj, { headers: req.header });
  }
}
