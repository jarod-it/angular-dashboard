import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressifsSubComponent } from './progressifs.component';

describe('ProgressifsComponent', () => {
  let component: ProgressifsSubComponent;
  let fixture: ComponentFixture<ProgressifsSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressifsSubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressifsSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
