import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './dependencies/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    
  ],
  imports: [
    AppRoutingModule, RouterModule.forRoot(appRoutes),
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    /*{ provide: LocationStrategy, useClass: HashLocationStrategy }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
