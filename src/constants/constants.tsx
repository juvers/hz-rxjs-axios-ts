import {I18n} from '../models/interface';
import {
  TStringBool,
  TStringNumber,
  TStringString,
} from '../models/types';

// API Constants
export const baseUrl =
  'https://secure.topoftherocknyc.com/TopoftheRockWebAPI/API/';
export const endPoints: TStringString = {
  Status: 'Status',
  SystemVariable: 'SystemVariable',
  Notification: 'Notification',
  TicketType: 'TicketType',
  PackageType: 'PackageType',
  Country: 'Country',
  State: 'State',
  ExitAnswer: 'ExitAnswer',
  FutureCapacityForecast: 'FutureCapacityForecast',
};

export const STEPS: TStringBool = {
  attraction: true,
  tickets: false,
  date: false,
  contact: false,
};

export const PERSONS: TStringNumber = {
  Adult: 0,
  Children: 0,
  Seniors: 0,
};

export const PRICES: TStringNumber = {
  Adult: 38,
  Children: 30,
  Seniors: 40,
};

export const I18N: I18n = {
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  weekdays: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

export const MAX = 20;

export enum TishmanAttraction {
  TopOfTheRockObservationDeck = 1,
  RockefellerCenterTour,
}
