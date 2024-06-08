import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBookingsDetailsComponent } from './room-bookings-details.component';

describe('RoomBookingsDetailsComponent', () => {
  let component: RoomBookingsDetailsComponent;
  let fixture: ComponentFixture<RoomBookingsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomBookingsDetailsComponent]
    });
    fixture = TestBed.createComponent(RoomBookingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
