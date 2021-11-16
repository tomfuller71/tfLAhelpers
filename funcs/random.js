//@ts-check
/**
 * Returns a random integer number between of min `lower` and max `upper`
 * @param {number} lower The lowest possible integer value
 * @param {number} upper The highest possible integer value
 * @returns {number} A random integer value
 */
function random(lower, upper) {
    return lower + Math.floor( Math.random() * (upper + 1 - lower) );
}
export default random;