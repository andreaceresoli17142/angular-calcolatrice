import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcolatriceSempliceComponent } from './calcolatrice-semplice.component';

describe('CalcolatriceSempliceComponent', () => {
  let component: CalcolatriceSempliceComponent;
  let fixture: ComponentFixture<CalcolatriceSempliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcolatriceSempliceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcolatriceSempliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
