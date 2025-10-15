import { Component, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { Location, NgIf, CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { BreadcrumbComponent } from './components/partials/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, ReactiveFormsModule, RouterLink, BreadcrumbComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  size: number = 2;

  constructor(
    private router: Router,
    private storage: StorageService,
    public authService: AuthService,
    private location: Location,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.highlightNav();
  }

  logout() {
    this.storage.clearData();
    this.router.navigate(['/admin']);
  }

  editElementSize(sign: string) {
    let body: HTMLElement | null = document.querySelector('body');
    let checkboxes: NodeListOf<Element> = document.querySelectorAll('.checkbox');
    let arrows: NodeListOf<Element> = document.querySelectorAll('.arrow');

    if(
      ((this.size < 4 && sign === "+") && (this.size >= 2 && sign === "+")) ||
      ((this.size <= 4 && sign === "-") && (this.size > 2 && sign === "-"))
    ) 
    {
      if(sign === "+") this.size++;
      else if(sign === "-") this.size--;

      if(this.size === 2) {
        body?.setAttribute('class', `text-xl`);
      } else {
        body?.setAttribute('class', `text-${this.size}xl`);
      }

      this.renderElementSize(checkboxes, 7);
      this.renderElementSize(arrows, 15);
    }
  }

  renderElementSize(array: NodeListOf<Element>, step: number) {
    for (let i = 0; i < array.length; i++) {
      this.renderer.setStyle(array[i], 'width', `${this.size*step}px`);
      this.renderer.setStyle(array[i], 'height', `${this.size*step}px`);
    }
  }

  previousPage() {
    this.location.back();
  }

  highlightNav() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let menuTiles: NodeListOf<Element> = this.elementRef.nativeElement.querySelectorAll('.nav-element');
      let uri: string = this.router.url.split('/')[1];

      for (let i = 0; i < menuTiles.length; i++) {
        if(uri === menuTiles[i].getAttribute('data-path')?.split('/')[1]) {
          this.renderer.setStyle(menuTiles[i], 'border', '4px solid #5584BF');
        } else {
          this.renderer.setStyle(menuTiles[i], 'border', '1px solid white');
        }
      }
    });
  }

  isAdmin(): Boolean {
    if(this.router.url.split('/')[1] === 'admin') return true;

    return false;
  }
}
