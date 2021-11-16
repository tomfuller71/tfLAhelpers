 // @ts-check
/**
 * Ask a question via the prompt and have the answer validated.
 */
class Question {
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
            answer = this.#validate(prompt(this.question));
        } while (answer === null)
        return answer;
    }

    /**
     * Validates a `prompt`'s string answer value based on the `Question.answerType`, and associated question criteria.
     * @param {string} answer the question answer to be validated. 
     * @returns {string|number|boolean} The question's validated answer value.
     */    
    #validate(answer) {
        if (answer === null) { return null;}
        switch (this.answerType) {
            case "string":
                return this.#validateString(answer);
            case "number":
                return this.#validateNumber(answer);
            case "boolean":
                return this.#validateBool(answer);
            default:
                console.error('Invalid answer type requested in question')
        }
    }

    /**
     * Check a string to ensure if complies with the questions validation criteria for its `pattern`, `min` length and `max` length
     * @param {string} answer The string prompt entered by the user
     * @returns {string} The validated string if meets validation criteria or `null` if it doesn't
     */
    #validateString(answer) {
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
    #validateNumber(answer) {
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
    #validateBool(answer) {
        const affirmative = /y|yes|true/i;
        const negative = /n|no|false/i;
        if (affirmative.test(answer)) { return true; }
        if (negative.test(answer)) { return false; }
        alert("Answer needs to be Yes or No.")
        return null;
    }
}

export default Question;