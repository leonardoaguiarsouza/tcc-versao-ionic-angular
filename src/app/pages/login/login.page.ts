import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Users } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  public userLogin: Users = {};
  public userRegister: Users = {};
  // private loading: any;

  constructor(public loading: LoadingService, public toastCtrl: ToastController, private authService: AuthService) { }

  ngOnInit() {
  }

  fieldsReset() {
    this.userLogin.email = '';
    this.userLogin.password = '';
  }

  loginGoogle(){
    try {
      this.authService.loginGoogle();
    } catch (error) {
      console.log(error);
      this.presentToast(error.message);
    } 
  }

  loginFacebook(){
    try {
      this.authService.loginFacebook();
    } catch (error) {
      console.log(error);
      this.presentToast(error.message);
    } 
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      console.log(error);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
      this.fieldsReset();
    }
  }

  async presentLoading() {
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000,
      color: "danger"
    });
    toast.present();
    }

}
