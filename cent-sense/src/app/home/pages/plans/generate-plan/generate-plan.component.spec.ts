import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { GeneratePlanComponent } from './generate-plan.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GeneratePlanComponent', () => {
  let component: GeneratePlanComponent;
  let fixture: ComponentFixture<GeneratePlanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePlanComponent ],
      imports: [IonicModule.forRoot(), StoreModule.forRoot({}), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
