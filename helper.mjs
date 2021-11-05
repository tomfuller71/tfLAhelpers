// @ts-check

/**
 * Class that contains various methods that help working with strings.
 */
export class Str {
    /**
     * Capitalize a given string e.g. "hello world" returns "Hello world".
     * @param {string} string The string to be capitalized
     * @returns {string} The capitalized string
     */
    capitalise(string) {
        return string[0].toUpperCase() + string.slice(1)
    } 

    /**
     * Sorts string arrays
     * @param {string[]} arr `The array of strings to be sorted
     * @param {boolean} isAsc The sort order - `true`(default)for A-Z order, or `false` for Z-A.
     * @param {boolean} inPlace Sort `arr` in place or return a copy without mutuating original.
     * @returns {string[]?} Optionally the new sorted array 
     * 
     */
    sortStrings(arr, isAsc = true, inPlace = true) {
        if (arr == null) return;
    
        if (typeof arr[0] !== "string") { 
            console.error("@param `arr` must be of type `string[]`");
            return;
        }
    
        if (typeof isAsc !== "boolean" || typeof inPlace !== "boolean") {
            console.error("@param must be of type `Boolean`");
            return;
        }
    
        if (inPlace) {
            arr.sort(this.stringSortPredicate(isAsc));
            return;
        }
        else {
            return [...arr].sort(this.stringSortPredicate(isAsc));
        }
    };
    
    /**
     * Returns a predicate for use in an `Array.sort` method
     * @param {boolean} isAsc The sort order - `true`(default) for A-Z order, or `false` for Z-A.
     * @returns {(a: string, b: string) => number} predicate function
     */
    stringSortPredicate(isAsc = true) {
        if (typeof isAsc !== "boolean") console.error("param must be bool");
        const order = isAsc ? 1 : -1


        const predicate  = (a, b) => {
            a = a.toLowerCase();
            b = b.toLowerCase();
            if (a > b) return order;
            if (b > a) return order * -1;
            return 0;
        }
        return predicate;
    }

    /**
    * Try to pluralize noun using some of the rules from 
    * [Grammerly](https://www.grammarly.com/blog/plural-nouns/)
    * @param {string} noun the noun that is to be converted to a plural
    * @returns {string} the pluralized noun
    */
    pluralizeNoun(noun) {
        if (typeof noun !== "string") { 
            console.error("Must be a string");
             return;
        }

	    // Setting up regular expressions
	    const suffix_es = /[a-z]+([oszx]|ch|sh|ss|[aeiou]y)$/;
	    const changeEndTo_ies = /[a-z]+y$/;
	    const changeEndTo_ves = /[a-z]+(f|fe)$/;
        
	    const exceptions = [
	        'photo', 'piano', 'halo', 'roof', 'belief', 'chef', 'chief'
	    ];

	    const testNoun = noun.toLowerCase()
	    let plural = "";

	    if (suffix_es.test(testNoun)) {
	        plural = testNoun + 'es';
	    }
	    else if (changeEndTo_ies.test(testNoun)) {
	        plural = testNoun.slice(0, -1) + 'ies'
	    }
	    else if (changeEndTo_ves.test(testNoun)) {
	        let indexf = testNoun.lastIndexOf('f');
	        plural = testNoun.slice(0,indexf) + 'ves';
	    }
	    //Base case rule append an 's'
	    else {
	    plural = testNoun +'s'
	    }

	    // Change back any exception case to base case
	    if (exceptions.some(str => str === testNoun)) {
	        plural = testNoun + 's'
	    }
	    return plural;
    }
}

/**
 * Creates a shallow copy of unique items in an array
 * @param {any[]} sortedArray The array to be deduped - must be sorted!
 * @returns The de-duplicated array...
 */
export function deduplicate(sortedArray) {
    let checkElement = sortedArray[0];
    let deduped = [checkElement];

    for (const element of sortedArray) {
        if (element !== checkElement) {
            checkElement = element;
            deduped.push(element);
        }
    }
    return deduped;
}

export class Question {
    /**
     * @param {string} question The text to display in the prompt.
     * @param {string} answerType The type of answer required - "string", "number", or "boolean".  Default is "string".
     * @param {RegExp} pattern The regular expression literal that a "string" answer must match to be valid.  Default is `/./` matching all characters.
     * @param {number} min Either the minium value for "number", or `length` for a string. Default is zero.
     * @param {number} max Either the maximum value for "number", or `length` for a string. Default is Infinity.
     */
    constructor(
        question,
        answerType = "string",
        pattern = /./,
        min = 0,
        max = Number.POSITIVE_INFINITY
    ) {
         this.question = question,
         this.answerType =  answerType,
         this.pattern = pattern,
         this.min = min,
         this.max = max
        }
    /**
     * Ask a question via `prompt` and return the validated answer based on the `Question`'s validation critera
     * @returns {string|number|boolean} The question's validated answer value
     */    
    ask() {
        let answer = null;
        do {
            answer = this.validate(prompt(this.question));
        } while (answer === null)
        return answer;
    }

    /**
     * Validates a `prompt`'s string answer value based on the `Question.answerType`, and associated question criteria.
     * @param {string} answer the question answer to be validated. 
     * @returns {string|number|boolean} The question's validated answer value.
     */    
    validate(answer) {
        if (answer === null) { return null;}
        switch (this.answerType) {
            case "string":
                return this.validateString(answer);
            case "number":
                return this.validateNumber(answer);
            case "boolean":
                return this.validateBool(answer);
            default:
                console.error('Invalid answer type requested in question')
        }
    }

    /**
     * Check a string to ensure if complies with the questions validation criteria for its `pattern`, `min` length and `max` length
     * @param {string} answer The string prompt entered by the user
     * @returns {string} The validated string if meets validation criteria or `null` if it doesn't
     */
    validateString(answer) {
        answer = answer.toLowerCase().trim();
        if (answer === "" || !this.pattern.test(answer))  {
            alert("Need a valid answer");
            return null;
        }
        else if (answer.length < this.min) {
            alert(`Needs to be more than ${this.min - 1} characters`);
            return null;
        }
        else if (answer.length > this.max) {
            alert(`Needs to be less than ${this.max + 1} characters`);
            return null;
        }
        else {
            return answer;
        }
    }

    /**
     * Check a `prompt`'s answer when a validated integer number is required.
     * @param {string} answer The string prompt entered by the user.
     * @returns {number} The validated number that meets validation criteria or `null` if it doesn't.
     */
    validateNumber(answer) {
        const num = parseInt(answer);
        if (isNaN(num)) { alert("Need to enter a number."); return null; }
        if (num < this.min) {
            alert(`Needs to be more than ${this.min - 1}`);
            return null;
        }
        else if (num > this.max) {
            alert(`Needs to be less than ${this.max + 1}`);
            return null;
        }
        else {
            return num;
        }
    }

    /**
     * Validates a prompt's answer to confirm it's Boolean nature
     * @param {string} answer The `prompt` answer.
     * @returns {boolean} `true` if affirmative, `false` if negative or `null` if neither 
     */
    validateBool(answer) {
        const affirmative = /y|yes|true/i;
        const negative = /n|no|false/i;
        if (affirmative.test(answer)) { return true; }
        if (negative.test(answer)) { return false; }
        alert("Answer needs to be Yes or No.")
        return null;
    }
}
