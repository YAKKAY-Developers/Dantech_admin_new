import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedusersComponent } from './approvedusers.component';

describe('ApprovedusersComponent', () => {
  let component: ApprovedusersComponent;
  let fixture: ComponentFixture<ApprovedusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedusersComponent]
    });
    fixture = TestBed.createComponent(ApprovedusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
