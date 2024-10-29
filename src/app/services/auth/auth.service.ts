import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAuth } from 'src/app/models/userAuth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth/login`;

  public tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(userAuth: UserAuth): Observable<any> {
    return this.http.post<any>(this.apiUrl, userAuth).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      }),
      catchError((error) => {
        console.error('Erro no login', error);

        return of(null);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
