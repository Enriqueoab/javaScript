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

![Properties belong to document node](/img/document_properties.png "Properties belong to document node")

- Now in order to see the same with the window object we can just type ```window``` in the console, we should be able to see the response below:

![Properties belong to window node](/img/window_properties.png "Properties belong to window node")

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

![Html hierarchy terms](/img/hierarchy_terms.png "Hierarchy terms")

# Traversing the DOM

> Avoiding the continuous use of ```document.query*(<CSS selector>)``` we will achieve a better application performance as this queries has to scan the whole HTML elements.
> In this secction we will se how to, using an already selected element, get the next sibling or the first child f the element selected.

## Children and child nodes

- It means that once you selected one element, one node therefore, you might be interested in diving into all of its child nodes, for example to add it all list items in a list,
so rather than manually selecting every element you might be interested in with query selector, you could take an element which you already did select and then move to its children
or its siblings based on that element.

![Traversing concept](/img/traversing-the-DOM.png "Traversing concept")

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

![Getting children data from list](/img/list-children-values.png)

- As we saw in the image before we get an array so in order to get the second element of the list we could do:

```js
  ul.children[1]
```

And the response would be:

![Getting second child value from list](/img/second-child-value.png)

>Keep in mind that the way described before is to get a collection of ***elements nodes***,
>to get a text node list array-like object we have to execute:

```js
  ul.childNodes
```
![Nodes Children](/img/child-nodes.png)

```children``` only select child element nodes and ```childNodes``` therefore also includes text nodes, white spaces included.

> ***Reminder***
> Nodes are the objects that make up the DOM, everything in the DOM is a node. HTML tags are just element nodes

![Node tree](/img/node-tree.png)

## Reaching out the parents nodes (Higher tag level):

- Let's say that we want the second item of the next list:

  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>

- Let's say that we want the parent of the next list:

```js
  const li = document.querySelector("li"); 

  li.parentElement // We could use li.parentNode too
```

> In almost all cases ```parentElement``` and ```parentNode``` will return the same, that is because only element nodes can have child nodes 
> ***Example*** 
> If you're on a child node so to say and you want to know all about the parent, it's an element node, text nodes can't have child nodes they can only hold text, no other nested content.


- Let's say that we want an ancestor of the list:

<body>
  <header>
    <h1>Ancestor picker</h1>
  </header>

  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</body>

- We could selected this way:

```js
  const li = document.querySelector("li"); 

  li.closest("body") 
```

- ```closest(<CSS selector>)``` is method for selecting any ancestor anywhere up in the element tree as long as it indirectly wraps the unordered list, that's what matters here.
```closest``` just takes a CSS selector to allow us to conveniently pick the nearest ancestor.

> ```closest("header")```  wouldn't work because ```header``` is not an ancestor.

## Reaching out the siblings nodes (Same tag level):

- Let's say that we want the unordered list ```(<ul>)``` previous sibling, in this case, ```(<body>)```:

<body>
  <header>
    <h1>Ancestor picker</h1>
  </header>

  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
  <input type="number" id="input-number" />
</body>

- We could make it as:

```js
  const ul = document.querySelector("ul"); 
  ul.previousElementSibling // As we saw before we could get the text nodes too using ul.previousSibling instead
```

- To get the sibling after the unordered list ```(<ul>)```:

```js
  const ul = document.querySelector("ul");
  ul.nextElementSibling // As we saw before we could get the text nodes too using ul.nextSibling instead
```

## Styling DOM elements:

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/DOM/styling-dom-elements.pdf">Styling elements</a>
        </p>
    </embed>
</object>

- Let's say that we want to change the styling of ```(<section>)```:

<section>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</section>
<button>Toggle (Set) visibility</button>

- And we have the stiles and clases as below:

<style>
  .red-bg {
    background-color: red;
    color: white;
  }

  .visible {
    display: block;
  }

  .invisible {
    display: none;
  }
</style>

- We could make it as:

```js
  const section = document.querySelector("section");
  const button = document.querySelector("button");

  section.className = "" // We reset the class name  of the section

  button.addEventListener('click', () => {
  // if (section.className === 'red-bg visible') {
  //   section.className = 'red-bg invisible';
  // } else {
  //   section.className = 'red-bg visible';
  // }

  // section.classList.toggle('visible');
  section.classList.toggle('invisible');
});
```
- The result would look like:

