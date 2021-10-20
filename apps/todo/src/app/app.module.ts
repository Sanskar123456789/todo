import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ColorPickerModule} from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NewtodoComponent } from './components/newtodo/newtodo.component';
import { AuthguardService } from './services/authguard.service';
import { TodolistComponent } from './components/todolist/todolist.component';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path : 'new',
    component: NewUserComponent
  },
  {
    path :'home',
    // canActivate:[AuthguardService],
    component: HomePageComponent
  },
  {
    path : 'newtodo',
    // canActivate:[AuthguardService],
    component: NewtodoComponent,
    outlet: 'left'
  },
  {
    path:'gettodo',
    component: TodolistComponent,
    // canActivate:[AuthguardService],
    outlet:'left'
  },
  {
    path: 'update/:id',
    component: NewtodoComponent,
    // canActivate:[AuthguardService],    
  }
]


@NgModule({
  declarations: [AppComponent, LoginComponent, NewUserComponent, HomePageComponent, NewtodoComponent, TodolistComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes),ToastModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    PanelModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputTextareaModule,
    ColorPickerModule,
    ReactiveFormsModule,
    FormsModule,HttpClientModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
