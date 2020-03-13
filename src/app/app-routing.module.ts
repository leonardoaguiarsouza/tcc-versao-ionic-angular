import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule', canActivate: [LoginGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'note', loadChildren: './pages/note-details/note-details.module#NoteDetailsPageModule', canActivate: [AuthGuard] },
  { path: 'note/:id', loadChildren: './pages/note-details/note-details.module#NoteDetailsPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
