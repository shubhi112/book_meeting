import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings-details',
  templateUrl: './bookings-details.component.html',
  styleUrls: ['./bookings-details.component.css']
})
export class BookingsDetailsComponent {
  bookings!: [{
    id: 1,
    username: "Shubhi",
    agenda: "Do some work",
    date: "9 June 2024",
    startTime: '1:30',
    endTime: '2:00'
    roomNo: 2
  }]
}
