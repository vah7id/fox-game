import { Animal } from "../types/animal";

/**
 * Shuffles the elements of an array using the Fisher-Yates algorithm.
 * @param array The array to shuffle.
 * @returns The shuffled array.
 */

const shuffleArray = (array: Animal[]) => {
    // Map each element of the array to an object with a random sort value
    // Sort the array of objects based on the random sort values
    // Map the sorted array of objects back to the original values
    let shuffled = array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    return shuffled;
};

export {
    shuffleArray
}