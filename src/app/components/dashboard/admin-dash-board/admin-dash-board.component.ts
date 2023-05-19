import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
})
export class AdminDashBoardComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  allStats: any;
  keys: string[] = [];
  ngOnInit(): void {
    this.adminService.getStatusCount().subscribe((res) => {
      this.allStats = res;
      console.log(this.allStats);
    });
  }
}
