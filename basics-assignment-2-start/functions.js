function helloAlert() {
 
    alert("Hello there!")
}

function personalAlert(name){
    alert(`Hello ${name}!, how are you?`)
    
}

function stringConcatenation(wordA, wordB, wordC){

    alert(`This is a 3 strings concatenation:  ${wordA} ${wordB} ${wordC}`);
}

helloAlert();
personalAlert("Enrique");
stringConcatenation("I'm a ", "Full-Stack ", "developer")