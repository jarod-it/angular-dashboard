import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifocauxComponent } from './unifocaux.component';

describe('UnifocauxComponent', () => {
  let component: UnifocauxComponent;
  let fixture: ComponentFixture<UnifocauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifocauxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnifocauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
