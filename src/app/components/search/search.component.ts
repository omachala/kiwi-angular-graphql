import {Component, OnInit} from '@angular/core';
import {KiwiClientService} from '../../service/kiwi-client.service';
import {FlightsSearch} from '../../class/Search';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    loading = false;
    flightsSearch: FlightsSearch = new FlightsSearch();
    form: FormGroup;

    constructor(private client: KiwiClientService, private formBuilder: FormBuilder) {
        const currentDate = new Date();

        this.form = this.formBuilder.group({
            flightFrom: ['', Validators.compose([Validators.required])],
            flightTo: ['', Validators.compose([Validators.required])],
            flightDate: [currentDate.toISOString().substring(0, 10), Validators.compose([Validators.required])],
        });
    }

    onSubmit(formGroup: FormGroup) {
        this.flightsSearch.search.from.location = formGroup.controls['flightFrom'].value;
        this.flightsSearch.search.to.location = formGroup.controls['flightTo'].value;
        this.flightsSearch.search.date.exact = formGroup.controls['flightDate'].value;
        this.client.searchFlights(this.flightsSearch);
    }

    ngOnInit() {
        this.client.loadingSubject.subscribe((loading: boolean) => this.loading = loading);
    }

}
