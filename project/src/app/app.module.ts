import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfigModule, DialogModule, FieldsModule, TableModule } from './components';
import { getSpanishPaginatorIntl } from './services/translate-paginator.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GcmModalModule } from './components/modal';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    GcmModalModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    FieldsModule,
    FormsModule,
    MatDividerModule,
    BrowserAnimationsModule,
    DialogModule,
    TableModule,
    ConfigModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
  bootstrap: [AppComponent],
})
export class AppModule {}
