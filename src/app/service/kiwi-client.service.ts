import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {Search} from '../class/Search';
import {jsonToGraphQLQuery} from 'json-to-graphql-query';
import {Query} from '../class/Query';
import {AllFlightsQuery} from '../class/AllFlightsQuery';
import {AllFlights} from '../class/AllFlights';

@Injectable()
export class KiwiClientService {


    constructor(private apollo: Apollo) {
    }

    public search() {

        const queryParams = new Search();
        queryParams.search.from.location = 'Prague';
        queryParams.search.to.location = 'London';
        queryParams.search.date.exact = '2018-03-01';
        queryParams.search.date.exact = '2018-03-05';

        const allFlights = new AllFlights();
        allFlights.__args = queryParams;
        const q = new Query(new AllFlightsQuery(allFlights));

        const CurrentUserForProfile = gql(jsonToGraphQLQuery(q));
        console.log(jsonToGraphQLQuery(q));

        this.apollo.watchQuery<any>({
            query: CurrentUserForProfile,
            variables: {},
        })
            .valueChanges
            .subscribe(({data, loading}) => {
                console.log(data);
            });
    }

}
