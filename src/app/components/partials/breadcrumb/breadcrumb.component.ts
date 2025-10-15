import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  constructor(
    private router: Router
  ) {}

  getRoute(): Array<Array<String>> {
    let routes = this.router.url.split('/').slice(1);
    let paths: Array<String> = Array();
    let routesAndPaths = Array();

    for (let i = 0; i < routes.length; i++) {
      paths[i] = routes.slice(0, i + 1).join('/');
    }

    routesAndPaths.push(routes, paths);

    return routesAndPaths;
  }
}
