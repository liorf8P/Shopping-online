import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { loggedGuard } from './guards/logged.guard';
import { UnloggedGuard } from './guards/unlogged.guard';


const routes: Routes = [
  {
    path: 'homepage', component: HomepageComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent, canActivate: [UnloggedGuard] },
      { path: '', pathMatch: "full", redirectTo: "login" },
      { path: '**', redirectTo: "" }
    ]
  },
  { path: 'store', component: StoreComponent, canActivate: [loggedGuard] },
  { path: '', pathMatch: "full", redirectTo: "homepage/login" },
  { path: '**', redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
