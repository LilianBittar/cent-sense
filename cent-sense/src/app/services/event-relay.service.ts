import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventRelayService {

  @Output() onEventEmit: EventEmitter<any> = new EventEmitter(); 

  constructor() { }

  emit(name: string, payload: any) {
    this.onEventEmit.emit({name, payload});
  }
}
