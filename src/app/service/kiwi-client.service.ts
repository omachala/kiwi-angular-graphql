import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {jsonToGraphQLQuery} from 'json-to-graphql-query';
import {Query} from '../class/Query';
import {AllFlightsQuery} from '../class/AllFlightsQuery';
import {AllFlights} from '../class/AllFlights';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Flight} from '../class/Flight';
import {FlightsSearch} from '../class/FlightsSearch';
import {LocationsSearch} from '../class/LocationsSearch';
import {AllLocations} from '../class/AllLocations';
import {AllLocationsQuery} from '../class/AllLocationsQuery';

@Injectable()
export class KiwiClientService {

    loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    flightsResultSubject: Subject<Array<Flight>> = new Subject;

    constructor(private apollo: Apollo) {
    }

    public searchFlights(params: FlightsSearch): void {
        this.loadingSubject.next(true);

        const allFlights = new AllFlights();
        allFlights.__args = params;
        const q = new Query(new AllFlightsQuery(allFlights));
        const gqlQuery = gql(jsonToGraphQLQuery(q));

        this.apollo.watchQuery({
            query: gqlQuery,
            variables: {},
        })
            .valueChanges
            .subscribe(({data, loading}) => {
                this.loadingSubject.next(false);
                const results = data['allFlights']['edges'].map(item => <Flight>item.node);
                this.flightsResultSubject.next(results);
            });
    }

    public searchLocations(params: LocationsSearch) {

        const allLocations = new AllLocations();
        allLocations.__args = params;
        const q = new Query(new AllLocationsQuery(allLocations));
        const gqlQuery = gql(jsonToGraphQLQuery(q));

        return this.apollo.watchQuery({
            query: gqlQuery,
            variables: {},
        });

    }

}
