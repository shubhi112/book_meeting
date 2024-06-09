import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Booking } from '../shared/models/Booking';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`)
  }

  addBooking(booking: Booking): Observable<Booking> {
    const formattedBooking = this.formatBooking(booking);
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, formattedBooking)
  }
  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${id}`);
  }
  isSlotAvailable(date: any, startTime: any, endTime: any, roomNo: string): Observable<boolean> {
    return this.getBookings().pipe(
      map(bookings => {
        const parseDateTime = (dateTimeStr: string): number => {
          return new Date(dateTimeStr).getTime();
        };

        const requestedStartTime = parseDateTime(startTime);
        const requestedEndTime = parseDateTime(endTime);
        const minMeetingDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

        const startOfDay = new Date(date);
        startOfDay.setHours(9, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(18, 0, 0, 0);

        if (bookings.length === 0) {
          return requestedStartTime >= startOfDay.getTime() && requestedEndTime <= endOfDay.getTime();
        }

        const bookingsForDate = bookings.filter(booking => booking.roomNo == roomNo).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

        if (bookingsForDate.length === 0) {
          return requestedStartTime >= startOfDay.getTime() && requestedEndTime <= endOfDay.getTime();
        }

        const firstMeetingStartTime = new Date(bookingsForDate[0].startTime).getTime();
        if (requestedStartTime >= startOfDay.getTime() && requestedEndTime <= firstMeetingStartTime) {
          if ((firstMeetingStartTime - startOfDay.getTime()) >= minMeetingDuration) {
            return true;
          }
        }

        for (let i = 0; i < bookingsForDate.length - 1; i++) {
          const currentMeetingEndTime = new Date(bookingsForDate[i].endTime).getTime();
          const nextMeetingStartTime = new Date(bookingsForDate[i + 1].startTime).getTime();
          if (requestedStartTime >= currentMeetingEndTime && requestedEndTime <= nextMeetingStartTime) {
            if ((nextMeetingStartTime - currentMeetingEndTime) >= minMeetingDuration) {
              return true;
            }
          }
        }

        const lastMeetingEndTime = new Date(bookingsForDate[bookingsForDate.length - 1].endTime).getTime();
        if (requestedStartTime >= lastMeetingEndTime && requestedEndTime <= endOfDay.getTime()) {
          if ((endOfDay.getTime() - lastMeetingEndTime) >= minMeetingDuration) {
            return true;
          }
        }

        return false;
      })
    );
  }
  getAvailableRooms(date: any, startTime: any, endTime: any): Observable<any> {
    const rooms = ["Room1", "Room2", "Room3"];
    const parseDateTime = (dateTimeStr: string): number => {
      return new Date(dateTimeStr).getTime();
    };
    return this.getBookings().pipe(
      map(bookings => {
        return rooms.filter(room => {
          return bookings.every(booking => {
            if (booking.roomNo == room) {
              const bookingStartTime = new Date(booking.startTime).getTime();
              const bookingEndTime = new Date(booking.endTime).getTime();
              const requestedStartTime = parseDateTime(startTime);
              const requestedEndTime = parseDateTime(endTime);
              return requestedStartTime >= bookingEndTime || requestedEndTime <= bookingStartTime;
            }
            return true;
          });
        });
      })
    );
  }

  private formatBooking(booking: Booking): Booking {
    return {
      ...booking,
      date: this.formatDateTime(new Date(booking.date)),
      startTime: this.formatDateTime(new Date(booking.startTime)),
      endTime: this.formatDateTime(new Date(booking.endTime)),
    };
  }
  private formatDateTime(date: Date): string {
    return date.toString(); // e.g., "Sun Jun 09 2024 15:09:09 GMT+0530 (India Standard Time)"
  }
}

