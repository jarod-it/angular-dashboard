import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';
import { NgIf, NgFor } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NgIf, NgFor, JsonPipe, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  signinForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  users: User[] = [];

  constructor(private router: Router, private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
  }

  onSubmit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    console.log(JSON.stringify(this.signinForm.value));

    this.http
      .post<{ success: boolean }>(
        'http://localhost:4005/api/auth/signin',
        JSON.stringify(this.signinForm.value),
        httpOptions
      )
      .subscribe(
        (response) => {
          if (response.success) this.router.navigate(['/admin/login']);
          else alert('Ce nom de compte existe déjà !');
        },

        (err) => {
          console.error('An error occurred:', err);
        }
      );
  }
}
