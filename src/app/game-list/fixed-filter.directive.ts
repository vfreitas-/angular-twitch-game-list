import {
    Directive,
    ElementRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core'

@Directive({
    selector: '[fixedFilter]'
})
export class FixedFilterDirective implements OnDestroy {

    private scrollHandler = this.onScroll.bind(this)
    private lastScroll = 0
    private gap = 5
    private startOffset = 250

    constructor(
        private el: ElementRef
    ) {
        window.addEventListener('scroll', this.scrollHandler)
    }

    ngOnDestroy () {
        window.removeEventListener('scroll', this.scrollHandler)
    }

    onScroll () {

        const scrollTop = window.pageYOffset
            , position = Math.abs(
                this.lastScroll - scrollTop
            )

        if (position <= this.gap) {
            return false
        }

        if (
            scrollTop > this.lastScroll &&
            scrollTop > this.startOffset
        ) {
            //Scroll Down
            this.el.nativeElement.classList.add('filters--fixed')
         } else {
            //Scroll up
            if (
                (scrollTop + window.innerHeight) < document.body.offsetHeight
            ) {
                this.el.nativeElement.classList.remove('filters--fixed')
             }
         }

        this.lastScroll = window.pageYOffset
    }
}