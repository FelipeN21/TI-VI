import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Planta } from 'src/app/plantas/planta.model';
import { Plantas } from 'src/app/plantas/plantas';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-arduino',
  templateUrl: './arduino.component.html',
  styleUrls: ['./arduino.component.css'],
})
export class ArduinoComponent implements OnInit {
  @Input() lumAtual?: number;
  @Input() tempAtual?: number;
  @Input() umAtual?: number;
  showSpinner = false;
  lightOn = true;
  bombOn = false;
  PLANTAS: Planta[] = Plantas.PLANTAS;
  plantaSelecionada?: Planta;

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.showSpinner = true;
    try {
      const light = await lastValueFrom(this.service.getLedState());
      const bomb = await lastValueFrom(this.service.getBombState());
      this.lightOn = light;
      this.bombOn = bomb;
    } finally {
      this.showSpinner = false;
    }
  }

  async toggleLight() {
    this.showSpinner = true;
    try {
      await lastValueFrom(this.service.toggleLed());
      await this.getData();
    } finally {
      this.showSpinner = false;
    }
  }

  async toggleBomb() {
    this.showSpinner = true;
    try {
      await lastValueFrom(this.service.toggleBomb());
      await this.getData();
    } finally {
      this.showSpinner = false;
    }
  }

  getStateText(type: 'temp' | 'light' | 'um'): string {
    if (this.plantaSelecionada) {
      if (type === 'temp') {
        if (this.tempAtual) {
          switch (
            this.isInMargin(this.tempAtual, this.plantaSelecionada.temperatura)
          ) {
            case 1:
              return 'Alta';
            case 0:
              return 'OK';
            case -1:
              return 'Baixa';
            default:
              return 'ERRO';
          }
        } else {
          return 'ERRO';
        }
      } else if (type === 'light') {
        if (this.lumAtual) {
          switch (
            this.isInMargin(this.lumAtual, this.plantaSelecionada.luminosidade)
          ) {
            case 1:
              return 'Alta';
            case 0:
              return 'OK';
            case -1:
              return 'Baixa';
            default:
              return 'ERRO';
          }
        } else {
          return 'ERRO';
        }
      } else {
        if (this.umAtual) {
          switch (
            this.isInMargin(this.umAtual, this.plantaSelecionada.umidade)
          ) {
            case 1:
              return 'Alta';
            case 0:
              return 'OK';
            case -1:
              return 'Baixa';
            default:
              return 'ERRO';
          }
        } else {
          return 'ERRO';
        }
      }
    } else {
      return '-';
    }
  }

  getStateColor(type: 'temp' | 'light' | 'um'): string {
    if (this.plantaSelecionada) {
      switch (type) {
        case 'temp':
          if (this.tempAtual) {
            switch (
              this.isInMargin(
                this.tempAtual,
                this.plantaSelecionada.temperatura
              )
            ) {
              case 1:
                return 'background-color: rgba(255,0,0,0.2);';
              case 0:
                return 'background-color: rgba(0,255,0,0.2);';
              case -1:
                return 'background-color: rgba(255,0,0,0.2);';
              default:
                return 'background-color: rgba(0,0,0,0.2);';
            }
          } else {
            return 'background-color: rgba(0,0,0,0.2);';
          }
        case 'light':
          if (this.lumAtual) {
            switch (
              this.isInMargin(
                this.lumAtual,
                this.plantaSelecionada.luminosidade
              )
            ) {
              case 1:
                return 'background-color: rgba(255,0,0,0.2);';
              case 0:
                return 'background-color: rgba(0,255,0,0.2);';
              case -1:
                return 'background-color: rgba(255,0,0,0.2);';
              default:
                return 'background-color: rgba(0,0,0,0.2);';
            }
          } else {
            return 'background-color: rgba(0,0,0,0.2);';
          }
        case 'um':
          if (this.umAtual) {
            switch (
              this.isInMargin(this.umAtual, this.plantaSelecionada.umidade)
            ) {
              case 1:
                return 'background-color: rgba(255,0,0,0.2);';
              case 0:
                return 'background-color: rgba(0,255,0,0.2);';
              case -1:
                return 'background-color: rgba(255,0,0,0.2);';
              default:
                return 'background-color: rgba(0,0,0,0.2);';
            }
          } else {
            return 'background-color: rgba(0,0,0,0.2);';
          }
      }
    } else {
      return 'background-color: rgba(0,0,0,0.2);';
    }
  }

  isInMargin(valorAtual: number, valorIdeal: number): number {
    const COEFICIENTE_DE_MARGEM = 0.15;
    let upperValue = valorIdeal + COEFICIENTE_DE_MARGEM * valorIdeal;
    let lowerValue = valorIdeal - COEFICIENTE_DE_MARGEM * valorIdeal;
    if (valorAtual >= lowerValue && valorAtual <= upperValue) {
      return 0;
    } else if (valorAtual < lowerValue) {
      return -1;
    } else {
      return 1;
    }
  }
}
