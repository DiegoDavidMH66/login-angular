import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule, MatDrawerMode } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  private readonly breakpoints = inject(BreakpointObserver);
  private readonly auth = inject(AuthService);

  readonly isHandset = toSignal(
    this.breakpoints.observe(Breakpoints.Handset).pipe(map((r) => r.matches)),
    { initialValue: false }
  );

  readonly user = this.auth.user;

  readonly navItems: NavItem[] = [
    { label: 'Clientes', route: '/dashboard/clientes', icon: 'people' },
    { label: 'Productos', route: '/dashboard/productos', icon: 'inventory_2' },
  ];

  get sidenavMode(): MatDrawerMode {
    return this.isHandset() ? 'over' : 'side';
  }

  get sidenavOpened(): boolean {
    return !this.isHandset();
  }

  logout(): void {
    this.auth.logout();
  }
}