![Visible list](/img/visible-list.png)

- And if we press the "Toggle visibility" button:

***Notice the "section" class name changed too***

![Invisible list](/img/invisible-list.png)

# Creating and inserting elements:

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/DOM/creating-and-inserting-elements.pdf">Creating and inserting elements</a>
        </p>
    </embed>
</object>

## Examples how that works:

### Replacing with new HTML code:

```js
  const section = document.querySelector("section");
  section.inerHTML = "<h2>Title example</h2>";
});
```

> To set new elements, you use ```innerHTML``` with a string that contains HTML code, like the example below, a new title.
> It's important to know that it will always replace all the old HTML content. Any previous nodes between the section tags,
> in our case, and not just direct child nodes **but any descendants will be entirely replaced with this new HTML code**.
> **A good use case is when we don't need to interact much with the content, where we don't need to assign specific classes that change** 
> **dynamically**.

_Before:_

<section>
  <ul>
    <li class="list-item">Item 1</li>
    <li class="list-item">Item 2</li>
    <li class="list-item">Item 3</li>
  </ul>
</section>

_After:_

<section>
  <h2>Title example</h2>
</section>

### Adding HTML code:

- Next a way of adding new content to an existing element with some HTML code in Javascript. With the next way we wouldn't lose information of any kind even user input information.

```js
  const ul = document.querySelector("ul");
  ul.insertAdjacentHTML("beforeend", "<li>Item 4</li>");
```
_Before:_

<section>
  <ul>
    <li class="list-item">Item 1</li>
    <li class="list-item">Item 2</li>
    <li class="list-item">Item 3</li>
  </ul>
</section>

_After:_

<section>
  <ul>
    <li class="list-item">Item 1</li>
    <li class="list-item">Item 2</li>
    <li class="list-item">Item 3</li>
    <li>Item 4</li>
  </ul>
</section>

> More details https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

![Adjacent HTML values summary](/img/insertAdjacentHTML-values.png)

- Representation of each posible value:

<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->

> The downside just is you have no direct access to the newly rendered content.
> Example : Let's say you inserted a button and you want to add an event listener.
> You could use a query selector, but that would be a extra step in the process.

### Creating a new DOM element:

- In the next example let's create a new list element node, and then appended to the unordered list.
This approach advantage is that we already have this object so we could add event listeners or change the style or do whatever we need.

```js
  const ul = document.querySelector("ul");
  const newLi = document.createElement("li"); // Always call create element on the document

  newLi.textContent = "Item 4"; // As the element node it's in js memory, we can modify it
  ul.appendChild(newLi);

  // Another ways to insert elements:

  ul.prepend(newLi):// Insert "newLi" as first element (Check browsers support)

  ul.lastElementChild.before(newLi);// Insert "newLi" before/after the last element ("Item 3") (Check browsers support)

  ul.firstElementChild.replaceWith(newLi);// replace the last element ("Item 1") with "newLi" (Check browsers support)

```
- Example to add a new element after the "Item 2":

```js
  const ul = document.querySelector("ul");
  const newLi = document.createElement("li");
  const secondLi = ul.children[1];
  newLi.textContent = "Item 4";

  secondLi.insertAdjacentElement("afterend", newLi);
```

- Example in the view:

![New DOM element console execution example](/img/new-dom-element.png)

> A newer approach to ```appendChild``` is ```append```, with append we could add some string too, not only an element,
> ```append("Some Text")``` or multiple nodes at once ```append(newLi, "Some new text", anotherLi)```

> It's worth to mention that ```appendChild``` has been around for longer so we have more browsers supporting it.

### Cloning DOM elements:

- ```myElement.cloneNode(boolean)``` is available on every DOM node object, this will clone this node and will return a brand new one. It takes one optional **boolean argument**, which by default is false, and simply determines if a **deep clone should be done, so with all child and descendant elements**.

