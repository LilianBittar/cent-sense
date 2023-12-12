import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ApiAdapterService } from './api-adapter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiAdapterService', () => {
  let service: ApiAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
    });
    service = TestBed.inject(ApiAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
