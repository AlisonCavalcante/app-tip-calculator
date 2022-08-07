import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  form!: FormGroup;
  totalBill!: number;
  tipPerson: number = 0;
  totalAmountPerson: number = 0;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      bill: [null, Validators.required],
      custom: [null],
      numberPeople: [null, Validators.required]
    })
  }

  reset() {
    this.form.reset();
    this.tipPerson = 0.00;
  }

  calculateTip(porcetagemTip: number) {
    this.totalBill = this.form.get('bill')?.value;
    if(this.totalBill != 0) {
      this.tipPerson = this.totalBill * (porcetagemTip / 100);
      if(this.form.get('numberPeople')?.value != 0) {
        this.totalAmountPerson = (this.totalBill +  this.tipPerson) / this.form.get('numberPeople')?.value;
        this.tipPerson = this.tipPerson / this.form.get('numberPeople')?.value;
      }
    }
  }

}
