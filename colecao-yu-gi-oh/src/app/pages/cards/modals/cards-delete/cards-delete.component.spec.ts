import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDeleteComponent } from './cards-delete.component';

describe('CardsDeleteComponent', () => {
  let component: CardsDeleteComponent;
  let fixture: ComponentFixture<CardsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
