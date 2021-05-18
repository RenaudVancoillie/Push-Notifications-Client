import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Notification } from 'src/app/interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url: string = 'https://safe-depths-95733.herokuapp.com';

  constructor(private http: HttpClient) { }

  sendNotification(notification: Notification) {
    const endpoint = `${this.url}/api/notifications`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Notification>(endpoint, notification, options).pipe(
      catchError(this.handleError<Notification>(`sendNotification`, notification))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
