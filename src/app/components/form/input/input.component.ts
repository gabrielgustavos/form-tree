import { FormGroup } from '@angular/forms';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() label!: string;
  @Input() required!: boolean;
  @Input() formControlName!: string;
  @Input() formGroup!: FormGroup;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() mask!: string;
}
