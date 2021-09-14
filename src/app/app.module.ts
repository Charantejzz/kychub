import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { AmlComponent } from './aml/aml.component';
import {SliderModule} from 'primeng/slider';
import {DropdownModule} from 'primeng/dropdown';
import { AmlSearchService } from './onboarding/aml-search.service';
import { AddHttpHeaderInterceptor } from './add-http-header.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OnboardingComponent,
    AmlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    SliderModule,
    DropdownModule,
    HttpClientModule
  ],
  providers: [[{
    provide:HTTP_INTERCEPTORS,
    useClass:AddHttpHeaderInterceptor,
    multi:true,
  }],AmlSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
