import {LocationInput} from './LocationInput';
import {DateInput} from './DateInput';

export class FlightsSearchInput {

    from: LocationInput = new LocationInput();
    to: LocationInput = new LocationInput();
    date: DateInput = new DateInput();
    returnDate: DateInput = new DateInput();
    // passengers: PassengersInput;

}