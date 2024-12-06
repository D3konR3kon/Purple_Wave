import { Routes } from '@angular/router';
import { CategoriesComponent } from './comps/categories/categories.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './comps/home/home.component';
import { ViewoneComponent } from './comps/viewone/viewone.component';
import { AboutComponent } from './comps/about/about.component';



export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch: "full"},
    {path: 'categories', component:  CategoriesComponent},
    {path: 'home', component:  HomeComponent },
    {path: 'app', component:  AppComponent },
    {path:'service/:name', component: ViewoneComponent},
    {path:'about', component: AboutComponent},
    
    
    
];
