import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-workflow-detail',
  templateUrl: './workflow-detail.component.html',
  styleUrls: ['./workflow-detail.component.scss']
})
export class WorkflowDetailComponent {
  rows: any[] = [];

  filteredData: any[] = [
    {
      workflowid:'WF202301',
    worflowName: 'Offline - Tooth Support Cercon Crown & Bridges'
    },
    {
      workflowid:'WF202302',
      worflowName: 'Online - Tooth Support Cercon Crown & Bridges'
    },
    ];

  constructor(private httpClient: HttpClient) {}

  addRow(): void {
    this.rows.push({ step: 'step1', stepName: 'A', departmentName :''});
  }

  removeRow(index: number): void {
    this.rows.splice(index, 1);
  }

  onSubmit(): void {
    
    
    const formData = this.rows.map((row, index) => ({
      step: `step${index + 1}`,
      stepName: row.stepName,
      departmentName :row.departmentName
    }));
  
    // Assuming you have an API endpoint to post the data
    this.httpClient.post('your-api-endpoint', { data: formData })
      .subscribe(response => {
        console.log('Data submitted successfully:', response);
      });
  }
}
