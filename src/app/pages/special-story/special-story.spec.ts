import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialStory } from './special-story';

describe('SpecialStory', () => {
  let component: SpecialStory;
  let fixture: ComponentFixture<SpecialStory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialStory],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialStory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
