import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;
  private readonly USERS_KEY = 'users';
  private readonly SESSION_KEY = 'session';

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Login
  async login(username: string, password: string): Promise<User | null> {
    const users: User[] = (await this._storage?.get(this.USERS_KEY)) || [];

    const foundUser = users.find(u => u.username === username);
    if (!foundUser) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (isMatch) {
      // Guardar sesión
      await this._storage?.set(this.SESSION_KEY, foundUser);
      return foundUser;
    } else {
      return null;
    }
  }

  // Cerrar sesión
  async logout(): Promise<boolean> {
    try {
      await this._storage?.remove(this.SESSION_KEY);
      return true;
    } catch (e) {
      console.error('Error cerrando sesión', e);
      return false;
    }
  }

  async getSession(): Promise<any> {
    return await this.storage.get(this.SESSION_KEY);
  }

  async isLoggedIn(): Promise<boolean> {
    const session = await this.getSession();
    return !!session;
  }
}
