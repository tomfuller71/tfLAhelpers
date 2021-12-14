// @ts-check
/**
 * Capitalizes the first character of a string
 * @param {string } string
 */
 function capitalize(string) {
    if (string.length === 0 || typeof string !== 'string') return "";
    return string[0].toUpperCase() + string.slice(1)
}

export default capitalize;
