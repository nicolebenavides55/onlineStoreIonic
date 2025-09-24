import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from 'src/app/user/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _storage: Storage | null = null;
  private USERS_KEY = 'users';

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  // Registrar usuario con contraseña encriptada
  async registerUser(user: User) {
    let users = await this._storage?.get('users') || [];

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(user.password, 10);

    users.push({
      ...user,
      password: hashedPassword
    });

    await this._storage?.set('users', users);
    return true;
  }

  // Obtener todos los usuarios
  async getUsers(): Promise<User[]> {
    return (await this._storage?.get(this.USERS_KEY)) || [];
  }

  // Buscar usuario por username
  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await this.getUsers();
    return users.find(u => u.username === username);
  }
}
