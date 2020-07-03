import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './components/layout/layout.component';

/***
 * Core module with basic presentational components and providers.
 */
@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LayoutComponent
  ],
})
export class CoreModule { }
