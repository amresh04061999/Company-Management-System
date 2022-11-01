import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public id: any;
  public breadcrumbs: any;
  public data: any;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        this.breadcrumbs = [];
        let routeData = route.snapshot.data;
        let label1 = routeData['company'];
        if (routeData) {
          this.data = routeData['breadcrumb'];
        }
        this.data = label1.companyname;
        console.log(this.data);
      });
  }

}
