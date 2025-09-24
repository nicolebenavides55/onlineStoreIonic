import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false,
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(
    private router: Router, 
    // private alertCtrl: AlertController
  ) {}

  async sendRecovery() {
    // Aquí iría la lógica real de envío de correo (API REST)
    // console.log('Correo de recuperación enviado a:', this.email);

    // const alert = await this.alertCtrl.create({
    //   header: 'Éxito',
    //   message: 'Se ha enviado un correo para recuperar la contraseña',
    //   buttons: ['OK'],
    // });
    // await alert.present();

    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}