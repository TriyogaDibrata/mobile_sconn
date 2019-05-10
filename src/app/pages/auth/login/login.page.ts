import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgControl } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/sevices/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user : any = {};
  token: any;

  constructor(private loading: LoadingController,
              private authService: AuthService,
              private navCtrl: NavController,
              private alertService: AlertService,
              ) { }

  ngOnInit() {
    this.authService.getToken().then(data => {
      console.log(this.authService.isLoggedIn);
      if (this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('tabs');
      }
    });
  }

  async login(){
    const loading = await this.loading.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    loading.present();

    this.authService.login(this.user.email, this.user.password)
      .subscribe(data => {
        console.log(data['success']);
        if (data['success']) {
          this.navCtrl.navigateRoot('tabs');
          loading.dismiss();
        }
        this.token = data['success']['token'];
        console.log(this.token);
      }, err => {
        console.error(err);
        this.alertService.presentAlert('Login Failed', 'Please Check Your Credentials');
        loading.dismiss();
    });

  }

}
