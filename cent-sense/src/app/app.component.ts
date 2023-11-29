import { Component } from '@angular/core';
import { EventRelayService } from './services/event-relay.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  error_message: string = '';
  success_message: string = '';
  show_error_toast: boolean = false;
  show_success_toast: boolean = false;
  loading: boolean = false;
  
  constructor(private eventRelay: EventRelayService) {
    this.eventRelay.onEventEmit.subscribe((event: any) => {
      switch (event.name) {
        case 'login_success':
          this.success_message = 'Login successful';
          this.show_success_toast = true;
          break;
        case 'login_failure':
          this.error_message = 'Login failed';
          this.show_error_toast = true;
          break;
        case 'logout':
          this.success_message = 'Logout successful';
          this.show_success_toast = true;
          break;
        case 'registration_success':
          this.success_message = 'Registration successful';
          this.show_success_toast = true;
          break;
        case 'registration_failure':
          this.error_message = 'Registration failed';
          this.show_error_toast = true;
        break;
        case 'show_loading':
          this.loading = true;
          break;
        case 'hide_loading':
          this.loading = false;
          break;
        case 'update_user_info_success':
          this.success_message = 'User info updated successfully';
          this.show_success_toast = true;
          break;
        case 'update_user_info_failure':
          this.error_message = 'User info update failed';
          this.show_error_toast = true;
          break;
        default:
          console.log('unknown event received');
          break;
      }
    });
  }
}
