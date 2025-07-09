import { Directive, ElementRef, inject, OnDestroy, OnInit, output } from "@angular/core"

@Directive({
  selector: "[appInfiniteScroll]",
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  private element = inject(ElementRef);

  scrolled = output<void>();

  private observer!: IntersectionObserver;

  ngOnInit() {
    // TODO change rootMargin
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.scrolled.emit();
        }
      })
    }, options);

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
