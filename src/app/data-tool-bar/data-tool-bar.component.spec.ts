import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataToolBarComponent } from './data-tool-bar.component';

describe('DataToolBarComponent', () => {
  let component: DataToolBarComponent;
  let fixture: ComponentFixture<DataToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataToolBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
