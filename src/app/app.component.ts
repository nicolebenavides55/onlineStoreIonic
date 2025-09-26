import { Component } from '@angular/core';
import { UserService } from './user/user.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    await this.userService.init();
  }
}