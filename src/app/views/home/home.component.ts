import { Component, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxChartsModule } from "@swimlane/ngx-charts";

import { CreditCardService } from '../credit-card/credit-card.service';
import { RandomlyColorService } from '../../services/randomly-color/randomly-color.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {

  clientId = localStorage.getItem('currentUserId');

  creditCards = [];
  total: any;

  single = [];
  view: any[] = [700, 400];
  
  // options
  gradient: boolean = true;
  
  objDomain = [];
  singleContent = [];
  colorScheme = { domain: [] };

  @BlockUI('ngBlockHome') ngBlockHome: NgBlockUI;

  constructor( private creditCard: CreditCardService,
               private route: Router,
               private randomlyColorService: RandomlyColorService){}
        
  ngOnInit(){
    this.getCreditCard();
  } 

  getCreditCard(){
    let obj = {};
    // const fullPayments = [];

    this.creditCard.getCreditCard(this.clientId)
                    .pipe(take(1))
                    .subscribe( ( data: any ) =>{
                      this.total = 0;

                      data.creditCard.map( cc => {
                        this.creditCards.push(cc);
                        
                        cc.payments.map( resPayment => {

                          this.total += resPayment.value;

                          cc.total = this.total / 100;
                          cc.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

                          obj = { name: resPayment.description,  value: resPayment.value };

                          this.singleContent.push(obj);
                        });
                      });

                      // const counts = fullPayments.reduce( (prev, curr) =>{
                      //   const count = prev.get(curr.description) || 0;
                      //   prev.set(curr.description, curr.value + count);
                      //   return prev;
                      // }, new Map());

                      // const reduceFullPayments = [...counts].map( ([description, value]) =>{
                      //   return { description , value };
                      // });

                      // console.log(reduceFullPayments);
                      // this.single = reduceFullPayments;


                      this.single = this.singleContent;
                      
                      //generate ramdomly colorScheme
                      this.getRamdomlyColor();
                    });
  }

  getRamdomlyColor(){
      this.objDomain = [];

      // create colorscheme randomly
      for( let c = 0; c < this.single.length; c++){
        this.objDomain.push( this.randomlyColorService.randomColor() );
      }
      
      this.colorScheme = { domain : this.objDomain };
  }

  onSelectedCC(data): void {
    this.route.navigate(['/creditCard']);
  }
}