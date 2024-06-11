import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private bookingAddedSource = new Subject<void>();
    bookingAdded$ = this.bookingAddedSource.asObservable();

    notifyBookingAdded() {
        this.bookingAddedSource.next();
    }
}
