/** Angular components */
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
/** Data models */
import { UserSettings } from '../Data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  // Original form field model
  originalUserSettings: UserSettings;

  // Copy of the original form field model
  userSettings = { ...this.originalUserSettings };
  constructor() { }

  ngOnInit() {
   }

  onBlur(field: NgModel) {
    console.log('in onBlur:', field.valid);
  }

  onSubmit(form: NgForm) {
    console.log('In onSubmit:', form.valid);
  }
}
