import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';
import { NgIf, NgFor } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NgFor, JsonPipe, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  users: User[] = [];

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    /* this.userService.getUsers().subscribe((res: any) => {
      this.users = res.data;
    }); */
  }

  onSubmit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    console.log(JSON.stringify(this.loginForm.value));

    this.http
      .post<{ success: boolean }>(
        'http://localhost:4005/api/auth/login',
        JSON.stringify(this.loginForm.value),
        httpOptions
      )
      .subscribe(
        (response) => {
          if (response.success) {
            this.authService.setAuthentication(true);
            this.router.navigate(['/admin/dashboard']);
          } else {
            alert('Wrong username or password !');
          }
        },

        (err) => {
          console.error('An error occurred:', err);
        }
      );
  }
}
