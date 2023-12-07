import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() data: { key: any, value: any }[] = [];
  
  ngAfterViewInit() {
    this.drawChart();
  }

  ngOnChanges() {
    this.drawChart();
  }

  drawChart() {
    
    const ctx = this.chartCanvas?.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }
    if(this.data.length == 0){
      ctx.clearRect(0, 0, this.chartCanvas.nativeElement.width, this.chartCanvas.nativeElement.height);
      return;
    }
  
    ctx.clearRect(0, 0, this.chartCanvas.nativeElement.width, this.chartCanvas.nativeElement.height);
    
    const chartWidth = this.chartCanvas.nativeElement.width - 5;
    const chartHeight = this.chartCanvas.nativeElement.height - 5;
    
    const maxValue = Math.max(...this.data.map(item => item.value));
    const minValue = Math.min(...this.data.map(item => item.value));
    const valueRange = maxValue - minValue;
    
    const stepX = chartWidth / (this.data.length - 1);
    const stepY = chartHeight / valueRange;
    
    ctx.beginPath();
    ctx.moveTo(0, chartHeight - (this.data[0].value - minValue) * stepY);
    
    for (let i = 1; i < this.data.length; i++) {
      const x = i * stepX;
      const y = chartHeight - (this.data[i].value - minValue) * stepY;
      ctx.lineTo(x, y);
      ctx.fillStyle = 'turquoise'; // Set the fill color to turquoise
      ctx.fillRect(x - 2, y - 2, 4, 4); // Draw a turquoise dot at each point
    }
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth =  .5;
    ctx.stroke();

  }

  getChartValues() {
    let min = 0;
    let max = Math.max(...this.data.map(item => item.value));
    let step = Math.round(max / this.data.length);
    let values = [];
    for (let i = 0; i < this.data.length; i++) {
      if(i % 2 === 0 || i == this.data.length - 1){
        values.push(min + step * i);
      }
    }
    return values.reverse();
  }

}