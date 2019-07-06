/* Angular Services and Observables*/
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/* Angular Models */
import { UserSettings } from './user-settings';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getSubscriptionTypes(): Observable<string[]> {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }

  postUserSettingsForm(userSettings: UserSettings): Observable<UserSettings> {
    return this.http.post<UserSettings>('https://putsreq.com/JvTCytvqKIweQoJ0IhCx', userSettings);
    //return of(userSettings);
  }
}
