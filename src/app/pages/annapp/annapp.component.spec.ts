import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnappComponent } from './annapp.component';

describe('AnnappComponent', () => {
  let component: AnnappComponent;
  let fixture: ComponentFixture<AnnappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
