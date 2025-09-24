import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private platform: Platform,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    await this.userService.init();
  }

  ngOnInit() {
    // Simular carga de la app
    setTimeout(() => {
      const splash = document.getElementById('splash');
      const appContent = document.getElementById('appContent');
      if (splash && appContent) {
        splash.style.display = 'none';
        appContent.style.display = 'block';
      }

      // Redirigir al login
      this.router.navigate(['/login']);
    }, 2000); // Splash de 2 segundos
  }
}