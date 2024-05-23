
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';


mapboxgl.accessToken = "pk.eyJ1IjoibXV6aGRhIiwiYSI6ImNsd2duaGw4bTA2d3cyc29jbWUzbG0wNHYifQ.CX6mF97KWdgznkRN1fucNQ";


const MapView = () => {
    const map = useRef(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        if (map.current) return; // Initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-122.4376, 37.7577],
          zoom: 9
        });
    
        // Get current location using Geolocation API
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          map.current.setCenter([longitude, latitude]);
          map.current.setZoom(15);
    
          const nav = new mapboxgl.NavigationControl();
          map.current.addControl(nav);
    
          const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken
          });
          map.current.addControl(directions, 'top-left');
    
        //   Add marker at current location
          new mapboxgl.Marker({ draggable: true })
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }, error => {
          console.log("error getting current location", error);
        });
    }, []);

  return (
    <div ref={mapContainer} className="h-lvh w-auto" />
  )
}

export default MapView