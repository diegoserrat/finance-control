import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cards-client',
  templateUrl: './cards-user.component.html',
  styleUrls: ['./cards-user.component.scss'],
})
export class CardsUserComponent implements OnInit {
  @Input() data;

  constructor() {}

  ngOnInit(): void {}
}
