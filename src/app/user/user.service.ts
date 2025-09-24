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

  // Inicializar DB y carga usuarios de ejemplo
  async init() {
    this._storage = await this.storage.create();
    const existingUsers = await this._storage.get(this.USERS_KEY);

    if (!existingUsers || existingUsers.length === 0) {
      const defaultUsers: User[] = [
        { fullName: 'Admin', email: 'admin@test.com', username: 'admin', password: 'admin123', role: 1 },
        { fullName: 'Cliente', email: 'cliente@test.com', username: 'cliente', password: 'cliente123', role: 2 }
      ];

      for (const user of defaultUsers) {
        await this.registerUser(user); 
      }
    }
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
