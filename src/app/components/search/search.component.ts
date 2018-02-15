import {Component, OnInit} from '@angular/core';
import {KiwiClientService} from '../../service/kiwi-client.service';
import {FlightsSearch} from '../../class/Search';
import {Flight} from '../../class/Flight';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    loading = false;
    results: Array<Flight> = [];

    constructor(private client: KiwiClientService) {
    }

    ngOnInit() {

        this.client.flightsResultSubject.subscribe((results: Array<Flight>) => this.results = results);
        this.client.loadingSubject.subscribe((loading: boolean) => this.loading = loading);

        const queryParams = new FlightsSearch();
        queryParams.search.from.location = 'Prague';
        queryParams.search.to.location = 'London';
        queryParams.search.date.exact = '2018-03-01';
        queryParams.search.date.exact = '2018-03-05';

        this.client.searchFlights(queryParams);


    }

}
