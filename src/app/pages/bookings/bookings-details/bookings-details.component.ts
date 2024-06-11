import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/booking-event.service';

@Component({
  selector: 'app-bookings-details',
  templateUrl: './bookings-details.component.html',
  styleUrls: ['./bookings-details.component.css']
})
export class BookingsDetailsComponent implements OnInit {
  userBookings: any;
  loggedInUsername!: any
  bookingAddedSubscription!: Subscription;

  constructor(private bookingService: BookingService, private messageService: MessageService, private eventService: EventService) {
    this.loggedInUsername = localStorage.getItem('username');

  }

  ngOnInit(): void {
    this.bookingAddedSubscription = this.eventService.bookingAdded$.subscribe(() => {
      this.getBookings();
    });
    this.getBookings()
  }
  getBookings() {
    this.bookingService.getBookings().subscribe(bookings => {
      this.userBookings = bookings.filter((booking: any) => booking.username === this.loggedInUsername);
    });
  }
  deleteBooking(id: number) {
    if (window.confirm('Do you really want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe(() => {
        this.getBookings();
      });
    }
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deleted successfully!' });
  }
}
