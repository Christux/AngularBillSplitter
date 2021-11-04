import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsClippyModule } from 'js-clippy';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    JsClippyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
