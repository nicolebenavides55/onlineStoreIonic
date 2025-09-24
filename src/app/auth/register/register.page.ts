import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  fullName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private alertCtrl: AlertController) { }

  async register() {
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Obtener usuarios guardados o crear arreglo vacío
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Validar si el usuario ya existe
    if (users.some((u: any) => u.username === this.username)) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'El usuario ya existe',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Agregar nuevo usuario
    users.push({ fullName: this.fullName, email: this.email, username: this.username, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Registro completado correctamente',
      buttons: ['OK'],
    });
    await alert.present();

    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}