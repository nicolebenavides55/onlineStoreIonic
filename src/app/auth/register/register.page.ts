import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User, UserRole } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  fullName = '';
  email = '';
  role: UserRole = UserRole.Client;
  username = '';
  password = '';
  confirmPassword = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private userService: UserService,
  ) { }

  // Registrar a un usuario (Rol Cliente)
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

    const existingUser = await this.userService.getUserByUsername(this.username);
    if (existingUser) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'El nombre de usuario ya existe',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const newUser: User = {
      fullName: this.fullName,
      email: this.email,
      role: this.role,
      username: this.username,
      password: this.password
    };

    await this.userService.registerUser(newUser);

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Usuario registrado correctamente',
      buttons: ['OK'],
    });
    await alert.present();

    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}