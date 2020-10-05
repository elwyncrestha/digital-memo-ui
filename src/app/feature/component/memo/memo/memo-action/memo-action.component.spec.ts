import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoActionComponent } from './memo-action.component';

describe('MemoActionComponent', () => {
  let component: MemoActionComponent;
  let fixture: ComponentFixture<MemoActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
