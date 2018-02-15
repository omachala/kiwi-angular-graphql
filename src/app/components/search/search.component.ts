import {Component, OnInit} from '@angular/core';
import {KiwiClientService} from '../../service/kiwi-client.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FlightsSearch} from '../../class/FlightsSearch';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {LocationsSearch} from '../../class/LocationsSearch';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

    now = new Date();
    dateModel = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
    minDate = Object.assign({}, this.dateModel);

    loading = false;
    flightsSearch: FlightsSearch = new FlightsSearch();
    form: FormGroup;
    search = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .switchMap(term => {
                if (term.length < 2) {
                    return [];
                }

                const params = new LocationsSearch();
                params.search = term;
                return this.client.searchLocations(params).valueChanges.map(data => {
                    return data['data']['allLocations']['edges'].map(item => item.node.name);
                });
            });

    constructor(private client: KiwiClientService, private formBuilder: FormBuilder) {
        const currentDate = new Date();

        this.form = this.formBuilder.group({
            flightFrom: ['', Validators.compose([Validators.required])],
            flightTo: ['', Validators.compose([Validators.required])],
            flightDate: ['', Validators.compose([Validators.required])],
        });
    }

    onSubmit(formGroup: FormGroup) {
        const dateValue = formGroup.controls['flightDate'].value;
        const dateObject = new Date(dateValue.year, this.dateModel.month - 1, this.dateModel.day + 1);
        this.flightsSearch.search.from.location = formGroup.controls['flightFrom'].value;
        this.flightsSearch.search.to.location = formGroup.controls['flightTo'].value;
        this.flightsSearch.search.date.exact = dateObject.toISOString().substring(0, 10);
        this.client.searchFlights(this.flightsSearch);
    }

    ngOnInit() {
        this.client.loadingSubject.subscribe((loading: boolean) => this.loading = loading);
    }

}
