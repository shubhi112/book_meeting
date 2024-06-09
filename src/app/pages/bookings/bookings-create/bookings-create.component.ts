import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  rooms = Array.from({ length: 10 }, (_, i) => i + 1);
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      username: ['', Validators.required],
      date: [new Date(), Validators.required],
      startTime: [new Date(), Validators.required],
      endTime: ['', [Validators.required, this.validateMeetingDuration()]],
      roomNo: ['', Validators.required],
      agenda: ['', Validators.required]
    }, { validators: this.validateMeetingTime() })
    this.setDefaultValues();
    this.getBookings()
  }
  getBookings() {
    this.bookingService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }
  setDefaultValues(): void {
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
  formatTime(date: Date): string {
    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
  }
  showDialog() {
    this.visible = true;
  }
  createBooking() {
    if (this.bookingForm.valid) {
      if (this.bookingForm.valid) {
        const meeting = this.bookingForm.value;
        const { date, startTime, endTime } = meeting;
        console.log(date, startTime, endTime)

        this.bookingService.isSlotAvailable(date, startTime, endTime).subscribe(available => {
          console.log(available)
          if (available) {
            console.log(meeting)
            this.bookingService.addBooking(meeting).subscribe(() => {
              this.getBookings()
              this.bookingForm.reset();
              this.setDefaultValues();
              this.visible = false;
            });
          } else {
            console.log("error")
          }
        });
      }
    }
  }
}
