import { Modal } from "./UI/Modal" //webpack will add .js as in "Modal.js"
import { Map } from "./Map"

class PlaceFinder {

    constructor() { //Will run right away when a instance of "PlaceFinder" is created

        const addressForm = document.querySelector("form");
        const locateUserBtn = document.getElementById("locate-btn");

        locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
        addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    }

    showMapLocation(coordinates) {
        if (this.map) { // To reuse a map alreadu created
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert("No location browser support, add your address manually!")
            return;
        }
        const modal = new Modal("loading-modal-content", "Loading...");
        modal.show();
        navigator.geolocation.getCurrentPosition(
           success => {
                modal.hide();
                const geolocation = {
                    latitude: success.coords.latitude+50,
                    longitude: success.coords.longitude+50
                };
                console.log(geolocation)
                this.showMapLocation(geolocation);
           },
           error => {
            modal.hide();
            alert("Not able to get location, add your address manually!")
        });
    }

    findAddressHandler(event) {
        event.preventDefault(); // To prevent the default send of the form
        const address = event.target.querySelector("input").value;
        if (!address || address.trim().length === 0) {
            alert("Please entered a valid address!");
        }

        const modal = new Modal("loading-modal-content", "Loading..."); 
        modal.show();
    }



}

new PlaceFinder();