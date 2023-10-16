# javaScript
This repository has all the projects and explanations of the "JavaScript - The Complete Guide 2023 (Beginner + Advanced)" course

## Logical Operators - A Quick Summary
As a reference which you can come back to (or print out), here's a quick summary of how logical operators and comparison operators behave in JavaScript:

```js
const userName = 'Max';
const altName = '';
console.log(userName === 'Max'); // generates and prints a boolean => true
console.log(userName); // wasn't touched, still is a string => 'Max'
 
console.log(userName || null); // userName is truthy and therefore returned by || => 'Max'
console.log(altName || 'Max'); // altName is falsy (empty string), hence 'Max' is returned => 'Max'
console.log(altName || ''); // both altName and '' are falsy but if the first operand is falsy, the second one is always returned => ''
console.log(altName || null || 'Anna'); // altName and null are falsy, 'Anna' is returned => 'Anna'
 
console.log(userName && 'Anna'); // userName is truthy, hence second (!) value is returned => 'Anna'
console.log(altName && 'Anna'); // altName is falsy, hence first value is returned => ''
console.log(userName && ''); // userName is truthy, hence second value is returned => ''
```
**Always keep in mind:** NO operator (neither ```===```, > etc. nor ```&&``` or ```||```) changes the variable you might be using in the comparison. In the above examples, the values stored in ```userName``` and ```altName``` are NEVER changed.

```===```, ```>``` etc. just **generate new boolean values** which are used in the comparison. ```||``` and ```&&``` **generate NO booleans**, they just treat the **values before and after them as conditions** (which therefore need to yield boolean values and are coerced to booleans if required).

Because of the above-described behaviors, you often use ```||``` in JavaScript to assign default/ fallback values to variables/ constants:
```js
const enteredValue = ''; // let's assume this is set based on some input provided by the user, therefore it might be an empty string
 
const userName = enteredValue || 'PLACEHOLDER'; // will assign 'PLACEHOLDER' if enteredValue is an empty string
```

## Labeled statement

Labeled statement that's really something we will rarely see and use in Javascript.
You can assign a name to a loop, we can assign it to any expression but it really only makes sense on loops because it is meant to be use with break and continue, as the example below:

```js
  let j = 0;
  outerWhile: do {
    console.log('Outer', j);
    innerFor: for (let k = 0; k < 5; k++) {
      if (k === 3) {
        break outerWhile;
        // continue outerWhile; // dangerous! => Infinite loop!
      }
      console.log('Inner', k);
    }
    j++;
  }
```

## Difference between for-of and for-in

- The primary difference is that for-of loops were built to give you an easy way to loop through array elements, for-in loops exist to make going through object properties easy. We can see how they works at the end of the next snippet:

```js
  let battleLog = [];

  function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };
  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'MONSTER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    default:
      logEntry = {};
  }
  battleLog.push(logEntry);
}

  for (const logEntry of battleLog) {
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLoggedEntry = i;
      break;
    }
    i++;
  }
```

## Difference between var, let and const

- the main difference betweem them is that the scope of variables you create in the functions differs. ```var``` has global/function(local scope) while ```let``` and ```const``` have block scope.
Block scope means that variables are created in a block (```{}```) and then belong to that block. Hence if statements and for-loops can also have their own, scope variables for example.

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/ES5%20-ES6%2B%20javaScript%20standars/var-vs-let-vs-const.pdf">var vs let vs const</a>
        </p>
    </embed>
</object>

> **We can set a strict mode in our script to avoid certains behaviours, how to do it here:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#changes_in_strict_mode

## JavaScript Language vs Browser APIs

We covered the JavaScript engine and what it does inside of the browser. You also learned that there is a difference between the JS code execution and Browser APIs you might tap into during that execution.

Essentially, you can split the code you write into these two pieces:

1) The JavaScript Language:

