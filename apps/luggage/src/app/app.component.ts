import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CheckinComponent } from '@flight-demo/luggage/feature-checkin';
import { ReportLossComponent } from '@flight-demo/luggage/feature-report-loss';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CheckinComponent,
    ReportLossComponent,
  ],
  selector: 'flight-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'luggage';
}
