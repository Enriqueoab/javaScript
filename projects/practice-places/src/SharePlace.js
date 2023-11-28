class PlaceFinder {

    constructor() { //Will run right away when a instance of "PlaceFinder" is created

        const addressForm = document.querySelector("form");
        const locateUserBtn = document.getElementById("locate-btn");

        locateUserBtn.addEventListener("click", this.locateUserHandler);
        addressForm.addEventListener("submit", this.findAddressHandler);
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert("No location browser support, add your address manually!")
            return;
        }
        navigator.geolocation.getCurrentPosition(
           success => {
                const Geolocation = {
                    latitude: success.coords.latitude,
                    longitude: success.coords.longitude
                }
            console.log(success);
            
           },
           error => {
            alert("Not able to get location, add your address manually!")
        });
    }

    findAddressHandler() {}
}

new PlaceFinder();