Understands core syntax (```let```, ```const```, etc) but does NOT know anything about the DOM (The Document Object Model (DOM) is a programming API for HTML and XML documents. It defines the logical structure of documents and the way a document is accessed and manipulated.), for example

2) Browser APIs:

Not responsible for understanding your code (that's what "The JavaScript Language" does) but instead responsible for exposing APIs like the DOM API which you can use from inside your script code.

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/ES5%20-ES6%2B%20javaScript%20standars/js-engines-in-detail.pdf">JavaScript engine</a>
        </p>
    </embed>
</object>

## Primitive vs reference values

- Primitive values - Javascript can get rid of them relatively easy, they're cheap to be recreated so it can easily duplicate them, this doesn't cost too much, not much memory is consumed by these values in the end and therefore, they're typically stored in its stack memory.

- Reference values - They are all the other objects or generally, all objects in Javascript. Now technically if you want to be really correct, string numbers and so on are not objects but are dynamically transformed to pseudo objects you could say when you do something like:

```js
let name = "Enrique";

name.length(); // return 7
```

It kind of implies that we're accessing a property of name which then in turn implies that name would be an object but it actually isn't.
What happens here is Javascript dynamically transforms a string or a number, so any primitive value to an object temporarily if you use the dot notation on it but other than that, it's a primitive value and it's always behaving as you see it in the slide below.

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/ES5%20-ES6%2B%20javaScript%20standars/primitive-vs-reference-values.pdf">Primitive vs reference values</a>
        </p>
    </embed>
</object>

Now all real objects which always stay objects are handled differently because they're more expensive to create, well these objects hold more data than just a couple of characters they're more complex to manage and therefore creating them takes longer, occupies more memory, etc and that's why the browser typically stores these in the heap.
So a **variable then only stores a pointer, so the address of that place in memory and not the value itself**. As the example, run in the developers tool console, shows below:

```js
let hobbies = ["Sports"];
let newHobbies = hobbies;

hobbies // return ["Sports"]
newHobbies // return ["Sports"]

hobbies.push("Riding");
newHobbies // return ["Sports", "Riding"]

```

That's because there is nothing like one and the other array, **there only is exactly one array in memory and then both variables hold the same pointer at that place in memory**. It's the same for objects.
For primitive values, a variable really stored the value itself in it, for reference values that's not the case.

In order to avoid tat behaviour we could create a new object using the spread operator, what this operator does is it pulls out all the key-value pairs in hobbies and adds them as new key value pairs to this, newestHobbies, new object. See example:

```js
let newestHobbies = [ ...hobbies ];
```

Now let's see a case where we have 2 different objects, therefore, 2 differents memory points, as shown below:

```js
const person = {age: 30};
const person2 = {age: 30};

person === person2 // return false
```

> The key difference between primitive and reference values is that when you copy a variable,  which means you assign it to a new one which holds a primitive value, then the value is actually copied.

## Garbage collector

- what this garbage collector does, it periodically checks the heap memory for unused objects and unused objects are objects without references. References are the addresses, is in the end,which are stored in variables and therefore the garbage collector will go ahead and basically remove, clear all unused objects from the memory, from the heap memory, all the objects where it sees that you certainly won't work with them anymore in your code.

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/ES5%20-ES6%2B%20javaScript%20standars/garbage-collection.pdf">Garbage collector</a>
        </p>
    </embed>
</object>

# Functions:

## Different Arrow Function Syntaxes

- For arrow functions, you got a couple of different syntaxes which you can use - here's a summary. 
**Important:** Don't miss the "function only returns an object" special case at the end of this article!

1) Default syntax:

```js
const add = (a, b) => {
    const result = a + b;
    return result; // like in "normal" functions, parameters and return statement are OPTIONAL!
};
```

> *Noteworthy: Semi-colon at end, no function keyword, parentheses around parameters/arguments*

2) Shorter parameter syntax, if exactly one parameter is received:

```js
const log = message => {
    console.log(message); // could also return something of course - this example just doesn't
};
```

