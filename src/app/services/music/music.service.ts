import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Music } from 'src/app/models/music';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private apiUrl = `${environment.apiUrl}/songs`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  registerMusic(music: Music): Observable<Music> {
    const token = localStorage.getItem(this.authService.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<Music>(this.apiUrl, music, { headers });
  }

  getTopSongs(period: string): Observable<Music[]> {
    const token = localStorage.getItem(this.authService.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Music[]>(
      `${this.apiUrl}/most-played?period=${period}`,
      { headers }
    );
  }
}