```js
  const ul = document.querySelector("ul");
  
  const secondLi = ul.children[1];
  
  const anotherLi = secondLi.cloneNode(true);
  const andAnotherLi = anotherLi.cloneNode(true);
  
  anotherLi.textContent = "Item cloned";
  andAnotherLi.textContent = "Another Item cloned";

  ul.append(anotherLi, andAnotherLi);

```
_After:_

![Cloning after appending](/img/cloning-after-example.png)

_Before:_

![Cloning before appending](/img/cloning-before-example.png)

##  Live Node Lists vs Static Node Lists:

- Example, if we run the next query:

```js
const listItems = document.querySelectorAll("li");

```

- So non-live array or non-live list _listItems_ is taking a snapshot of the DOM, of what we select there, when I run ```querySelectorAll``` and does not update that array, as we see in the picture below.
Now, that's **not necessarily a disadvantage from a performance perspective or from a memory consumption perspective**

_Result:_

![Non live list](/img/non-live-list.png)

- Example, getting element:

```js
const listItems2 = list.getElementsByTagName("li");

```

- we can see this indeed is a live list which also includes our most recent addition. All the methods called like ```getElementsBySomething``` always gives us an array-like objects with live lists which will change when the items you queried in the past change. **That can or cannot be an advantage, often it will not matter**. **It could lead to a higher memory consumption if you're managing a lot of such collections which change all the time**. For the most part, query selectors should be used because it is more flexible, supports richer queries and therefore often is a common choice if you want to query for multiple items.

_Result:_

![Live list](/img/live-list.png)

## Removing elements: 

- The newest way to do it is as shown below:

```js
  const ul = document.querySelector("ul");
  ul.remove();
```

- If we want to avoid have potentially browsers support errors we can reach the parent of the element we want to remove and then remove the child of the parent, as below:

```js
  const ul = document.querySelector("ul");
  ul.parentElement.removeChild(ul);
```

***Summary secction slide***

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/DOM/insertion-removal-summary.pdf">Insertion removal summary</a>
        </p>
    </embed>
</object>


# Helpful resources.

DOM getBoundingClientRect(): https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

More on location Object: https://developer.mozilla.org/en-US/docs/Web/API/Location

More on window Object: https://developer.mozilla.org/en-US/docs/Web/API/Window

More on navigator Object: https://developer.mozilla.org/en-US/docs/Web/API/Navigator


## Function Closures:

All functions are closures, so on are able to access outer environments and refer to them and the special thing about functions just is that they log in the surrounding environment and its variables so that they can remember it and use it when the function eventually gets called even if that logged in variable wasn't used outside of the function before so that Javascript does not dispose of these unused variables but keeps them so that the function that might be interested still can use that.

# Quiz interesting questions:

## How does JavaScript handle asynchronous code execution?

> JS is sinle-threaded but offloads longer-taking tasks (e.g timers) to the browser, which uses multiple threads.
> The browser communicates with JS via the Event Loop and the Message Queue to let it know once a longer-taking task finished.

## What's a Promise in JavaScript?

> Promises are objects which "wrap" (asynchronous) code to make working with it easier.
> For a lot of asynchronous operations, you can also work with callbacks, promises make working with async code easier though.

## What is "Chaining" in the context of a Promise?

> You can chain ```then()``` and ```catch()``` methods onto each other since each ```then()``` and ```catch()``` method returns a new promises
> which is yet to be settle.
> Even if you don't add a return statement, then() and catch() always yield a new promise.


## Does the last then() block in the below example execute (i.e. does the function passed to it execute)?

```js
  const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve('Timer completed!');
      }, 1000);
  })
      .then((text) => { throw new Error('Failed!') })
      .catch(err => console.log(err))
      .then(() => console.log('Does that execute?'));
```

> Yes, as long as you handle the error via a ```catch()``` block, you can have working ```then()``` blocks thereafter. ```catch()``` also returns a new promise.

## What's the difference between ```async```/ ```await``` and Promises?

> ```async```/ ```await``` in the end just are a code transformation which still use promises behind the scenes.

## What's the promise equivalent to this code?

```js
  async function wait() {
      try {
          const result = await doSomething();
          console.log(result);
      } catch (error) {
          console.log('Error!');
      }
  }
```

- The promise equivalent would be:

