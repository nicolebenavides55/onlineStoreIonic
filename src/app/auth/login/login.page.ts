import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
})
export class LoginPage {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService,
  ) { }

  async login() {
    const isValid = await this.authService.login(this.username, this.password);

    if (isValid) {
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Inicio de sesión correcto',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/products/list']);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}