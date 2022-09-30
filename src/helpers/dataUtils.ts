/**
 * Fetches wod from localStorage and converts it to an object
 * @param wodKey incoming number id of wod
 * @returns JSON object
 */
export const getWodFromStorage = (wodKey: string) => {
    return JSON.parse(localStorage.getItem(wodKey) as string);
};