> *Noteworthy: Parentheses around parameter list can be omitted (for exactly one argument)*

3) Empty parameter parentheses if NO arguments are received:

```js
const greet = () => {
    console.log('Hi there!');
};
```

> *Noteworthy: Parentheses have to be added (can't be omitted)*

4) Shorter function body, if exactly one expression is used:

```js
const add = (a, b) => a + b;
```

> *Noteworthy: Curly braces and return statement can be omitted, expression result is always returned automatically*

5) Function returns an object (with shortened syntax as shown in 4)):

```js
const loadPerson = pName => ({name: pName });
```

> *Noteworthy: Extra parentheses are required around the object, since the curly braces would otherwise be interpreted as the function body delimiters (and hence a syntax error would be thrown here)
> That last case can be confusing: Normally, in JavaScript, curly braces always can have exactly one meaning*

```js
const person = { name: 'Max' }; // Clearly creates an object
if (something) { ... } // Clearly used to mark the if statement block
```

- But when using arrow functions, curly braces can have two meanings:

1) Mark the function body (in default form)

2) Create an object which you want to return (in shorter function body form) To "tell" JavaScript what you want to do,
wrap the expression (e.g. object creation) in parentheses like shown above.

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/functions/arrow-functions.pdf">Arrow functions</a>
        </p>
    </embed>
</object>

***Quiz:***

## function declaration and function expression:

1) What's the difference between a function declaration and function expression?

- Function declarations automatically create variables that hold the function objects, function expressions don't do that - they return an object instead,
 it's your job to then do something with it (e.g. store it in a variable).

***Examples:***

> *Function Declaration - load before any code is executed*

```js
alert(foo()); // Return 5. Declarations are loaded before any code can run.
function foo() { return 5; }
```

> *Function Expression - load only when the interpreter reaches that line of code*

```js
alert(foo()); // ERROR! foo wasn't loaded yet
var foo = function() { return 5; }
```
<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/functions/function-declaration-vs-expression.pdf">Arrow functions</a>
        </p>
    </embed>
</object>

## Default function argument 

- We can set in our function a default value in case we send a "undefined" value, **this aproach only works with undefined**.

```js
const getGameResult = (computerChoice, playerChoice = DEFAULT_CHOICE ) => { // playerChoice = DEFAULT_CHOICE to set a default value
    const gameResult = [ "Draw", "Player", "Computer" ];

    if (computerChoice === ROCK && playerChoice === PAPER ||
        computerChoice === PAPER && playerChoice === SCISSORS ||
        computerChoice === SCISSORS && playerChoice === ROCK ) {
        return gameResult[1];

    } else if (computerChoice === playerChoice){
        return gameResult[0];
    } else{
        return gameResult[2];
    }
}
```

- The way we could call this function are: 

```js
 const result = getGameResult(computerChoice, playerChoice);
```

Or, to force the default value:

```js
 const result = getGameResult(computerChoice);
```

## Rest Parameter

- It is used when we need an unknown amount of values in a function. It bundles all arguments beyond the first argument, in our example below, into an array, accessible via tha ```values``` parameter:

```js
function add(startingValue, ...values) {
    let sum = startingValue;
    // ... other code ...
}
```

## JavaScript Function bind()

- What is bind () in JS?
    Bind is a method on the prototype of all functions in JavaScript. It allows you to create a new function from an existing function,
    change the new function's ```this``` context, and provide any arguments you want the new function to be called with.

    With the bind() method, an object can borrow a method from another object. The example below creates 2 objects (person and member). 
    The member object borrows the fullname method from the person object:

***Example:***

```js
const person = {
  firstName:"John",
  lastName: "Doe",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  }
}

const member = {
  firstName:"Hege",
  lastName: "Nilsen",
}

let fullName = person.fullName.bind(member);
```

**When might bind() come in handy?**

