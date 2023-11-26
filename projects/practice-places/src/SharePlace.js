class PlaceFinder {

    constructor() { //Will run right away when a instance of "PlaceFinder" is created

        const addressForm = document.querySelector("form");
        const locateUserBtn = document.getElementById("locate-btn");

        addressForm.addEventListener("click", this.locateUserHandler);
        locateUserBtn.addEventListener("submit", this.findAddressHandler);
    }

    locateUserHandler() {}

    findAddressHandler() {}
}