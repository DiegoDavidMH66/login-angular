import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'clientes' },
      {
        path: 'clientes',
        loadComponent: () =>
          import('../clientes/clientes-page/clientes-page.component').then(
            (m) => m.ClientesPageComponent
          ),
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('../productos/productos-page/productos-page.component').then(
            (m) => m.ProductosPageComponent
          ),
      },
    ],
  },
];
