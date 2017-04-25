import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import 'hammerjs';

import { TabletClientComponent } from './tablet-client/tablet-client.component';
import { ApiRestService } from './api-rest.service';
import { SnackService } from './snack.service';

@NgModule({
  declarations: [
    AppComponent,
    TabletClientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [
    ApiRestService,
    SnackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
