import { Component, ViewChild } from '@angular/core';
import {GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker} from '@angular/google-maps'

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, MapMarker],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
 
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options!:google.maps.MapOptions
  markers:any = [];
  infoContent = '';
 constructor(){
  
 }
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
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
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }
 
  openInfo(marker: MapMarker, content:any) {
    this.infoContent = content;
    this.info.open(marker);
  }
}

