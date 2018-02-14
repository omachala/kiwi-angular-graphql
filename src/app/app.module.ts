import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {KiwiGraphQLModule} from './kiwi-graphql/kiwi-graphql.module';
import {SearchComponent} from './components/search/search.component';
import {KiwiClientService} from './service/kiwi-client.service';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        KiwiGraphQLModule,
    ],
    providers: [
        KiwiClientService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
