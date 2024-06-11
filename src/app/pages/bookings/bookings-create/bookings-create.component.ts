import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventService } from 'src/app/services/booking-event.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-bookings-create',
  templateUrl: './bookings-create.component.html',
  styleUrls: ['./bookings-create.component.css']
})
export class BookingsCreateComponent {
  bookingForm!: FormGroup
  visible: boolean = false;
  bookings: any;
  availableRooms: string[] = [];
  loggedInUsername: string | null;
  minDate!: Date;
  constructor(private fb: FormBuilder, private bookingService: BookingService, private messageService: MessageService, private eventService: EventService) {
    this.loggedInUsername = localStorage.getItem('username');
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      username: [this.loggedInUsername || '', Validators.required],
      date: [new Date(), Validators.required],
      startTime: [new Date(), Validators.required],
      endTime: ['', [Validators.required, this.validateMeetingDuration()]],
      roomNo: ['', Validators.required],
      agenda: ['', Validators.required]
    }, { validators: this.validateMeetingTime() })
    this.bookingForm.get('startTime')?.valueChanges.subscribe(() => this.availableRooms = []);
    this.bookingForm.get('endTime')?.valueChanges.subscribe(() => this.availableRooms = []);
    this.setDefaultValues();
    this.getBookings()
    this.minDate = new Date();
  }
  getBookings() { //get all bookings
    this.bookingService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  searchAvailableRooms(): void { // to search the availability of rooms
    const { date, startTime, endTime } = this.bookingForm.value;
    if (!date || !startTime || !endTime) {
      return;
    }
    this.bookingService.getAvailableRooms(date, startTime, endTime).subscribe(rooms => {
      this.availableRooms = rooms;
    });
  }
  setDefaultValues(): void {  // set default values of time on the form
    const now = new Date();
    this.bookingForm.patchValue({
      date: now,
      startTime: now,
      endTime: new Date(now.getTime() + 30 * 60000)
    });
  }
  validateMeetingDuration(): (control: AbstractControl) => { [key: string]: boolean } | null {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const startTime = this.bookingForm?.get('startTime')?.value;
      const endTime = control.value;
      if (startTime && endTime) {
        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();
        if ((end - start) < 30 * 60000) {
          return { 'shortDuration': true };
        }
      }
      return null;
    };
  }

  validateMeetingTime(): (group: AbstractControl) => { [key: string]: boolean } | null {
    return (group: AbstractControl): { [key: string]: boolean } | null => {
      const startTime = group.get('startTime')?.value;
      const endTime = group.get('endTime')?.value;
      if (startTime && endTime) {
        const start = new Date(startTime).getHours();
        const end = new Date(endTime).getHours();
        if (start < 9 || end > 18 || (end === 18 && new Date(endTime).getMinutes() > 0)) {
          return { 'invalidTime': true };
        }
      }
      return null;
    };
  }
  formatTime(date: Date): string { // get time in correct format
    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
  }
  showDialog() {
    this.visible = true;
  }

  createBooking() {
    if (this.bookingForm.valid) {
      const meeting = this.bookingForm.value;
      const { date, startTime, endTime, roomNo } = meeting;

      this.bookingService.isSlotAvailable(date, startTime, endTime, roomNo).subscribe(available => {
        if (available) {
          this.bookingService.addBooking(meeting).subscribe(() => {
            //this.getBookings()
            this.eventService.notifyBookingAdded();
            this.bookingForm.reset();
            this.setDefaultValues();
            this.visible = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Meeting added successfully' });
          });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Some error occurred!' });
        }
      });
    }
  }
}
