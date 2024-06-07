import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsDetailsComponent } from './bookings-details.component';

describe('BookingsDetailsComponent', () => {
  let component: BookingsDetailsComponent;
  let fixture: ComponentFixture<BookingsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsDetailsComponent]
    });
    fixture = TestBed.createComponent(BookingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
