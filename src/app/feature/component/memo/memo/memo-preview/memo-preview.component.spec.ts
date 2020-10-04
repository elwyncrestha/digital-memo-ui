import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoPreviewComponent } from './memo-preview.component';

describe('MemoPreviewComponent', () => {
  let component: MemoPreviewComponent;
  let fixture: ComponentFixture<MemoPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
