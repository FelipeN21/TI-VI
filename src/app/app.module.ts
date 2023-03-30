import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './dependencies/material.module';
import { ArduinoComponent } from './components/arduino/arduino.component';
import { RedeComponent } from './components/rede/rede.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { GraphComponent } from './components/rede/graph/graph.component';
import { AppService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ArduinoComponent, RedeComponent, GraphComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
