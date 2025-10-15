import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paire2Component } from './paire2.component';

describe('Paire2Component', () => {
  let component: Paire2Component;
  let fixture: ComponentFixture<Paire2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paire2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Paire2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