```js
  function wait(){
    doSomething()
      .then(result => {
        console.log(result);
      })
      .catch (error => {
          console.log('Error!');
      });
  }

```

# Promise States & "finally"

- **PENDING** => Promise is doing work, neither ```then()``` nor ```catch()``` executes at this moment

- **RESOLVED** => Promise is resolved => ```then()``` executes

- **REJECTED**  => Promise was rejected => ```catch()``` executes

When you have another ```then()``` block after a ```catch()``` or ```then()``` block, the promise re-enters PENDING mode (keep in mind: ```then()``` and ```catch()``` always return a new promise - either not resolving to anything or resolving to what you return inside of ```then()```). Only if there are no more ```then()``` blocks left, it enters a new, final mode: SETTLED.

Once SETTLED, you can use a special block - ```finally()``` - to do final cleanup work. ```finally()``` is reached no matter if you resolved or rejected before.

Here's an example:

```js
somePromiseCreatingCode()
    .then(firstResult => {
        return 'done with first promise';
    })
    .catch(err => {
        // would handle any errors thrown before
        // implicitly returns a new promise - just like then()
    })
    .finally(() => {
        // the promise is settled now - finally() will NOT return a new promise!
        // you can do final cleanup work here
    });
```

> You don't have to add a finally() block.

## Load files dinamically 

- If we would only load these files when we need them, we would speed up the initial page load because we would request less files to be downloaded and parsed. So to load modules conditionally, we can use an alternative import syntax shown below:

```js
import("./urlToModule/Tooltip.js").then(module => {
  const tooltip = Tooltip(
    () => {
      this.hasActiveTooltip = false;
    },
    ....
  )
})

```

# Browser side data storage

- Browser-side data storage refers to the capability of web browsers to store data locally on a user's device, allowing websites and web applications to save and retrieve information. These mechanisms enable developers to enhance user experiences by customizing content, maintaining user preferences, and improving performance. Several technologies facilitate browser-side data storage:

![Browser storage definition](/img/what-is-browser-storage.png)

| Mechanism       | Description                                                                                                                                              | Key Difference                                                                                                                                                                                |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cookies         | Small pieces of data stored by websites in a user's browser, holding preferences, session IDs, or other information. Size limited (usually up to 4KB).  | Limited in size and scope, primarily used for short-term data storage and sent with every HTTP request, impacting performance.                                                                  |
| Web Storage     | Includes `localStorage` and `sessionStorage`, offering larger capacities (up to 5MB or more) than cookies. `localStorage` retains data indefinitely.    | Provides larger storage capacity and retains data even after the browser is closed. `sessionStorage` stores data only for a single session and is limited to that session's lifetime.              |
| IndexedDB       | Advanced API for storing structured data in the browser. Potent but requires more code and understanding compared to other storage mechanisms.             | Offers more powerful and scalable storage for larger amounts of structured data but requires complex handling and is more suitable for complex data structures.                               |
| Cache API       | Allows caching of network requests and responses, enhancing website performance by serving content locally, reducing re-downloading.                     | Caches network resources, reducing reliance on the server for subsequent requests and improving website speed.                                                                                |
| Service Workers | Enable the creation of offline web experiences by intercepting network requests and caching resources for offline use.                                    | Works as a programmable proxy, intercepting network requests and allowing developers to manage caching and offline experiences, enhancing the site's offline capabilities.                   |

![Browser side storages](/img/browser-side-storage.png)


# JavaScript and browser support

- JavaScript syntax comprises the language rules for coding, encompassing variables, loops, and functions. Browser APIs, on the other hand, offer tools provided by browsers to interact with features like the DOM and device-specific functionalities. While JavaScript syntax remains consistent, browser support for specific APIs may vary across different browsers and versions. This discrepancy often requires developers to use techniques like polyfills or feature detection to ensure broader compatibility across browsers.

![Difference between JS syntax and browser apis](/img/js-syntax-vs-browser-apis.png)

## Ways to check for features and browser support

![Ways to checking browser support](/img/checking-browser-support.png)


# Polyfill (Specific features compatibility level)

