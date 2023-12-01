import { Map } from './UI/Map';

class LocationFound {

    constructor(coordinates, address) {
        new Map(coordinates);
        const headerTitleEl = document.querySelector('header h1');// Get the first h1 element in the first header element
        headerTitleEl.textContent = address;
      }
}
// Parsing-geting data from the current browser loaded URL
const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
    // parseFloat = + both change String we are getting to number
  lat: parseFloat(queryParams.get('lat')),
  lng: +queryParams.get('lng')
};
const address = queryParams.get('address'); // Key got from the URL
new LoadedPlace(coords, address);