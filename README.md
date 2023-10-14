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

**We can set a strict mode in our script to avoid certains behaviours, how to do it here:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#changes_in_strict_mode



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

The key difference between primitive and reference values is that when you copy a variable,  which means you assign it to a new one which holds a primitive value, then the value is actually copied.

## Garbage collector

- what this garbage collector does, it periodically checks the heap memory for unused objects and unused objects are objects without references. References are the addresses, is in the end,which are stored in variables and therefore the garbage collector will go ahead and basically remove, clear all unused objects from the memory, from the heap memory, all the objects where it sees that you certainly won't work with them anymore in your code.

<object>
    <embed>
        <p>Summary slide: <a href="/Summary%20slides/ES5%20-ES6%2B%20javaScript%20standars/garbage-collection.pdf">Garbage collector</a>
        </p>
    </embed>
</object>

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

*Noteworthy: Semi-colon at end, no function keyword, parentheses around parameters/arguments*

2) Shorter parameter syntax, if exactly one parameter is received:

```js
const log = message => {
    console.log(message); // could also return something of course - this example just doesn't
};
```

*Noteworthy: Parentheses around parameter list can be omitted (for exactly one argument)*

3) Empty parameter parentheses if NO arguments are received:

```js
const greet = () => {
    console.log('Hi there!');
};
```

*Noteworthy: Parentheses have to be added (can't be omitted)*

4) Shorter function body, if exactly one expression is used:

```js
const add = (a, b) => a + b;
```

*Noteworthy: Curly braces and return statement can be omitted, expression result is always returned automatically*

5) Function returns an object (with shortened syntax as shown in 4)):

```js
const loadPerson = pName => ({name: pName });
```

*Noteworthy: Extra parentheses are required around the object, since the curly braces would otherwise be interpreted as the function body delimiters (and hence a syntax error would be thrown here)
That last case can be confusing: Normally, in JavaScript, curly braces always can have exactly one meaning*

```js
const person = { name: 'Max' }; // Clearly creates an object
if (something) { ... } // Clearly used to mark the if statement block
```

- But when using arrow functions, curly braces can have two meanings:

1) Mark the function body (in default form)

2) Create an object which you want to return (in shorter function body form) To "tell" JavaScript what you want to do,
wrap the expression (e.g. object creation) in parentheses like shown above.

## Quiz:

1) What's the difference between a function declaration and function expression?

- Function declarations automatically create variables that hold the function objects, function expressions don't do that - they return an object instead,
 it's your job to then do something with it (e.g. store it in a variable).

**Examples:**

*Function Declaration - load before any code is executed*

```js
alert(foo()); // Return 5. Declarations are loaded before any code can run.
function foo() { return 5; }
```

*Function Expression - load only when the interpreter reaches that line of code*

```js
alert(foo()); // ERROR! foo wasn't loaded yet
var foo = function() { return 5; }
```