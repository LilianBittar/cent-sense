import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { ViewPlanComponent } from './view-plan.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ViewPlanComponent', () => {
  let component: ViewPlanComponent;
  let fixture: ComponentFixture<ViewPlanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlanComponent ],
      imports: [IonicModule.forRoot(), StoreModule.forRoot({})],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 1 },
            },
          },
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
