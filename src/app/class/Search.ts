import {FlightsSearchInput} from './FlightsSearchInput';
import {FlightsOptionsInput} from './FlightsOptionsInput';
import {FlightsFiltersInput} from './FlightsFiltersInput';

export class Search {

    search: FlightsSearchInput = new FlightsSearchInput();
    options: FlightsOptionsInput = new FlightsOptionsInput();
    filters: FlightsFiltersInput = new FlightsFiltersInput();
    after: string;
    first: number;
    before: string;
    last: number;

}
