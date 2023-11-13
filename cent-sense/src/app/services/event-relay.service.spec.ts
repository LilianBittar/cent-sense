import { TestBed } from '@angular/core/testing';

import { EventRelayService } from './event-relay.service';

describe('EventRelayService', () => {
  let service: EventRelayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventRelayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
