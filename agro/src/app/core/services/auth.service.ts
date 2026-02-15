import { Injectable, signal, computed } from '@angular/core';

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly state = signal<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  readonly isAuthenticated = computed(() => this.state().isAuthenticated);
  readonly user = computed(() => this.state().user);

  login(username: string, _password: string): boolean {
    // Demo: aceptar cualquier usuario/contraseña
    this.state.set({
      isAuthenticated: true,
      user: username || 'Usuario',
    });
    return true;
  }

  logout(): void {
    this.state.set({
      isAuthenticated: false,
      user: null,
    });
  }
}
