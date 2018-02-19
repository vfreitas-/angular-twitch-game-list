import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule
    ]
})
export class SharedModule {}