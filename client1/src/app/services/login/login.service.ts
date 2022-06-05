import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginViewDto } from 'src/app/models/login-view-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:5001/api/v1';

  constructor(private http: HttpClient) { }

  public login(login: LoginViewDto){
    const url = `${this.apiUrl}/login`;

    return this.http.post(url, login);
  }

}
