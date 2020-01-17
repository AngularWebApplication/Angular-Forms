import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Customer } from './customer';

function emailMatcher(c: AbstractControl): {[key: string]: boolean} | null {
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');
  if ( emailControl.pristine || confirmControl.pristine) {
      return null;
  } else if (emailControl.value === confirmControl.value) {
      return null;
  } else {
    return { 'match': true };
  }
}

function ratingRange( min: number, max: number ): ValidatorFn {
  return ( c: AbstractControl ): { [ key: string ]: boolean } | null => {
    if ( c.value !== null && ( isNaN( c.value ) || c.value < min || c.value > max ) ) {
      return { 'range': true };
    } else {
      return null;
    }
  };
}

@Component( {
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: [ './customer.component.css' ]
} )
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  emailMessage: string;

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  private validationMessage = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
    this.customerForm = this.fb.group( {
      firstName: [ '', [ Validators.required, Validators.minLength( 3 ) ] ],
      lastName: [ '', [ Validators.required, Validators.maxLength( 50 ) ] ],
      emailGroup: this.fb.group({
        email: [ '', [ Validators.required, Validators.email ] ],
        confirmEmail: [ '', Validators.required ],
      }, {validators: emailMatcher}),
      phone: '',
      notification: 'email',
      rating: [ null, ratingRange( 1, 5 ) ],
      sendCatalog: true,
      addresses: this.fb.array( [ this.buildAddress()])
    } );
    this.customerForm.get('notification').valueChanges.subscribe( value => this.setNotification(value));
    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(debounceTime(1000)).subscribe(() => this.setMessage(emailControl));
  }
  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }
  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }
  setMessage( emailControl: AbstractControl ): void {
    this.emailMessage = '';
    if ((emailControl.touched || emailControl.dirty) && emailControl.errors) {
      this.emailMessage = Object.keys(emailControl.errors).map( key => this.validationMessage[key]).join(' ');
    }
  }
  populateTestData(): void {
    this.customerForm.patchValue( {
      firstName: 'Jack',
      lastName: 'Harkness',
      sendCatalog: false
    } );
  }
  setNotification( notifyVia: string ): void {
    const phoneControl = this.customerForm.get( 'phone' );
    if ( notifyVia === 'text' ) {
      phoneControl.setValidators( Validators.required );
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
  save() {
    console.log( this.customerForm );
    console.log( 'Saved: ' + JSON.stringify( this.customerForm.value ) );
  }
}
