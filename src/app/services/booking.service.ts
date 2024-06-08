import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Booking } from '../shared/models/Booking';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000';
  private bookingsSubject: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([]);
  public bookings$: Observable<Booking[]> = this.bookingsSubject.asObservable(); // Creates a new Observable with this Subject as the source (booking list k liye I created)

  constructor(private http: HttpClient) {
    this.loadMyBookings();
  }

  private loadMyBookings(): void {
    this.http.get<Booking[]>(`${this.apiUrl}/bookings`).subscribe((bookings) => {
      this.bookingsSubject.next(bookings);
    });
  }

  getBookings(): Observable<Booking[]> {
    return this.bookings$;
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking).pipe(
      tap((newBooking) => {
        const currentBookings = this.bookingsSubject.value;
        this.bookingsSubject.next([...currentBookings, newBooking]);
      })
    );
  }
  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${id}`);
  }
}
