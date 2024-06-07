import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsCreateComponent } from './bookings-create.component';

describe('BookingsCreateComponent', () => {
  let component: BookingsCreateComponent;
  let fixture: ComponentFixture<BookingsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsCreateComponent]
    });
    fixture = TestBed.createComponent(BookingsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
