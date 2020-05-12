import { Component, OnInit, TemplateRef } from '@angular/core';
// import { Router } from '@angular/router';
import { take, first } from 'rxjs/operators';
import * as moment from 'moment/moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CreditCardService } from './credit-card.service';
import { AuthService } from '../../services/auth/auth.service';
import { DateService } from '../../services/date-service/date-service.service';

import { GenerateMonthsService } from './generate-months.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.styl']
})
export class CreditCardComponent implements OnInit {

  modalDeleteCC: BsModalRef;
  
  date: any;

  creditCards = [];
  clientId = localStorage.getItem('currentUserId');

  monthsTab = [];
  yearChange: Number;
  total;

  inputDisabled: boolean;

  allPayments = [];

  @BlockUI('ngBlockCreditCard') ngBlockCreditCard: NgBlockUI;

  constructor( private service: CreditCardService,
               private authService: AuthService,
               private dataService: DateService,
               private modalService: BsModalService,
               private generateMonthsService: GenerateMonthsService){}
        
  ngOnInit(){
    this.generateMonth();
    this.getCreditCard(new Date());
    this.date = new Date();
    this.yearChange = this.date.getMonth()+1;
    //is generating substracting a month was added 
    this.date = this.dataService.subtractMonth(this.date);
  } 

  getCreditCard(date){
      this.creditCards = [];
      this.ngBlockCreditCard.start('Carregando...');

      this.service.getCreditCard(this.clientId)
          .pipe(take(1))
          .subscribe( ( data: any ) => { 
            const data2 = data.creditCard;
            data2.map( data2 =>{
                const pay = data2.payments.filter( payments =>{ 
                  const datePayment = moment(payments.financialDate).format('YYYY/MM');
                  const dateToday = moment(date).format('YYYY/MM');

                  return  datePayment == dateToday ;
                });

                data2.payments = pay;
                
                this.total = 0;

                data2.payments.map( item =>{
                    this.total += item.value;

                    item.value = item.value /100;
                    item.value = item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    item.total = this.total;

                    this.inputDisabled = true;
                });
                data2.total = this.total;
            })
            this.creditCards = data2;
            this.ngBlockCreditCard.stop();

          }, error =>{ if( error.status == 401) this.authService.logout() });
  }

  generateMonth(){
    const dateToday = new Date().getMonth() +1;
    const firstDate = this.dataService.getMonth(dateToday -1);
    const middleDate = this.dataService.getMonth(dateToday);
    const lastDate = this.dataService.getMonth(dateToday +1);
  
    this.monthsTab = [{ month: firstDate }, { month: middleDate }, { month: lastDate}];
  }

  onSelectedMonth(month){
    this.date = this.generateMonthsService.generateMonths(month, moment(this.date).format()).date;
    this.getCreditCard( this.generateMonthsService.generateMonths(month, moment(this.date).format()).date );
    this.monthsTab = this.dataService.arrMonths(this.generateMonthsService.generateMonths(month, moment(this.date).format()) .yearChange);
  }

  deletePayment(item){
    if( item.isFinancial){
        const fullPayments = this.allPayments.filter( payments =>{
           return payments.description == item.description;
        });
  
        for ( let f in fullPayments){
          this.service.deletePayment(fullPayments[f]._id).pipe(take(1)).subscribe( () => this.getCreditCard( new Date() ));
        }
    }else{
      this.service.deletePayment(item._id).pipe(take(1)).subscribe( () => this.getCreditCard( new Date() ));
    } 
  }

  deleteCreditCard(id){
    this.service.deleteCreditCard(id).pipe(take(1)).subscribe(() =>{
      this.closeModalDeleteCC();
      this.getCreditCard(new Date());
    }); 
  }

  eventNewPayment(){
    this.getCreditCard(new Date());
  }

  eventNewCreditCard(){
    this.getCreditCard(new Date());
  }

  openModalDeleteCC( template: TemplateRef<any> ){
    this.modalDeleteCC = this.modalService.show(template);
  }

  closeModalDeleteCC(){
    this.modalDeleteCC.hide();
  }
}
