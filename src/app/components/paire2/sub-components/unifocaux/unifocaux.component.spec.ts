import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifocauxSubComponent } from './unifocaux.component';

describe('UnifocauxComponent', () => {
  let component: UnifocauxSubComponent;
  let fixture: ComponentFixture<UnifocauxSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifocauxSubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnifocauxSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
