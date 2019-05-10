import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EnvService } from 'src/app/services/env/env.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-add',
  templateUrl: './tab-add.page.html',
  styleUrls: ['./tab-add.page.scss'],
})
export class TabAddPage implements OnInit {

  kategori: any;
  photos: any = [];
  public base64Image: string;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private env: EnvService,
              private alertCtrl: AlertController,
              private camera: Camera,
              private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.photos = [];
  }

  ionViewDidEnter(){
    this.getKategori();
  }

  getKategori(){
    let headers = new HttpHeaders({
      'Authorization': "Bearer "+ this.authService.token
    })
    this.http.get(this.env.API_URL+ 'refkategori', {headers: headers}).subscribe(data => {
      console.log(data);
      this.kategori = data['kategori'];
    })
  }

  async deletePhoto(index) {
    const confirm = await this.alertCtrl.create({
      header: 'Sure you want to delete this photo? There is NO undo!',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    await confirm.present();
  }

  async selectPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload Gambar',
      buttons: [{
        text: 'Pilih Dari Gallery',
        icon: 'photos',
        handler: () => {
          this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Ambil Gamber',
        icon: 'camera',
        handler: () => {
          this.takePhoto(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 100, // picture quality
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      sourceType: sourceType,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }



}
