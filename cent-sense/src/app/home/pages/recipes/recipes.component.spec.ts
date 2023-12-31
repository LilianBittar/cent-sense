import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { RecipesComponent } from './recipes.component';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesComponent ],
      imports: [IonicModule.forRoot(), StoreModule.forRoot({})]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
