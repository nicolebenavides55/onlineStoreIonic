import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Login validando con bcrypt
  async login(username: string, password: string): Promise<boolean> {
    let users = await this._storage?.get('users') || [];
    const user = users.find((u: any) => u.username === username);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch;
    }
    return false;
  }
}
