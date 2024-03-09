import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaddataComponent } from './loaddata.component';

describe('LoaddataComponent', () => {
  let component: LoaddataComponent;
  let fixture: ComponentFixture<LoaddataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaddataComponent]
    });
    fixture = TestBed.createComponent(LoaddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
