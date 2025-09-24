import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

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
    }, 3000); // Splash de 3 segundos
  }
}