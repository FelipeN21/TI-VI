import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  lumAtual: number = 0;
  tempAtual: number = 0;
  umAtual: number = 0;
  interval = setInterval(() => {
    this.getData();
  }, 2000);

  constructor(private service: AppService) {}

  async getData() {
    //   try {
    //     const promises = await Promise.all([
    //       lastValueFrom(this.service.getLight()),
    //       lastValueFrom(this.service.getTempeture()),
    //       lastValueFrom(this.service.getUmidity()),
    //     ]);
    //     this.lumAtual = promises[0];
    //     this.tempAtual = promises[1];
    //     this.umAtual = promises[2];
    //   } catch {}
    // }
    this.lumAtual = Math.floor(Math.random() * 100);
    this.tempAtual = Math.floor(Math.random() * 60);
    this.umAtual = Math.floor(Math.random() * 100);
  }
}
