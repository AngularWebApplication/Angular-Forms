import { Observable } from 'rxjs';

/** Forms User Setting Data Model */
export interface UserSettings {
  name: string;
  singleModel: string;
  startDate: Date;
  startTime: Date;
  rating: number;
  emailOffers: boolean;
  interfaceStyle: string;
  subscriptionTypes: Observable<string[]>;
  notes: string;
}
