import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Key } from 'src/app/interfaces/key';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private url: string = 'https://safe-depths-95733.herokuapp.com';

  constructor(private http: HttpClient) { }

  getVapidPublicKey(): Observable<Key> {
    const endpoint = `${this.url}/api/keys/vapid`;
    return this.http.get<Key>(endpoint).pipe(
      catchError(this.handleError<Key>('getVapidPublicKey'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
