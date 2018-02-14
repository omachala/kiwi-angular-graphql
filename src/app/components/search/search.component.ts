import {Component, OnInit} from '@angular/core';
import {KiwiClientService} from '../../service/kiwi-client.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    constructor(private client: KiwiClientService) {
    }

    ngOnInit() {
        this.client.search();
    }

}
