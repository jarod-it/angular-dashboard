import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressifsComponent } from './progressifs.component';

describe('ProgressifsComponent', () => {
  let component: ProgressifsComponent;
  let fixture: ComponentFixture<ProgressifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressifsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
