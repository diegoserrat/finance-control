import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cards-client',
  templateUrl: './cards-user.component.html',
  styleUrls: ['./cards-user.component.scss'],
})
export class CardsUserComponent implements OnInit {
  @Input() data: any = [];
  @Input() title: string;
  @Input() isUserData: boolean;

  @Output() eventEmmit = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  editUser() {
    this.eventEmmit.emit({});
  }

  deleteUser() {
    this.eventEmmit.emit({});
  }

  newExpensive() {
    this.eventEmmit.emit({});
  }
}
