import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orderdatasubscribtion: Subscription;
  order_details: any;
  order_data: any;
  orders_length = false;
  searchText: string = '';
  filteredData: any[] = [];
  public WOId: any;
  sortcolumn: string = '';
  sortDirection: string = 'asc';

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private adminservice: AdminService
  ) {}

  sortColumn(column: string) {
    // Check if the column is already sorted
    if (this.sortcolumn === column) {
      // If the same column is clicked again, toggle the sorting order
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column is clicked, set the sorting column and direction
      this.sortcolumn = column;
      this.sortDirection = 'asc'; // Default to ascending order
    }

    // Sort the filtered data based on the chosen column and direction
    this.filteredData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (this.sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }

  exportToCSV() {
    // Create a CSV string
    const headers = ['Order ID', 'Status', 'Doctor', 'Order date', 'Service'];
    const csvData = this.filteredData.map((item) => {
      return [
        item.workOrder,
        item.woStatus,
        item.doctor,
        item.date,
        item.product,
      ];
    });

    // Add the headers to the CSV string
    const csv = [
      headers.join(','),
      ...csvData.map((row) => row.join(',')),
    ].join('\n');

    // Create a Blob object and create a download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
  }

  ngOnInit(): void {
    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');

    this.orderdatasubscribtion = this.adminservice
      .getallorders(adminToken)
      .subscribe(
        (res: any) => {
          this.order_details = res;
          console.log(this.order_details.order);
          if (this.order_details.order['length'] > 0) {
            this.orders_length = true;
          }
          this.order_data = this.order_details.order;
          this.filteredData = this.order_data;
          console.log(this.order_data);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  start(event: Event) {
    const workOrderNumber = (event.target as HTMLButtonElement).value; // Typecast event.target to HTMLButtonElement
    console.log(workOrderNumber);
    // sessionStorage.setItem('workOrderNumber', JSON.stringify(workOrderNumber));
    this.router.navigate(['/pages/orderdetail/', workOrderNumber]);
  }

  filterData() {
    if (this.searchText) {
      console.log('Hi');
      this.filteredData = this.order_data.filter((item) => {
        console.log('My data', this.filteredData);
        // Customize the filtering logic as needed
        return (
          item.doctor.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.workOrder.includes(this.searchText) ||
          item.date.includes(this.searchText) ||
          item.product.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.status.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.woStatus.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
    } else {
      this.filteredData = this.order_data; // If searchText is empty, show all data
    }
  }
}
