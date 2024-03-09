import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkflowstepsComponent } from './edit-workflowsteps.component';

describe('EditWorkflowstepsComponent', () => {
  let component: EditWorkflowstepsComponent;
  let fixture: ComponentFixture<EditWorkflowstepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWorkflowstepsComponent]
    });
    fixture = TestBed.createComponent(EditWorkflowstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
