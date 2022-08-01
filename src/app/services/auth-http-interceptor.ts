import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authService.getToken();
    const deviceLock = this.authService.getUniqueToken();
    const idempotencyToken = this.authService.getInterceptor();
    const authRequest = req.clone(
      {
        setHeaders:
          {
            authorization: `Bearer ${jwt}`,
            DeviceLock: deviceLock,
            'Idempotency-key': idempotencyToken
          }
      }
    );
    return next.handle(authRequest).pipe(
      catchError((err, caught) => {
        if (err.status === 401) {
          this.router.navigate(['/'], {
            queryParams: {redirectUrl: this.router.routerState.snapshot.url},
          });
        }

        if (err.status === 451) {
          console.log(err)
          this.router.navigate(['/user/on-boarding'], {
            queryParams: {step: err.error.step}
          })
        }

        return observableThrowError(err);
      })
    );
  }
}
