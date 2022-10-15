import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { GlobalService } from '../../../services/global/global.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  // Properties.
  showAlert: boolean = false;
  alertMessage: string = 'Hello World';
  alertType: 'success' | 'error' = 'success';

  // Output.
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  alertSub$: Subscription;

  constructor(private globalService: GlobalService) {
    // Subscribe to the global service.
    this.alertSub$ = this.globalService.setShowAlert.subscribe((data) => {
      this.showAlert = data.show;
      this.alertMessage = data.message;
      this.alertType = data.type;
    });
    // Auto close in 8 seconds.
    setTimeout(() => {
      this.closeAlert();
    }, 8000);
  }

  ngOnInit(): void {}

  /**
   * This method closes the alert.
   * @method closeAlert
   */
  closeAlert() {
    // Set the alert to false.
    this.globalService.setShowAlert.next({
      show: false,
      message: '',
      type: 'success',
    });
    // Emit the close event.
    this.close.emit();
  }

  /**
   * This method handles ngoOnDestroy.
   * @method ngOnDestroy
   */
  ngOnDestroy() {
    // Unsubscribe from the alert subscription.
    this.alertSub$.unsubscribe();
  }
}
