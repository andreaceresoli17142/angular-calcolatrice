import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcolatriceScientificaComponent } from './calcolatrice-scientifica.component';

describe('CalcolatriceScientificaComponent', () => {
  let component: CalcolatriceScientificaComponent;
  let fixture: ComponentFixture<CalcolatriceScientificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcolatriceScientificaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcolatriceScientificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
