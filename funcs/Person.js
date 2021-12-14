//@ts-check
import capitalize from './capitalize.js';
/**
 * A `Person` with `firstName` and `lastName` properties. Both first and last names are automatically capitalized.
 * @constructor accepts either one string which will treat the last separated word as the `lastName`, and the rest as the `firstName`, or optionally can accept a separate first and last names.
 */
class Person {
    /**
     * @param {string} firstName
     */
    constructor(firstName, lastName = "") {
        if(typeof firstName !== "string" || firstName === "") {
            throw Error("Can't initialize without firstName")
        }

        if (arguments.length === 1) {
            this.fullName = firstName;
        }
        else {
            this.firstName = capitalize(firstName);
            this.lastName = capitalize(lastName);
        }
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(newName) {
        const nameParts = newName.trim().split(" ");
        this.lastName = capitalize(nameParts.pop());
        this.firstName = nameParts.map(s => capitalize(s)).join(" ");
    }
}
export default Person;