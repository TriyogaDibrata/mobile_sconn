import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgControl } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/sevices/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: any = {};
  token: any;

  constructor(private loading: LoadingController,
              private authService: AuthService,
              private navCtrl: NavController,
              private alertService: AlertService,) { }

  ngOnInit() {
  }

  async register() {
    const loading = await this.loading.create({
      message: 'Please wait...'
    });
    loading.present();
    this.authService.register(this.user.name, this.user.email, this.user.password, this.user.c_password).subscribe(
      data => {
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
      },
      error => {
        loading.dismiss();
        console.log(error);
        this.alertService.presentAlert('Register Failed', 'Cannot Store Data to Database')
      },
      () => {

      }
    );
  }



}
