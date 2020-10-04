import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UserStates {
  private authenticatedSubject: BehaviorSubject<User>;
  public authenticated$: Observable<User>;

  constructor() {
    this.authenticatedSubject = new BehaviorSubject<User>(null);
    this.authenticated$ = this.authenticatedSubject.asObservable();
  }

  public setAuthenticatedUser(user: User): void {
    this.authenticatedSubject.next(user);
  }
}
