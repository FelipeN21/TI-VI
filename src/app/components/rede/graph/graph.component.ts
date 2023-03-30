import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  @Input() mergeOptions = {};
  @Input() options: EChartsOption = {};

  constructor() {}

  ngOnInit(): void {}
}
