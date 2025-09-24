// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.authService.isLoggedIn();

    if (isLoggedIn) {
      return true;
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Sesión expirada',
        message: 'Debes iniciar sesión para continuar.',
        buttons: ['OK']
      });
      await alert.present();

      this.router.navigate(['/login']);
      return false;
    }
  }
}
