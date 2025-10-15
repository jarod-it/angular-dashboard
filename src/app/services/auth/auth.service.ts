import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_STORAGE_KEY = 'auth_token';

  constructor(private storage: StorageService) {}

  getAuthentication(): boolean {
    return this.storage.getData(this.AUTH_STORAGE_KEY) === 'true';
  }

  setAuthentication(isAuthenticated: boolean): void {
    this.storage.saveData(this.AUTH_STORAGE_KEY, isAuthenticated.toString());
  }
}
