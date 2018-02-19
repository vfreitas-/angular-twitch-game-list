import {
    trigger,
    animate,
    style,
    query,
    transition
} from '@angular/animations'

export const slideAnimation = trigger('slideAnimation', [
    transition('* <=> *', [
        query(':enter, :leave', [
            style({
                position: 'fixed',
                width: '100%',
                transform: 'translateX(-100%)'
            }),
        ], { optional:true }),
  
        query(':leave', [
            animate('.4s ease',
                style({
                    transform: 'translateX(100%)'
                })
            )
        ], { optional:true }),

        query(':enter', [
            animate('.4s ease',
                style({
                    transform: 'translateX(0)'
                })
            )
        ], { optional:true })
    ])
])
