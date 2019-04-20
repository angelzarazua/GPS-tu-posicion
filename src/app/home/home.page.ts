import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { Network } from '@ionic-native/network/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map : GoogleMap;
  latitude : number;
  longitude : number;

constructor(
  private geolocation : Geolocation,
  private network: Network,
  private toast: Toast
){

  let connectSubscription = this.network.onConnect().subscribe(() => {
    console.log('network connected!');
    setTimeout(() => {
      if (this.network.type === 'wifi') {
        console.log('Internet, AAAAAAAAAAHHHHHH');
        this.toast.show(`Nos conectamos a los interwebs!`, '5000', 'top').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
      if (this.network.type === 'none') {
        console.log('Ay Dios mío, no tienes internet!')
        this.toast.show(`Ay Jesusito no tienes internet!`, '5000', 'top').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, 3000);
  });

  this.getPosition();
}



getPosition(){
  this.geolocation.getCurrentPosition().then( response =>{
    console.log(response)
    this.latitude = response.coords.latitude;
    this.longitude = response.coords.longitude;
    this.getMap();
  }).catch(error =>{
    console.log(error)
  })
}

getMap(){
  let mapOptions: GoogleMapOptions = {
    camera: {
      target: {
        lat: this.latitude,
        lng: this.longitude
      },
      zoom: 18,
      tilt: 30
    }
  };
  this.map = GoogleMaps.create('mapa', mapOptions);
  let marker: Marker = this.map.addMarkerSync({
    title: 'Hola =D',
    icon: 'blue',
    animation: 'DROP',
    position: {
        lat: this.latitude,
        lng: this.longitude
    }
  });
  marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    alert('¡CLICK!');
  });
}

}
