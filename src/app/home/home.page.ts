import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor() { }

  async ngOnInit() {
    // Mostrar splash screen al iniciar la página
    await SplashScreen.show({
      autoHide: true,          // Oculta automáticamente
      fadeOutDuration: 300,    // Opcional, en ms
    });
  }

}
