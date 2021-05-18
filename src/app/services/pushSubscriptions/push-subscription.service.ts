import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PushSubscriptionService {

  private url: string = 'https://safe-depths-95733.herokuapp.com';

  constructor(private http: HttpClient) { }

  addPushSubscription(subscription: PushSubscription): Observable<PushSubscription> {
    const endpoint = `${this.url}/api/subscriptions`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<PushSubscription>(endpoint, subscription.toJSON(), options).pipe(
      catchError(this.handleError<PushSubscription>(`addPushSubscription`, subscription))
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
