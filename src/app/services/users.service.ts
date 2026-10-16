import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';

interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
interface ApiUsersResponse {
  users: ApiUser[];
}

/**
 * La página no llama directamente a la API: delega en este servicio.
 * DummyJSON es una API pública de demostración; sus datos no se guardan
 * cuando se crean/editar usuarios.
 */
@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/users';

  async getUsers(): Promise<User[]> {
    const response = await firstValueFrom(
      this.http.get<ApiUsersResponse>(this.apiUrl)
    );
    return response.users.map((apiUser) => ({
      id: apiUser.id,
      name: `${apiUser.firstName} ${apiUser.lastName}`,
      email: apiUser.email,
      active: apiUser.id % 2 === 1
    }));
  }

  async getActiveUsers(): Promise<User[]> {
    const users = await this.getUsers();
    return users.filter(user => user.active);
  }

  async getUserById(id: number): Promise<User | undefined> {
    const users = await this.getUsers();
    return users.find(user => user.id === id);
  }
}