- A polyfill is a piece of code, usually written in JavaScript, that provides modern functionality on older browsers that do not support certain features, methods, or APIs of newer web standards, it can be a third party feature. It fills the "gaps" in browser compatibility, allowing developers to use the latest features while ensuring that their code works across a wider range of browsers and versions.

The term **polyfill**  combines "poly" (meaning many) and "fill," suggesting that it fills in the gaps for many browsers that lack support for specific functionalities.

```js
  // Polyfill for startsWith method
  if (!String.prototype.startsWith) {
      String.prototype.startsWith = function(searchString, position) {
          position = position || 0;
          return this.substr(position, searchString.length) === searchString;
      };
  }

  // Example usage of startsWith method and polyfill
  const str = 'Hello, world!';
  const substring = 'Hello';

  // Using startsWith method
  if (str.startsWith(substring)) {
      console.log('The string starts with "Hello"');
  } else {
      console.log('The string does not start with "Hello"');
  }
```

# Transpiling (Browser compatibility level)

- Transpiling is the process of converting code written in one version of a programming language (e.g., ECMAScript 6/ES6 or later) into an earlier version (usually ECMAScript 5/ES5) that older browsers can understand and execute. It enables developers to write code using the latest language features and syntax while ensuring compatibility with browsers that lack support for these newer features. Transpilers like Babel are commonly used tools that perform this conversion, allowing developers to use modern JavaScript features and then automatically convert them into versions that are compatible with a wider range of browsers.

![Transpilation](/img/transpilation.png)

# Transpiling VS polyfill

| Aspect         | Transpiling                                                                                                                                                                     | Polyfilling                                                                                                                                                                       |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Definition     | Process of converting code from a newer JavaScript version to an older version for compatibility with older browsers.                                                           | Technique to provide substitute implementations for missing browser features or APIs, enabling support for newer functionalities in older browsers.                               |
| Purpose        | Enables writing code using the latest language features while ensuring compatibility with browsers that lack support for these features.                                       | Addresses specific missing functionalities by adding alternative implementations, ensuring consistent behavior across browsers.                                                      |
| Tools          | Transpilers like Babel are commonly used to convert modern JavaScript code into backward-compatible versions.                                                                    | Developers use polyfills—JavaScript code snippets or libraries—created to replicate the behavior of newer features or APIs in browsers that don't natively support them.             |
| Example        | Converts ES6/ES7 code (arrow functions, `let` and `const` declarations) into ES5, allowing execution in older browsers.                                                       | Adds methods like `startsWith()` for strings in browsers that lack support for this ES6 method, ensuring consistent behavior when checking string start positions across different browsers. |
| Key Difference | Focuses on converting code written in newer JavaScript versions into older versions for broader browser compatibility.                                                            | Addresses specific missing functionalities by providing alternative implementations, ensuring consistent behavior for newer features across different browsers.                         |


# What is node.js?

- As a hosted language we can execute Javascript anywhere by simply taking the Javascript engine out of the browser basically. We can then add our own APIs if we want to, not APIs to work with the DOM because if the environment is detached from the web page, there is no DOM (HTML), but instead we might want to add different APIs, APIs to, for example, work with the local file system, which is not possible in the browser due to security reasons,
and that's exactly what Node.js does.

> Node.js is essentially the extracted V8 engine Chrome offers enriched by extra APIs, so its that engine you know from the browser
> but basically instead of the browser APIs, it has access to other APIs and it runs outside of the browser, this is Node.js.

![Node slide explanation](/img/node_javascript.png)

# What is express.js?

- It is a framework for Node.js which makes building web applications, web servers with Node.js easier, it does the same as node.js but behing the scenes. In order to use it we have to make our project a NPM one running:

```sh
  npm init 
```

Once we confirm the values asked, a ```package.json``` file will be created so we can install new dependencies in the project. Same idea as in the client side where we enrich our project using npm packages. 
The main difference is that we won't need ```webpack```, for example, as node natively support these packages in Node modules.

And we can install Express running:

```sh
  npm install express --save
```

If the operation is successful it will create a ```node_modules``` and a ```package-lock.json``` files.

## How is express.js works?

