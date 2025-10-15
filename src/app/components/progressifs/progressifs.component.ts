import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-progressifs',
  standalone: true,
  imports: [],
  templateUrl: './progressifs.component.html',
  styleUrl: './progressifs.component.scss'
})
export class ProgressifsComponent {
  totalPrice: number = 0;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    let checkboxes: NodeListOf<Element> = this.elementRef.nativeElement.querySelectorAll('.checkbox');
    let priceContainer: HTMLSpanElement = this.elementRef.nativeElement.querySelector('#price-container-progressifs')

    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('click', (e: Event) => {
        let checkbox = e.target as HTMLInputElement;

        if(checkbox instanceof HTMLInputElement && checkbox.checked) {
          this.totalPrice += parseFloat(checkbox.getAttribute('data-price') ?? '0');
        } else {
          this.totalPrice -= parseFloat(checkbox.getAttribute('data-price') ?? '0');
        }

        priceContainer.innerHTML = this.totalPrice.toString();
      });
    }
  }
}
