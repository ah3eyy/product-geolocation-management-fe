import {Injectable} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  CanActivateChild, Route,
} from '@angular/router';
import {AuthService, IAuthStatus} from './auth.service';
import {Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {UserServiceService} from "./user-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  protected currentAuthStatus: IAuthStatus;
  redirectUrl: string | null | undefined;

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected route: ActivatedRoute,
    public userService: UserServiceService
  ) {
    this.currentAuthStatus = authService.authStatus();
    route.paramMap.subscribe(
      params => (this.redirectUrl = params.get('redirectUrl'))
    );
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute);
  }

  protected checkLogin(route?: ActivatedRouteSnapshot) {
    let roleMatch = true;
    let params: any;

    let idempKey = uuidv4();

    this.authService.saveInterceptor(idempKey);

    console.log(this.currentAuthStatus);

    if (!this.currentAuthStatus.isAuthenticated) {
      this.showAlert(this.currentAuthStatus.isAuthenticated, roleMatch);
      this.router.navigate(['/']);
      return false;
    }

    if (!roleMatch) {
      this.showAlert(this.currentAuthStatus.isAuthenticated, roleMatch);
      this.router.navigate([this.redirectUrl, params || {}]);
      return false;
    }

    return true;
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      // this.uiService.showToast('You must login to continue');
    }

    if (!roleMatch) {
      // this.uiService.showToast('You do not have the permissions to view this resource');
    }
  }
}
