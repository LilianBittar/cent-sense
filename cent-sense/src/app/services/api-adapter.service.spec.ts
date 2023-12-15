import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ApiAdapterService } from './api-adapter.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('ApiAdapterService', () => {
  let service: ApiAdapterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      providers: [ApiAdapterService],
    });
    service = TestBed.inject(ApiAdapterService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get ingredients', () => {
    const dummyIngredients = ['bacon', 'milk'];

    service.getIngredients().subscribe((ingredients) => {
      expect(ingredients).toEqual(dummyIngredients);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/ingredients`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyIngredients);
  });
  it('should make a GET request to the correct URL', () => {
    service.getUserPreferences().subscribe();
  
    const req = httpMock.expectOne('http://localhost:8000/api/user-preferences');
    expect(req.request.method).toBe('GET');
    req.flush({});
  
}
);
});
