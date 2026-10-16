import { Component, OnInit, inject } from '@angular/core';
import {
  IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonSpinner, IonTitle, IonToolbar, IonText, IonRefresher,
  IonRefresherContent
} from '@ionic/angular/standalone';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-page',
  standalone: true,
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  imports: [
    IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList,
    IonSpinner, IonTitle, IonToolbar, IonText, IonRefresher,
    IonRefresherContent
  ]
})
export class UsersPage implements OnInit {
  private readonly usersService = inject(UsersService);
  users: User[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    void this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    try {
      this.users = await this.usersService.getActiveUsers();
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      this.errorMessage = 'No se han podido cargar los usuarios. Comprueba tu conexión e inténtalo de nuevo.';
    } finally {
      this.loading = false;
    }
  }

  handleRefresh(event: CustomEvent): void {
    void this.loadUsers().finally(() => {
      (event.target as HTMLIonRefresherElement).complete();
    });
  }
}