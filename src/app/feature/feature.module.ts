import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller/seller.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerComponent
  ],
  exports :[
    SellerComponent
  ]
})
export class FeatureModule { }