- It's a middleware-driven framework, that means, in the end Express is all about funneling the incoming request through different functions which all received the request and all can do something with it and each function can either stop the request and send back a response, at which point the request will not reach any other function thereafter, any other middleware or a function forwards the request to the next function, o the next middleware in line.

> So a middleware is really just a function that gets the request and then can do something with it.

Here we have an implemented example:

```js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded()); // Another middleware using a third party package. (parsing the form data in our case)

app.use((request, response, next) => { // To register middelware, orders matter.
  response.setHeader("Content-Type", "text/html");
  next(); // In order to tell Express that we want to execute the next middleware i line
});

app.use((request, response, next) => {

  // All middelware work with the same request. What we set before will be carried over into this function
    const userName = req.body.username || 'Unknown User'; //USING THE PARSED BODY MADE BY THE FIRST MIDDDLEWARE
  res.send(`<h1>Hi ${userName}</h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`);


});

app.listen(3000); 

```

### Example Rendering Server-side HTML with Templates & EJS

> **EJS package** allowed us to create template which contains HTML content but where we can also inject dynamic content so that we can have a mixture of
> HTML static content and dynamic content, using special syntax, this will be all then merged together into HTML file on the server side and sent back to the 
> client, so on the client we will receive an HTML file but it allows us to enrich this HTML file with dynamic content.

- For that we have first to create our view, where we are going to be using html and some EJS special syntax. the file has to have a .ejs extension. In our case we will call it index.ejs

```html

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>NodeJS Demo</title>
    </head>
    <body>
      <h1>Hello <%= user %></h1> 
      <form method="POST" action="/">
        <input name="username" type="text" />
        <button type="submit">Send</button>
      </form>
    </body>
  </html>

```

```js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine","ejs"); // Tells Express what engine use for parssing our views (template) in our case ejs

app.set("views","path/to/views/folder"); // Where to find our views

app.use(bodyParser.urlencoded()); // Another middleware using a third party package. (parsing the form data in our case)

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  next();
});

app.use((req, res, next) => {
  const userName = req.body.username || 'Unknown User';
  // res.render('Just name of the view file', {All the data we want to provide to the template});
  res.render('index', {
    user: userName
  });
});

app.listen(3000); 

```
# CORS (Cross Origin Resource Sharing) theory

- By default, as a security measure, browsers block cross origin requests from differen servers, only requests to the same origin are allowed (same domain).

![CORS theory slide](/img/cors-slide.png)

> We would encounter the errors below:

![CORS console error](/img/cors-error.png)

> As the browser send an OPTIONS request for some HTTP methods, for example when sending a POST method,
> we could encounter the error below too.

![CORS console headers error](/img/cors-headers-error.png)

## CORS error fix:

-  We have to set some extra headers that signal to the browser that we're allowing this access from the other page. The extra headers that we have to add are shown below:

```js

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // "*" can be our especific url. * = any server
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // To restrict the HTTP methods allowed
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow the content type header that the client might send to us
    next();
  });

```


# Security

## Some attack patterns:

![Attack patterns to be aware of](/img/security.png)


> The two most important attack patterns or vulnerabilities are **Security details in your code**
> which you expose accidentally and **Cross site scripting attacks**.

- These are the Javascript specific attack patterns whereas the CSRF pattern works with any language on the backend and with no Javascript code in the frontend and causes a general security concept but two leftmost holes, security holes are the important ones you might have in your application. All your Javascript code is always readable by anyone, that's something we have to keep in mind. Users might execute scripts to do dangerous stuff, like read personal data, send malicious requests with user data, etc.


# Deploying code

## Different kinds of Applications:

![Different kinds of Applications](/img/kinds-of-applications.png)

**You can build different kinds of websites/ web apps.**

There are three major types:

- Static Websites (just HTML + CSS + JS)

- Single-Page-Applications (***SPAs, HTML + CSS + JS with only one HTML page being served, client-side JS is used to re-render the page dynamically***)

- Dynamic/ Server-side rendered Web Applications: Websites where the HTML pages are created dynamically on the server (***e.g. via templating engines like EJS***).

> When deploying such websites, it's important to understand that sites with NO server-side code
> (***i.e. Static Websites and SPAs***), required only a static host (e.g. AWS S3, Firebase Hosting).

