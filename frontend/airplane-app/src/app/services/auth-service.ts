import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly TOKEN_KEY = "airplane_token";
  private token: string | null = localStorage.getItem(this.TOKEN_KEY);
  private router = inject(Router);

  login(credentials: {email: string, password: string}) {
    return this.http.post<{token:string}>(`http://localhost:3000/api/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        })
      );
  }

  getToken():string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);

    this.router.navigate(['/login']);
  }
}
