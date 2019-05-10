import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabHomePage } from './tab-home.page';
import { TruncateModule } from '@yellowspot/ng-truncate';

const routes: Routes = [
  {
    path: '',
    component: TabHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruncateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabHomePage]
})
export class TabHomePageModule {}
