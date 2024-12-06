import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MapComponent } from "../map/map.component";
import { MainService } from '../../shared/main.service';
import { Business } from '../../shared/business.inteface';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator'

@Component({
    selector: 'app-categories',
    standalone: true,
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css',
    imports: [NavbarComponent, FooterComponent, MapComponent, MatPaginatorModule, RouterLink]
})
export class CategoriesComponent {
    totalItems!: number
    pageSize = 6;
    currentPage = 0;
    itemsall: Business[]= []
    items:any;
    filtered: string[] = []
    fil:any;

    color = ["yellow", "green"]
  
    businesses:Business[]=[]

    constructor(private mainServer: MainService, ){
        this.getAll_B()
        this.fil= Array.from(new Set(this.filtered))
        console.log(this.fil)
        
    }
    
    getAll_B(){
        this.mainServer.getAllBusinesses().subscribe({
            next: data=>{
                this.businesses = data
                console.log(this.businesses.keys)
                this.calculatePagenation(-1, 0)
                this.businesses.forEach(o=> this.filtered.push(o.category))
                this.totalItems = this.businesses.length
            },
            error: err=>{
                console.error("Err", err)
            }
        })
    }

    pageChanged(event: PageEvent) {
        console.log(event)
        this.calculatePagenation(event.previousPageIndex, event.pageIndex)
        }

    calculatePagenation(previousPage: any, currentPage: any){
        const start    = (this.pageSize * currentPage);
        const end   = this.pageSize + (this.pageSize * currentPage);;
        
        
        console.log("PP",previousPage, "CP",currentPage)
        console.log("SS",start, "EN", end)
        
        this.itemsall = this.businesses.slice(start, end)
    }

    selectCategory(selected: string) {
        const filtered = this.businesses.filter(o => o.category === selected )
        this.itemsall = filtered
        this.totalItems = filtered.length
        // this.calculatePagenation(-1,0)
        console.log(filtered)
      }
    
    

      


}
