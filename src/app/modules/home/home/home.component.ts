import { Component, OnInit } from '@angular/core';

import { HomeService } from './../../../core/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  uid: any = {};
  userData = [];

  constructor(private homeService: HomeService) {
    this.uid = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.get(this.uid.uid);
  }

  get(id: string) {
    this.homeService
      .get(id)
      .get()
      .then((res) => {
        res.forEach((data) => {
          this.userData.push(data.data());
        });
      });
  }
}
