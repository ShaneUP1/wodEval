/* eslint-disable no-console */
import { WodDetails } from '../interfaces/wodInterfaces';

/**
 * Sets state into localStorage
 * @param wodDetails wodDetail array
 */
export const updateWodStorageState = (data: WodDetails[]) => {
    try {
        localStorage.setItem('Wods Data', JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
};

/**
 * Gets state from localStorage
 * @returns WodDetails array
 */
export const fetchWodStorageState = (): WodDetails[] => {
    try {
        const stringyStorageData = localStorage.getItem('Wods Data');
        if (stringyStorageData) {
            return JSON.parse(stringyStorageData);
        }
    } catch (e) {
        console.log(e);
    }
    return [];
};
