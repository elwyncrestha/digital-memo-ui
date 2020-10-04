import { Injectable } from '@angular/core';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UserStates {
  private authenticated?: User;

  public setAuthenticatedUser(user: User): void {
    this.authenticated = user;
  }

  public getAuthenticatedUser(): User {
    return this.authenticated;
  }
}
