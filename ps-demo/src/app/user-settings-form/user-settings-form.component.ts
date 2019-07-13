/** Angular components */
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
/** Data models and Services */
import { UserSettings } from '../Data/user-settings';
import { DataService } from '../Data/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  // Maximum rating a user can provide
  maxRating = 10;
  // Setting field's read only attribute
  isReadonly = false;
  // Original form field model
  originalUserSettings: UserSettings;

  // Copy of the original form field model
  userSettings = { ...this.originalUserSettings };

  postError = false;
  postErrorMessage = ' ';
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.userSettings.subscriptionTypes = this.dataService.getSubscriptionTypes();
    this.userSettings.singleModel = 'On';
    this.userSettings.startDate = new Date();
    this.userSettings.startTime = new Date();
  }

  onBlur(field: NgModel) {
    console.log('in onBlur:', field.valid);
  }

  onHttpError(errorResponse: HttpErrorResponse): void {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error;
  }

  onSubmit(form: NgForm) {
    console.log('In onSubmit:', form.valid);
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above erorrs';
    }
  }
}
