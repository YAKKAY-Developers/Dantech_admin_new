import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStepComponent } from './workflow-step.component';

describe('WorkflowStepComponent', () => {
  let component: WorkflowStepComponent;
  let fixture: ComponentFixture<WorkflowStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkflowStepComponent]
    });
    fixture = TestBed.createComponent(WorkflowStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
