import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoModule } from './todo/todo.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'todo',
    redirectTo: 'todo'
  }
];

export const routing = RouterModule.forRoot(routes);
