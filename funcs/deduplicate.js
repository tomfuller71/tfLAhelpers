/**
 * Creates a shallow copy of unique items in an array
 * @param {any[]} sortedArray The array to be deduped - must be sorted!
 * @returns The de-duplicated array...
 */
function deduplicate(sortedArray) {
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

export default deduplicate;