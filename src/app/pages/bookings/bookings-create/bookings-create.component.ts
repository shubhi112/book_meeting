import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bookings-create',
  templateUrl: './bookings-create.component.html',
  styleUrls: ['./bookings-create.component.css']
})
export class BookingsCreateComponent {
  bookingForm!: FormGroup
  visible: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      username: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      roomNo: [0, Validators.required],
      agenda: ['', Validators.required]
    })
  }

  showDialog() {
    this.visible = true;
  }
  createBooking() {
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value);
      this.bookingForm.reset();
    }
  }
}
