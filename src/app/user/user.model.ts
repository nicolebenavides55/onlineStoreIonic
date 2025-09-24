// Definimos los roles disponibles
export enum UserRole {
  Admin = 1,
  Client = 2,
}

// Interfaz del usuario
export interface User {
  id?: number;           // Opcional (SQLite suele autogenerarlo)
  fullName: string;      // Nombre completo del usuario
  email: string;         // Correo único
  username: string;      // Nombre de usuario único
  password: string;      // Contraseña encriptada
  role: UserRole;        // Rol del usuario (enum UserRole)
}
