import {Component, OnInit} from '@angular/core';
import {Flight} from '../../class/Flight';
import {KiwiClientService} from '../../service/kiwi-client.service';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

    found = null;
    currentPage = 1;
    perPage = 5;

    results: Array<Flight> = [];
    pagedResults: Array<Flight> = [];

    constructor(private client: KiwiClientService) {
    }

    ngOnInit() {
        this.client.flightsResultSubject.subscribe((results: Array<Flight>) => {
            this.results = results;
            this.found = this.results.length;
            this.pageChange(1);
        });
    }

    pageChange(page: number) {
        this.currentPage = page;
        const start = (page - 1) * this.perPage;
        const end = start + this.perPage;
        this.pagedResults = this.results.slice(start, end > this.found ? this.found : end);
    }

}
