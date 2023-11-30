export class Modal {

    constructor(contentId, fallbackText) {
        this.fallbackText = fallbackText;
        this.contentTemplate = document.getElementById(contentId);
        this.modalTemplate = document.getElementById("modal-template");
    }   
    
    show() {
            // In browsers that not support "template" elements the action 
            // createElement("template") will fails so the if statement will
            // be false
        if ("content" in document.createElement("template")) {

            // this is how you use the content of a template and
            // create a node based on it
            const modalElements = document.importNode(
                this.modalTemplate.content,
                true
            );
            this.modalElement = modalElements.querySelector(".modal");
            this.backdropElement = modalElements.querySelector(".backdrop");

            const contentElement = document.importNode(
                this.contentTemplate.content,
                true
            );

            this.modalElement.appendChild(contentElement);
            // Inserting them into the DOM
            document.body.insertAdjacentElement("afterbegin", this.modalElement);
            document.body.insertAdjacentElement("afterbegin", this.backdropElement);
        } else {
            alert(this.fallbackText);
         }
    }

    hide() {
        document.body.removeChild(this.modalElement); //Modern browsers this.modalElement.remove()
        document.body.removeChild(this.backdropElement);

        this.modalElement = null; //To avoid memory leaks (Garbage collector)
        this.backdropElement = null;
    }
}