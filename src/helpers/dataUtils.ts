import { WodDetails } from '../interfaces/wodInterfaces';

/**
 * Fetches wod from localStorage and converts it to an object
 * @param key incoming number id of wod
 * @returns JSON object
 */
export const getFromStorage = (key: string): WodDetails | null => {
    if (key) {
        return JSON.parse(localStorage.getItem(key) as string);
    }
    return null;
};
