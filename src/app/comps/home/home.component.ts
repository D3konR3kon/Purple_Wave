import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterLink, FooterComponent, NavbarComponent]
})
export class HomeComponent implements OnInit {
  
 categories$  = [
    {class: "Category 1"}, {class: "Category 2"},{class: "Category 3"},
    {class: "Category 4"}, {class: "Category 5"},{class: "Category 6"},
    {class: "Category 7"},{class: "Category 8"}
 ]
  articles= [{class: "Category 1"}, {class: "Category 2"},{class: "Category 3"},
    {class: "Category 4"}, {class: "Category 5"},{class: "Category 6"},
    {class: "Category 7"},{class: "Category 8"}, {class: "Category 9"}, {class: "Category 10"} 
      ]
  sliceIndex=0
  articlesToShow : any = [];
  showMoreEnabled = true;

  ngOnInit(): void {
    // this.articlesToShow = this.articles.slice(0,6)
    this.loadMore()
  }
 

  
loadMore() {
  const nextSlice = this.articles.slice(this.sliceIndex, this.sliceIndex + 6);

  this.articlesToShow = [...this.articlesToShow, ...nextSlice]
  // this.articlesToShow = this.articlesToShow.concat(...nextSlice); 
  this.sliceIndex += 6;
  this.showMoreEnabled = this.sliceIndex < this.articles.length; 
}
}