- In situations where you want to "pre-configure" a function's arguments, when you are not calling the function on your own.
  In other words when we need to pass values to a function that we don't want to execute straight away, as shown below, 
  used in a button listener where we can NOT set the function as ```operationController(OPERATORS[0])``` because would be trigger when the script is charged:

```js
addBtn.addEventListener("click", operationController.bind(null, OPERATORS[0]));
```

# Document Object Model (DOM)

## What's the DOM?

-  The browser provides the environment for Javascript to run, So the browser provides that, it also provides a bunch of APIs, a bunch of functionalities into which Javascript can tap so that Javascript can interact with the browser.

The loaded and rendered HTML code that we are able to interact with, because the browser exposes functionality to let Javascript interact with
it, that's called ***Document Object Model***, the abbreviation of course is ***DOM*** and that's where this term comes from.

So the DOM in the end is this loaded and rendered HTML code or to be precise, the object representation of this code which the browser creates behind the scenes into which we can tap with Javascript. So Javascript can work with a bunch of objects which will be exposed to us as Javascript objects which in the end represent what the browser rendered or what the browser made of that HTML code which was provided.

And in Javascript, we got certain methods, certain functionalities, as the below document query selector code that allows us to reach out to the loaded HTML code to get access to the first h1 element we have in the loaded HTML code;

```js
const titleE1 = document.querySelector("h1"); // Getting access to the first h1 element we have in the loaded HTML
```

>JavaScript is a "hosted language". The browser as host environment exposes this DOM API's to your JS code automatically.

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/DOM/the-document-object-model-dom.pdf">DOM</a>
        </p>
    </embed>
</object>

## Document and window

- **Document** is a property of the window global object. Now the difference is that document is the root DOM node which the browser exposes to all the ***rendered HTML elements***.

This provides us with various methods and functionalities to get access to the elements. To query for HTML elements, to interact with its DOM contents, so to interact with a loaded HTML code. It is one of the most important objects which are available by the browser to allow us to interact with the loaded HTML document.

- **Window** is a global object which has document as property, so window is the real topmost global object made available to you in Javascript in the browser and that reflects the active browser window or tab.

It's basically your global entry point, our global storage for our script, so it gives us access to all the features that the browser wants to expose to you, the root entry point is always to the window object but it also gives you some window specific properties for example for measuring the window width.

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/DOM/the-document-object-model-dom.pdf">Document and window, 2^nd</a>
        </p>
    </embed>
</object>

### Accessing to document and window:

- To access to the document properties we can execute the command below in our dev tools console:

```js
console.dir(document);
```

we were able to see the real Javascript object with all the properties that belong to it, as shown below:

![Properties belong to document node](img\document_properties.png "Document properties")

- Now in order to see the same with the window object we can just type ```window``` in the console, we should be able to see the response below:

![Properties belong to window node](img\window_properties.png "Window properties")

>As mention before window is the main node object therefore we don't need to type nothing else, that is why we can use ```alert()``` in our scripts even when ```window.alert()``` would be correct too.
>
>Browser always looks in the window object if you're calling or accessing any function, which is why alert works just as well as window.alert would.
> Keep in mind that the window does not really give you access to the real window but just to the tab in which your script is running.

## Querying elements:

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/DOM/querying-elements.pdf">Querying elements</a>
        </p>
    </embed>
</object>

## Nodes and elements:

- ***Nodes*** are the objects that make up the DOM, everything in the DOM is a node. 

- ***Elements*** are the nodes which are created off of HTML tags which were rendered.

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/DOM/nodes-vs-elements.pdf">Nodes and elements difference</a>
        </p>
    </embed>
</object>

***Example***

- This uses the CSS ID selector syntax to select the first matching element with an ID of "description".

<div>
    <p id="description">Hi there!</p>
</div>

```js
document.querySelector("#description");
```

# Node Query Methods

