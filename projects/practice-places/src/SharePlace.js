import { Modal } from "./UI/Modal" //webpack will add .js as in "Modal.js"
import { Map } from "./Map"
import { getCoordinatesFromAddress, getAddressFromCoords } from "./Utility/Location"

class PlaceFinder {

    constructor() { //Will run right away when a instance of "PlaceFinder" is created

        const addressForm = document.querySelector("form");
        this.shareBtn = document.getElementById("share-btn");
        const locateUserBtn = document.getElementById("locate-btn");
        const sharedLinkInputElement = document.getElementById('share-link');

        this.shareBtn.addEventListener("click", this.sharePlaceHandler);
        locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
        addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    }

    sharePlaceHandler(){
        if (!navigator.clipboard) {
            sharedLinkInputElement.select(); // if clipboard is not supported by the browser at least we will select the textin the box
            return;
        }
        // Writing link in the user clipboard
        navigator.clipboard.writeText(sharedLinkInputElement)
            .then( () => {
                alert("Link copied in your clipboard!");
            }
            ).catch( error => {
                console.log(error);
                sharedLinkInputElement.select();
            });
    }

    showMapLocation(coordinates, address) {
        if (this.map) { // To reuse a map already created
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }
        //Creating a shareable link
        this.shareBtn.disabled = false;
        sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
        
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert("No location browser support, add your address manually!")
            return;
        }
        const modal = new Modal("loading-modal-content", "Loading...");
        modal.show();
        navigator.geolocation.getCurrentPosition(
           async success => {
               const geolocation = {
                   latitude: success.coords.latitude+50,
                   longitude: success.coords.longitude+50
                };
                const address = await getAddressFromCoords(geolocation);
                modal.hide();
                this.showMapLocation(geolocation, address);
           },
           error => {
            modal.hide();
            alert("Not able to get location, add your address manually!")
        });
    }

    async findAddressHandler(event) {
        event.preventDefault(); // To prevent the default send of the form
        const address = event.target.querySelector("input").value;
        if (!address || address.trim().length === 0) {
            alert("Please entered a valid address!");
        }

        const modal = new Modal("loading-modal-content", "Loading..."); 
        modal.show();
        //To get possible errors
        try {
            const coordiates = await getCoordinatesFromAddress(address); // We could use .then/catch instead of async and await too
            
        } catch (error) {
            alert(error.message);
        }
    }



}

new PlaceFinder();