> Pages where HTML is generated dynamically on the server require a host that is capable of executing the 
> server-side code (***i.e. a server that supports NodeJS, PHP or whatever language is being used***).

## Deployment Steps:

![Deployment Steps](/img/deployment-steps.png)

# Performance and optimization:

![Performance optimzation layers](/img/performance-layers.png)

## For the startup time performance:

- ***An important factor is the size of our scripts:*** The time it takes to display something on the screen and the time it takes until the user is able to do something with that screen, the JavaScript file size can affect both.

- ***Amount of HTTP round trips:*** The more HTTP round trips it takes to finally have the final state of our page, the longer
it will take until our page is ready to run.

## For the runtime time performance:

### It's all about optimizing our code execution.

- ***DOM access:*** We want to avoid unnecessary DOM operations, working with the DOM is really expensive from a performance perspective. Ex: render too many elements on the screen even though maybe just one element needs to change.

- ***Memory leaks:*** A lot of web pages out there do have tiny memory leaks but if you have bigger ones, they can really add up and can lead to our page becoming slower or to actually even crash in the worst case scenario.

- ***Code alternatives:*** It's also interesting to think about different ways of solving one and the same problem in Javascript,
so to find code alternatives with better performance. Ex: When you loop through an array, don't all have the same performance.

- ***Micro optimizations:*** We  could opt to use a certain data structure because it's a bit quicker than that other approach we used before. Generally, you want to shy away from such micro optimizations though.

> Keep in mind that Javascript is just one part, when we talk about optimizing our web page, it also includes things like 
> writing efficient CSS, HTML and so on. Javascript typically is the most important thing to optimize.

## Measuring performance:

![Advices for auditing performance](/img/auditing-performance.png)


![Some ways to measure performance](/img/measuring-performance.png)

### Ways to Measure performance:

- We can use to find out how often we interact with DOM in the ```"Elements" tab in the Chrome dev tools.``` When we interact wth a DOM element, in the next example a list element. Now Chrome highlights the items, in the pictiure below, which were touched by it, so which were changed or which were added or re-rendered and this already gives us one hint at something which might not be perfect at the moment, as deleting the last item will make the whole list get re-render. 

![Lit up re-render elements](/img/re-rendered-elements.png)


- In the ```"Network" tab in the Chrome dev tools``` we can find out how much code we're downloading, how long it takes and
how many round trips we have.

![File sizes in network devTools tab](/img/network-tab.png)

> Since we have webpack, in the example code, we don't have too many round trips. They are actually bundled together.
> In the production mode webpack config, will shrink our code and optimize it even more.

- In the same tab we can test our code in a slower network, Disabling cache and choosing it in the drop down to the right as shown below:

![Disable cache and slower network test](/img/slower-network-test.png)

- We can do something similar in the ```"Performance" tab in the Chrome dev tools``` and in the "CPU" dropdown select any "slowdown" value (We can see these options clicking the gear). So if we had a page with a lot of complex animations running or a lot of complex interactions, we could use CPU slow down here to check whether it might have issues on slower devices.

![Slow down performance](/img/performance-slowdown.png)

- We can record the ```"Performance" tab``` too in order to analyze all the steps that a process/action in our web make. That way we can see which parts are creating performance issues. The steps would be as follow:

1.) Click the record button:

![Recording web action. Analyzing performance](/img/record-button-dev-tools.png)

2.) Make the action that we want to analyze. In our case remove product.

3.) Stop recording to see the process and metrics. Screenshots of the step by step, memory consuption to analyze memory leaks, timeline of the snapshot we captured, etc:

![Analyzing performance](/img/after-action-performance.png)

![Analyzing timeline](/img/zoom-timeline.png)

- We can do the same "Record" in the ```Memory tab``` to get a snapshot of all the memory storage used in our web. In the image below we are comparing snapshots:

![Comparing memory snapshots](/img/memory-comparation.png)

- We can use the ```Audit tab``` too in order to see how our aplication perform and have a general idea of how our application behave so we may want to analyze a specific problem in detail using any other specific tab descripted before: 

![Audit tab metrics](/img/audit-tab-analysis.png)
