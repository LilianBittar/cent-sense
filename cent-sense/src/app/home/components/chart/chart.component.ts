import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: number[] = [];
  ngAfterViewInit() {
    this.drawChart();
  }

  ngOnChanges() {
    this.drawChart();
  }

  drawChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }
  
    // Example: Draw a simple line
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 200);
    ctx.stroke();
  }
}