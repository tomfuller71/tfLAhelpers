/**
 * Class that contains various methods that help working with strings.
 */
 export default class Str {
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


        const predicate = (a, b) => {
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