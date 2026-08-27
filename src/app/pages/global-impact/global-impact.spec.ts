import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalImpact } from './global-impact';

describe('GlobalImpact', () => {
  let component: GlobalImpact;
  let fixture: ComponentFixture<GlobalImpact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalImpact],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalImpact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
