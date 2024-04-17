import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SellerComponent
  ],
  exports: [SellerComponent]
})
export class SellerModule { }
