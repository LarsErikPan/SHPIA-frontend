import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentTreeComponent } from './environment-tree.component';

describe('EnvironmentTreeComponent', () => {
  let component: EnvironmentTreeComponent;
  let fixture: ComponentFixture<EnvironmentTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
