import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiwebsiteComponent } from './piwebsite.component';

describe('PiwebsiteComponent', () => {
  let component: PiwebsiteComponent;
  let fixture: ComponentFixture<PiwebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiwebsiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiwebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
