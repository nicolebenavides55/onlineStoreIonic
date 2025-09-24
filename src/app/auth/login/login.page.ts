import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertCtrl: AlertController) { }

  async login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === this.username && u.password === this.password);

    console.log('users', users)
    console.log('user', user)

    if (user) {
      // Guardar sesión temporal
      localStorage.setItem('currentUser', JSON.stringify(user));

      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Inicio de sesión exitoso',
        buttons: ['OK'],
      });
      await alert.present();

      // Redirigir a home
      this.router.navigate(['/login']);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK'],
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
}