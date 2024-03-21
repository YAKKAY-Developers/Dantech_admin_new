import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-completed-order',
  templateUrl: './completed-order.component.html',
  styleUrls: ['./completed-order.component.scss']
})
export class CompletedOrderComponent {
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

  // sortColumn(column: string) {
  //   // Check if the column is already sorted
  //   if (this.sortcolumn === column) {
  //     // If the same column is clicked again, toggle the sorting order
  //     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  //   } else {
  //     // If a different column is clicked, set the sorting column and direction
  //     this.sortcolumn = column;
  //     this.sortDirection = 'asc'; // Default to ascending order
  //   }

  //   // Sort the filtered data based on the chosen column and direction
  //   this.filteredData.sort((a, b) => {
  //     const valueA = a[column];
  //     const valueB = b[column];

  //     if (this.sortDirection === 'asc') {
  //       return valueA.localeCompare(valueB);
  //     } else {
  //       return valueB.localeCompare(valueA);
  //     }
  //   });
  // }

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
      let valueA = a['orderDate'];
      let valueB = b['orderDate'];

      // Convert to string for comparison
      valueA = valueA.toString();
      valueB = valueB.toString();

      if (this.sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
}


  exportToCSV() {
    // Create a CSV string
    const headers = ['Order ID', 'Status', 'Consultant', 'Order date', 'Service', 'Step'];
    const csvData = this.filteredData.map((item) => {
      return [
        item.orderToken,
        item.orderStatusId,
        item.consultantName,
        item.orderDate,
        item.service,
        item.requiredDate

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
          console.log(this.order_details.getallOrders.length);
          if (this.order_details.getallOrders.length > 0) {
            this.orders_length = true;
          }
          this.order_data = this.order_details.getallOrders;
            // Sort the orderData array based on orderDate with March first, then February
  this.order_data.sort((a :any, b :any) => {
    const dateA = new Date(a.orderDate);
    const dateB = new Date(b.orderDate);

    // Check if the months are different
    if (dateA.getMonth() !== dateB.getMonth()) {
      return dateB.getMonth() - dateA.getMonth(); // Sort by month in descending order
    } else {
      // If the months are the same, sort by year in descending order
      return dateB.getFullYear() - dateA.getFullYear();
    }
  });
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
          item.consultantName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.orderToken.includes(this.searchText) ||
          item.orderDate.includes(this.searchText) ||
          item.service.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.requiredDate.includes(this.searchText) 
        );
      });
    } else {
      this.filteredData = this.order_data; // If searchText is empty, show all data
    }
  }
}
