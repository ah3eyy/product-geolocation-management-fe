import {Injectable} from '@angular/core';
import {CacheService} from './caches.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

interface LogResponse {
  istatus: boolean;
  token: string;
  role: string;
  code: number;
  message: string;
}

export interface IAuthStatus {
  isAuthenticated: boolean;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {

  resstatus: boolean | undefined;

  login(token: string, data: any) {
    this.logout();
    this.setCookie('token', token, 1);
    this.setCookie('user', JSON.stringify(data), 1);
  }

  saveUniqueToken(unique_token: any) {
    this.setCookie('unique_token', unique_token, 1);
  }

  getUniqueToken() {
    return this.getCookie('unique_token');
  }

  saveInterceptor(token: any) {
    return this.setCookie('IDP_TOKEN', token, 1);
  }

  getInterceptor() {
    return this.getCookie('IDP_TOKEN');
  }

  saveUser(data: any) {
    this.setCookie('user', JSON.stringify(data), 1);
  }

  logout() {
    this.deleteCookie('token', ' ', 2);
    this.deleteCookie('user', ' ', 2);
    this.deleteCookie('unique_token', ' ', 2);
  }

  isAuthenticate() {
    if (this.getCookie('token') !== '' && this.getCookie('token') != null) {
      return true;
    }
    return false;
  }

  getLogin() {
    return this.getCookie('token');
  }

  getUser() {
    if (this.getCookie('user'))
      return JSON.parse(this.getCookie('user'));

    return null;
  }

  getToken() {

    if (this.getCookie('token')) {
      return this.getCookie('token');
    }

    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  authStatus(): IAuthStatus {
    return {
      'isAuthenticated': this.isAuthenticate(),
      'role': this.getRole(),
      'token': this.getLogin()
    };
  }

  getRole() {
    return this.getCookie('role');
  }

  constructor(private httpClient: HttpClient, private route: Router) {
    super();
  }


}
