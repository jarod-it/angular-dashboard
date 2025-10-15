import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './field.component.html',
})
export class FieldComponent {
    @Input() label: string = '';
    @Input() fieldName: string = '';
    @Input() value: string = '';
    @Input() control: FormControl = new FormControl();

    public editMode: boolean = false;
    public editName: string = '';
    
    constructor() {}

    setEditField(field: string) {
        this.editMode = true;
        this.editName = field;
        console.log(this.editMode, this.editName);
    }

    removeEditField() {
        this.editMode = false;
        this.editName = '';
    }
}