import {
    trigger,
    animate,
    transition,
    style,
    query
} from '@angular/animations'

export const fadeInAnimation =
    trigger('fadeInAnimation', [
        // route 'enter' transition
        transition('* <=> *', [

            query(':enter', [
                // styles at start of transition
                style({ opacity: 0 }),
    
                // animation and styles at end of transition
                animate('.3s', style({ opacity: 1 }))
            ], { optional: true }),

            query(':leave', [
                // styles at start of transition
                style({ opacity: 1 }),
    
                // animation and styles at end of transition
                animate('.3s', style({ opacity: 0 }))
            ], { optional: true })

        ]),
    ])