Here's a summary of the various methods you got to reach out to DOM elements (note: you can only query for element nodes). Besides the below query methods, you also got these special properties on the document object to select parts of the document:

```document.body``` => Selects the ```<body>``` element node.

```document.head``` => Selects the ```<head>``` element node.

```document.documentElement``` => Selects the ```<html>``` element node


## Query methods

```js
document.querySelector(<CSS selector>);
```

Takes any CSS selector (e.g. ```'#some-id'```, ```'.some-class'``` or ```'div p.some-class'```) and returns the first (!) matching element in the DOM. Returns ```null``` if no matching element could be found.

More information: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

```js 
document.getElementById(<ID>);
```

Takes an ID (without ```#```, just the id name) and returns the element that has this id. Since the same ID shouldn't occur more than once on your page, it'll always return exactly that one element. Returns ```null``` if no element with the specified ID could be found.

More information: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById

```js
document.querySelectorAll(<CSS selector>); 
```

Takes any CSS selector (e.g. ```'#some-id'```, ```'.some-class'``` or ```'div p.some-class'```) and returns all matching elements in the DOM as a static (non-live) NodeList. Returns and empty NodeList if no matching element could be found.

More information: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

```js
document.getElementsByClassName(<CSS CLASS>);
```

Takes a CSS class g (e.g. ```'some-class'```) and returns a live HTMLCollection of matched elements in your DOM. Returns an empty ```HTMLCollection``` if not matching elements were found.

More information: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName

```js 
document.getElementsByTagName(<HTML TAG>);
```

Takes an HTML tag (e.g. ```'p'```) and returns a live HTMLCollection of matched elements in your DOM. Returns an empty ```HTMLCollection``` if not matching elements were found.

More information: https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName

There also is the ```getElementsByName()``` method which really isn't used commonly (https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName).

## Evaluation and manipulation of elements:

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/DOM/evaluating-and-manipulating-elements.pdf">Evaluating and manipulating elements</a>
        </p>
    </embed>
</object>

- What's a difference between document.querySelector('#someId') and document.getElementById('someId')?

```querySelector``` uses a CSS selector and can match ANY alements (depending on provided selector), ```getElementById``` looks only for the ID.

### Attributes vs properties in elements: 

- ***Attributes*** -  is the thing in your HTML code, in your HTML text.

***Example of atribute***

- Here we can see ```value``` as attribute

<input value="Enter your text here..." type="text">

- ***Properties*** - is a value stored in the object that's created based on your HTML code.

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/DOM/attributes-vs-properties.pdf">Attributes vs properties elements</a>
        </p>
    </embed>
</object>

## Clarify html hierarchy terms:

![Html hierarchy terms](img\hierarchy_terms.png "Hierarchy terms")

## Traversing the DOM

- It means that once you selected one element, one node therefore, you might be interested in diving into all of its child nodes, for example to add it all list items in a list,
so rather than manually selecting every element you might be interested in with query selector, you could take an element which you already did select and then move to its children
or its siblings based on that element.

![Traversing concept](img\traversing-the-DOM.png "Traversing concept")

***Dev tool console example***

- Let's say that we want the second item of the next list:

  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>

- We could selected by quering it this way:

```js
  const ul = document.querySelector("ul"); 

  ul.children // If we press enter we'll see the output below

```

![Getting children data from list](img\list-children-values.png)

- As we saw in the image before we get an array so in order to get the second element of the list we could do:

```js
  ul.children[1]
```

And the response would be:

![Getting second child value from list](img\second-child-value.png)

>Keep in mind that the way described before is to get a collection of ***elements nodes***,
>to get a text node list array-like object we have to execute:

```js
  ul.childNodes
```
![Nodes Children](img\child-nodes.png)

```children``` only select child element nodes and ```childNodes``` therefore also includes text nodes

> ***Reminder***
> Nodes are the objects that make up the DOM, everything in the DOM is a node. HTML tags are just element nodes

![Node tree](img\node-tree.png)