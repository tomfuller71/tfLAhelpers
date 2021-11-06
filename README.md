# tf-LA- helpers
This package contains a few helper classes and functions created while attending the Launch Academy Boston 35 bootcamp.

So ... beware ... zero promises.
___

## Str
 A `class` that contains various methods that help working with strings.
 ### Methods:
-  `capitalize(string: {string})` -  a given string e.g. "hello world" returns "Hello world".
- `stringSortPredicate(isAsc: {Boolean} = true)` - Returns a predicate for use in an `Array.sort` method.
- `sortStrings(arr: {arr[]}, isAsc:{Boolean} = true, inPlace: {Boolean} = true)` - Sorts string arrays either ascending or descending either in place or returning a shallow copy.
- `pluralizeNoun(noun: {string})` - has a bit of a go at converting a noun into its plural form using some (but by no means all) of the rules from  [Grammerly](https://www.grammarly.com/blog/plural-nouns/).

______
## Question

A `class` for asking questions via `window.prompt()`.

### Initialized with:
    
- `question: {string}` -  The text to display in the prompt.
- `'answerType: '{string}` -  The type of answer required - "string", "number", or "boolean".  Default is "string".
- `pattern: {RegExp}` -  The regular expression literal that a "string" answer must match to be valid.  Default is `/./` matching all characters.
- `min: {number}` -  Either the minium value for "number", or `length` for a string. Default is zero.
- `max: {number}` - Either the maximum value for "number", or `length` for a string. Default is Infinity.
### Methods:
- `ask()` - Ask a question via `prompt` and return the validated answer based on the `Question`'s validation critera.
---
## De-duplicate
### Function
- `deduplicate({any[]})` - Returns a shallow copy of only the unique items in an provided array.



     