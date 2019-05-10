import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-tab-profile',
  templateUrl: './tab-profile.page.html',
  styleUrls: ['./tab-profile.page.scss'],
})
export class TabProfilePage implements OnInit {

  constructor(private alertCtrl: AlertController,
              private storage: Storage,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi!',
      message: 'Apakah anda yakin untuk keluar ?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Iya',
          handler: () => {
            this.storage.remove('user')
              .then(() => {
                this.navCtrl.navigateRoot('login');
              });
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
