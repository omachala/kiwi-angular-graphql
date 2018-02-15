import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {KiwiGraphQLModule} from './kiwi-graphql/kiwi-graphql.module';
import {SearchComponent} from './components/search/search.component';
import {KiwiClientService} from './service/kiwi-client.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResultsComponent} from './components/results/results.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        ResultsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        KiwiGraphQLModule,
        NgbModule.forRoot()
    ],
    providers: [
        KiwiClientService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
