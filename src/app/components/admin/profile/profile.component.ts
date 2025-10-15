import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FieldComponent } from './partials/field/field.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, FieldComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm = new FormGroup({
    fieldUsername: new FormControl(),
    fieldPassword: new FormControl(),
    fieldWebsite: new FormControl(),
  });

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log(JSON.stringify(this.profileForm.value));

    if(!JSON.stringify(this.profileForm.value)) return alert('Veuillez remplir au moins 1 champ !');

    this.edit(JSON.stringify(this.profileForm.value));
  }

  edit(field: string) {
    this.http
    .post<{success: boolean}> (
        'http://localhost:4005/api/user:edit',
        JSON.stringify(this.profileForm.value),
        this.httpOptions
    )
    .subscribe (
        (response) => {
            if(response.success) {
                return 'Formulaire envoyé';
            } else {
                return 'Une erreur est survenue';
            }
        }
    )
}
}
