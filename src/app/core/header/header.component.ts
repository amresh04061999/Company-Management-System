import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public status: string
  public id: any
  constructor(private router: ActivatedRoute) {
    this.status = 'Add company'
  }

  ngOnInit(): void {

  }

}
