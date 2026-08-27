import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiritualJourney } from './spiritual-journey';

describe('SpiritualJourney', () => {
  let component: SpiritualJourney;
  let fixture: ComponentFixture<SpiritualJourney>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpiritualJourney],
    }).compileComponents();

    fixture = TestBed.createComponent(SpiritualJourney);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
