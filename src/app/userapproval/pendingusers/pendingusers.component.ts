import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { userapprovaldata, approvallist } from '../userapproval-data';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

function joinDictionaries(clinics, statuses) {
  // Create a map to store clinics based on clinic ID
  const clinicMap = new Map(clinics.map((clinic) => [clinic.clinicid, clinic]));

  // Iterate through statuses and add clinic details where clinic IDs match
  const joinedData = statuses.map((status) => {
    const clinicDetails = clinicMap.get(status.clinicid);
    return { ...status, clinicDetails };
  });

  return joinedData;
}

function check_table_status(object: any) {
  for (let obj in object) {
    // console.log("object",object[0]["statuscode"])
    if (object[obj]) {
      if (object[obj]['statusdesc']['0']['statuscode'] === 'WA4000') {
        return true;
      }
    }
  }

  return false;
}
@Component({
  selector: 'app-pendingusers',
  templateUrl: './pendingusers.component.html',
  styleUrls: ['./pendingusers.component.scss'],
})
export class PendingusersComponent {
  userapprovaldetails: userapprovaldata[];
  searchText: string = '';
  filteredData: any[] = [];
  sortcolumn: string = '';
  sortDirection: string = 'asc';
  // user details
  user_data: any;
  user_datas: any;
  user_details: any;
  user_status: any;
  userdatasubscribtion: Subscription;
  table_state = false;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private adminservice: AdminService
  ) {}

  //sortcolumn
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

  //filterdata
  filterData() {
    if (this.searchText) {
      console.log('Hi');
      this.filteredData = this.user_data.filter((item: any) => {
        console.log('My data', this.filteredData);
        // Customize the filtering logic as needed
        return (
          item.address.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.email.includes(this.searchText) ||
          item.clinicid.includes(this.searchText) ||
          item.clinicName
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          item.phonenumber.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
    } else {
      this.filteredData = this.user_data; // If searchText is empty, show all data
    }
  }

  // //startevent
  // start(event: Event) {
  //   const workOrderNumber = (event.target as HTMLButtonElement).value; // Typecast event.target to HTMLButtonElement
  //   console.log(workOrderNumber);
  //   // sessionStorage.setItem('workOrderNumber', JSON.stringify(workOrderNumber));
  //   this.router.navigate(['/pages/orderdetail/', workOrderNumber]);
  // }

  //init
  ngOnInit(): void {
    const { adminToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    // console.log(adminToken)

    this.userdatasubscribtion = this.adminservice
      .getallusers(adminToken)
      .subscribe(
        (res: any) => {
          this.user_details = res;
          console.log('USer details', this.user_details.user);
          // this.user_datas = this.user_details['user'];
          // this.user_status = this.user_details['state'];
          // this.user_data = joinDictionaries(this.user_datas, this.user_status);
          this.user_data = this.user_details.user;
          this.filteredData = this.user_data;
          this.table_state = check_table_status(this.user_data);
          // console.log(this.user_datas, this.user_status);
          console.log(this.user_data, this.table_state);
          // console.log(this.filteredData)
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
