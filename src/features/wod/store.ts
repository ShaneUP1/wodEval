import { useCallback } from 'react';
import { create } from 'zustand';

import { WodDetails } from '../../interfaces/wodInterfaces';

type Store = {
    wods: WodDetails[];
    isLoaded: boolean;
    getWods: () => void;
    updateWods: (data: WodDetails[]) => void;
};

const useWodStore = create<Store>((set) => {
    return {
        wods: [],
        isLoaded: false,
        getWods: () => {
            try {
                const stringyStorageData = localStorage.getItem('Wods Data');
                if (stringyStorageData) {
                    set(() => {
                        return {
                            wods: JSON.parse(stringyStorageData),
                            isLoaded: true
                        };
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        updateWods: (data) => {
            try {
                localStorage.setItem('Wods Data', JSON.stringify(data));
                set(() => {
                    return {
                        wods: data
                    };
                });
            } catch (e) {
                console.log(e);
            }
        }
    };
});

export const useWodData = () => {
    const isLoaded = useWodStore((state) => { return state.isLoaded; });
    const wods = useWodStore((state) => { return state.wods; });
    const getWods = useWodStore((state) => { return state.getWods; });
    const updateWods = useWodStore((state) => { return state.updateWods; });

    if (!isLoaded) {
        getWods();
    }

    const updateWodDetails = useCallback((wod: WodDetails) => {
        // if (!isLoaded) return null;
        const prevWodDataIndex = wods.findIndex((wodInStorage) => {
            return wodInStorage.id === wod.id;
        });

        // if wod data is already in storage, replace it with new data
        if (prevWodDataIndex >= 0) {
            updateWods(wods);
            wods[prevWodDataIndex] = wod;
        } else if (wods.length) {
            // if there is dataInStorage but not for this specific wod, create it and keep old data
            const updatedWodState = [...wods, wod];
            updateWods(updatedWodState);
        } else {
            updateWods([wod]);
        }

        return null;
    }, [updateWods, wods]);

    return {
        isLoaded,
        wods,
        getWods,
        updateWodDetails
    };
};
