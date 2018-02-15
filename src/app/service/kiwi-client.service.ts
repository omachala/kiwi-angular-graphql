import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {FlightsSearch} from '../class/Search';
import {jsonToGraphQLQuery} from 'json-to-graphql-query';
import {Query} from '../class/Query';
import {AllFlightsQuery} from '../class/AllFlightsQuery';
import {AllFlights} from '../class/AllFlights';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Flight} from '../class/Flight';

@Injectable()
export class KiwiClientService {

    loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    flightsResultSubject: Subject<Array<Flight>> = new Subject;

    constructor(private apollo: Apollo) {
    }

    public searchFlights(params: FlightsSearch) {

        const allFlights = new AllFlights();
        allFlights.__args = params;
        const q = new Query(new AllFlightsQuery(allFlights));

        const CurrentUserForProfile = gql(jsonToGraphQLQuery(q));

        console.log(jsonToGraphQLQuery(q));

        this.apollo.watchQuery({
            query: CurrentUserForProfile,
            variables: {},
        })
            .valueChanges
            .subscribe(({data, loading}) => {
                this.loadingSubject.next(loading);
                const results = data['allFlights']['edges'].map(item => <Flight>item.node);
                this.flightsResultSubject.next(results);
            });
    }

}
