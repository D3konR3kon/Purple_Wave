import { Component, OnInit, ViewChild, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../shared/main.service';
import { Business } from '../../shared/business.inteface';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-viewone',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,GoogleMapsModule, MapMarker],
  templateUrl: './viewone.component.html',
  styleUrl: './viewone.component.css'
})
export class ViewoneComponent implements OnInit {
  
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;


  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options!:google.maps.MapOptions
  marker!:any
  infoContent = '';
  markerPosition!: google.maps.LatLngLiteral

  constructor(private aRouter: ActivatedRoute, private mainService: MainService){}
  
  item!: Business

  ngOnInit(){
    this.getItem()
      
      

    this.options = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
  };
  }

  zoomIn() {
    this.options?.maxZoom
    if (this.zoom < 15){
      this.zoom++;
    } 
  }
 
  zoomOut() {
    if (this.zoom > 8) this.zoom--;
  }
 
  click(event: google.maps.MapMouseEvent) {
    console.log(event);
  }
 
  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }
 
  addMarker() {
    this.marker = {
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.marker.length + 1),
      },
      title: this.item.name + (this.marker.length + 1),
      info: 'Marker info ' + (this.marker.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    };
  }
 
  openInfo(marker: MapMarker, content:any) {
    this.infoContent = content;
    this.info.open(marker);
  }

  getItem(){
    const name = this.aRouter.snapshot.params['name']
    this.mainService.getOne(name).subscribe({
      next: (data)=>{
        console.log(data)
        this.item = data
        this.getCoords(this.item.address)
      },
      error: (err)=>{
        console.error(err)
      }
    })
  }

  getCoords(address: string):void {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results: any, status) => {
      if (status === 'OK') {
        this.center = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        this.markerPosition = this.center
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}

