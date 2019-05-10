import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env/env.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavController, AlertController, MenuController, ToastController, PopoverController, ModalController, IonInfiniteScroll, Platform, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss'],
})
export class TabHomePage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  limit : any = 5;
  truncated : boolean = true;
  clicked_id: any;

  data: any = {};
  
  constructor(private http: HttpClient,
              private env: EnvService,
              private authService: AuthService) { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.getData();
    this.getUser();
  }

  getData(infiniteScroll?){
    let headers = new HttpHeaders({
      "Authorization": "Bearer "+ this.authService.token
    });

    this.http.get(this.env.API_URL+ 'list?limit='+this.limit, {headers: headers})
    .subscribe(data => {
      console.log(data);
      this.data = data['data'];
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
    }, err => {
       console.log(err);
    })
  }

  doRefresh(event) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.token,
      'Accept': 'application/json'
    });

    this.http.get(this.env.API_URL + 'list?limit=' + this.limit, { headers: headers })
      .subscribe(data => {
        console.log(data['data']);
        this.data = data['data'];
        event.target.complete();
      }, err => {
        console.log(err);
        event.target.complete();
      })
  }
  loadMore(infiniteScroll) {
    this.limit = this.data.length + 5;
    this.getData(infiniteScroll);

    if (this.limit == this.data.length) {
      infiniteScroll.enable(false);
      this.infiniteScroll.disabled;
    }
  }

  getUser(){
    let headers = new HttpHeaders({
      "Authorization": "Bearer "+ this.authService.token
    });
    this.http.get(this.env.API_URL+ 'detailUser', {headers: headers})
    .subscribe(resp => {
      console.log(resp['success']);
    })
  }

}
