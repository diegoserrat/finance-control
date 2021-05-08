import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsHomeDebitsComponent } from './cards-home-debits.component';

describe('CardsHomeDebitsComponent', () => {
  let component: CardsHomeDebitsComponent;
  let fixture: ComponentFixture<CardsHomeDebitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsHomeDebitsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsHomeDebitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
