import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-rede',
  templateUrl: './rede.component.html',
  styleUrls: ['./rede.component.css'],
})
export class RedeComponent implements OnInit, OnChanges {
  @Input() lightGraphValue: number = 0;
  @Input() tempGraphValue: number = 0;
  @Input() umGraphValue: number = 0;
  page: number = 0;

  // Variáveis de luminosidade
  histLight: boolean = false;
  lightGaugeMergeOptions = {};
  lightLineMergeOptions = {};
  lightLinesData: number[] = [0];
  lightLinesValue: number[] = [];
  lightGaugeOptions!: EChartsOption;
  lightLineOptions!: EChartsOption;

  // Variáveis de temperatura
  histTemp: boolean = false;
  tempGaugeMergeOptions = {};
  tempLineMergeOptions = {};
  tempLinesData: number[] = [0];
  tempLinesValue: number[] = [];
  tempGaugeOptions!: EChartsOption;
  tempLineOptions!: EChartsOption;

  // Variáveis de umidade
  histUm: boolean = false;
  umGaugeMergeOptions = {};
  umLineMergeOptions = {};
  umLinesData: number[] = [0];
  umLinesValue: number[] = [];
  umGaugeOptions!: EChartsOption;
  umLineOptions!: EChartsOption;

  constructor(private cd: ChangeDetectorRef, private appService: AppService) {}

  ngOnInit(): void {
    this.setupData();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.setupData();
  }

  setupData() {
    this.lightGaugeOptions = this.chartLightGaugeOption(this.lightGraphValue);
    this.lightLineOptions = this.chartLightLineOption(this.lightGraphValue);
    this.tempGaugeOptions = this.chartTempGaugeOption(this.tempGraphValue);
    this.tempLineOptions = this.chartTempLineOption(this.tempGraphValue);
    this.umGaugeOptions = this.chartUmGaugeOption(this.umGraphValue);
    this.umLineOptions = this.chartUmLineOption(this.umGraphValue);
  }

  pageLeft() {
    if (this.page > 0) this.page--;
    else this.page = 2;
  }

  pageRight() {
    if (this.page < 2) this.page++;
    else this.page = 0;
  }

  toggleHistTemp() {
    this.histTemp = !this.histTemp;
  }

  toggleHistLight() {
    this.histLight = !this.histLight;
  }

  toggleHistUm() {
    this.histUm = !this.histUm;
  }

  chartLightGaugeOption(value: number): EChartsOption {
    return {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, '#fd666d'],
                [0.7, '#dddd60'],
                [1, '#50ff70'],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4,
            },
          },
          axisLabel: {
            color: 'auto',
            distance: 40,
            fontSize: 14,
          },
          detail: {
            valueAnimation: true,
            formatter: `${value > 100 ? '100+' : value} lm`,
            color: 'auto',
            fontSize: '16px',
          },
          data: [
            {
              value: value,
            },
          ],
        },
      ],
    };
  }

  chartLightLineOption(newValue: number): EChartsOption {
    this.lightLinesData.push(
      this.lightLinesData[this.lightLinesData.length - 1] + 1
    );
    this.lightLinesValue.push(newValue);
    return {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.lightLinesData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.lightLinesValue,
          type: 'line',
          areaStyle: {},
        },
      ],
    };
  }

  chartTempGaugeOption(value: number): EChartsOption {
    return {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 30,
          },

          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 30,
            },
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -20,
            color: '#999',
            fontSize: 20,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 40,
            fontWeight: 'bolder',
            formatter: `${value > 100 ? '100+' : value} °C`,
            color: 'auto',
          },
          data: [
            {
              value: value,
            },
          ],
        },

        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
            color: '#FD7347',
          },
          progress: {
            show: true,
            width: 8,
          },

          pointer: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: 50,
            },
          ],
        },
      ],
    };
  }

  chartTempLineOption(newValue: number): EChartsOption {
    this.tempLinesData.push(
      this.tempLinesData[this.tempLinesData.length - 1] + 1
    );
    this.tempLinesValue.push(newValue);
    return {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.tempLinesData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.tempLinesValue,
          type: 'line',
          areaStyle: {},
        },
      ],
    };
  }

  chartUmGaugeOption(value: number): EChartsOption {
    return {
      series: [
        {
          type: 'gauge',
          progress: {
            show: true,
            width: 18,
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 14,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 26,
            offsetCenter: [0, '70%'],
            formatter: `${value > 100 ? '100' : value}%`,
          },
          data: [
            {
              value: value,
            },
          ],
        },
      ],
    };
  }

  chartUmLineOption(newValue: number): EChartsOption {
    this.umLinesData.push(this.umLinesData[this.umLinesData.length - 1] + 1);
    this.umLinesValue.push(newValue);
    return {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.umLinesData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.umLinesValue,
          type: 'line',
          areaStyle: {},
        },
      ],
    };
  }

  exportCSV(type: 'light' | 'temp' | 'um') {
    switch (type) {
      case 'light':
        this.appService.exportToCsv(
          this.lightLinesData,
          this.lightLinesValue,
          'Lumens',
          'Luminosidade'
        );
        break;
      case 'temp':
        this.appService.exportToCsv(
          this.tempLinesData,
          this.tempLinesValue,
          'Graus Celsius',
          'Temperatura'
        );
        break;
      case 'um':
        this.appService.exportToCsv(
          this.umLinesData,
          this.umLinesValue,
          'Porcentagem',
          'Umidade'
        );
        break;
    }
  }
}
