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
  rooms: any | undefined;
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
    this.rooms = ["Room1", "Room2", "Room3", "Room4", "Room5", "Room6", "Room7", "Room8", "Room9", "Room10"];
  }
  setDefaultValues(): void {
    const now = new Date();
    this.bookingForm.patchValue({
      date: now,
      startTime: now,
      endTime: new Date(now.getTime() + 30 * 60000) // Default end time 30 minutes later
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

  showDialog() {
    this.visible = true;
  }
  createBooking() {
    if (this.bookingForm.valid) {
      const booking = this.bookingForm.value;
      this.bookingService.addBooking(booking).subscribe({
        next: (result) => {
          this.bookingForm.reset();
          this.visible = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
