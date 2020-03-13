import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (
    private authService: AuthService,
    private navCtrl: NavController
  ) { }
  
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user=> {
        if(user) this.navCtrl.navigateForward('home');
          resolve(!user ? true : false)
      })
    })
  }
}
