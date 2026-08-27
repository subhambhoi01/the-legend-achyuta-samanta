import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spiritual } from './spiritual';

describe('Spiritual', () => {
  let component: Spiritual;
  let fixture: ComponentFixture<Spiritual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spiritual],
    }).compileComponents();

    fixture = TestBed.createComponent(Spiritual);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
