import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoTypeFormComponent } from './memo-type-form.component';

describe('MemoTypeFormComponent', () => {
  let component: MemoTypeFormComponent;
  let fixture: ComponentFixture<MemoTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
