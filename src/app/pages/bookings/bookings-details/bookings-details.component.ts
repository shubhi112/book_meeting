import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-bookings-details',
  templateUrl: './bookings-details.component.html',
  styleUrls: ['./bookings-details.component.css']
})
export class BookingsDetailsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }
}
