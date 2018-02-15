import {Component, OnInit} from '@angular/core';
import {Flight} from '../../class/Flight';
import {KiwiClientService} from '../../service/kiwi-client.service';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

    results: Array<Flight> = [];

    constructor(private client: KiwiClientService) {
    }

    ngOnInit() {
        this.client.flightsResultSubject.subscribe((results: Array<Flight>) => this.results = results);
    }

}
