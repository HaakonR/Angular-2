import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import {ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { FORBRUKSLAAN }   from './FORBRUKSLAAN';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, JsonpModule, FormsModule],
    declarations: [FORBRUKSLAAN],
    bootstrap: [FORBRUKSLAAN]
})
export class AppModule { }
