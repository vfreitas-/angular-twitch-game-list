import {
    trigger,
    animate,
    style,
    group,
    transition
} from '@angular/animations'

export const slideAnimation = trigger('slideAnimation', [
    transition(':enter', [
        style({
            transform: 'translateX(-100%)'
        }),
        animate('.5s ease-in-out', style({
            transform: 'translateX(0%)'
        }))
    ]),

    transition(':leave', [
        style({
            transform: 'translateX(0%)'
        }),
        animate('.5s ease-in-out', style({
            transform: 'translateX(100%)'
        }))
    ])


    // transition('* => *', [
    //     query(':enter, :leave', style({
    //         position: 'fixed',
    //         width: '100%'
    //     }), { optional: true }),
    //     group([
            
    //     ])
    // ])
])