import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/booking-event.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-room-bookings-details',
  templateUrl: './room-bookings-details.component.html',
  styleUrls: ['./room-bookings-details.component.css']
})
export class RoomBookingsDetailsComponent {

  bookings: any;
  bookingAddedSubscription!: Subscription;
  constructor(private bookingService: BookingService, private eventService: EventService) { }

  ngOnInit(): void {
    this.getBookings()
    this.bookingAddedSubscription = this.eventService.bookingAdded$.subscribe(() => {
      this.getBookings();
    });
  }
  getBookings() {
    this.bookingService.getBookings().subscribe(booking => {
      this.bookings = booking;
    });
  }
}
