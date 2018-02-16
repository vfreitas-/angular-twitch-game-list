import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import './polyfills'
import './assets/sass/main.scss'
import { AppModule } from './app/app.module'

// console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'production') {
//     enableProdMode()
// }

const bootstrapPromise = platformBrowserDynamic().bootstrapModule(AppModule)

bootstrapPromise
    .then(success => console.log(`Bootstrap success`))
    .catch(err => console.error(err))