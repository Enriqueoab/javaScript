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
        <p>Summary slide: <a href="https://github.com/Enriqueoab/javaScript/blob/development/Summary%20slides/ES5%20-ES6%2B%20javaScript%20standars/var-vs-let-vs-const.pdf">var vs let vs const</a>
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
        <p>Summary slide: <a href="/Summary%20slides/ES5%20-ES6%2B%20javaScript%20standars/js-engines-in-detail.pdf">var vs let vs const</a>
        </p>
    </embed>
</object>

## Primitive vs reference values

