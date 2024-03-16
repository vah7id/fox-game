import { useQuery } from "@tanstack/react-query";
import { shuffleArray } from "../utils/array";
import { Animal } from "../types/animal";
import { CAT_API_URL, DOG_API_URL, FOX_API_URL } from "../types/api";

const CACHE_KEY_ID = "ANIMALS"; // Unique Id to invalid the query cache

type AnimalQueryProps = {
    enabled: boolean;
}

export const useAnimalsQuery = ({ enabled }: AnimalQueryProps) => {

    const fetchAnimals = async (): Promise<Animal[]> => {
        const foxResponse = await fetch(FOX_API_URL);
        const foxData = await foxResponse.json();
        const fox: Animal = { image: foxData.image, type: 'fox' };

        const dogResponse = await fetch(DOG_API_URL);
        const dogData = await dogResponse.json();
        const dogs: Animal[] = dogData.map((dog: any) => ({ image: dog.url, type: 'dog' })).slice(0, 4);

        const catResponse = await fetch(CAT_API_URL);
        const catData = await catResponse.json();
        const cats: Animal[] = catData.map((cat: any) => ({ image: cat.url, type: 'cat' })).slice(0, 4);

        let allAnimals: Animal[] = [fox, ...dogs, ...cats];

        allAnimals = shuffleArray(allAnimals).slice(0, 9);

        // Prefetching images 
        const imagePromises = allAnimals.map(animal => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject();
                img.src = animal.image;
            });
        });

        await Promise.all(imagePromises);

        return allAnimals;
    };

    return useQuery<Animal[]>({
        queryKey: [CACHE_KEY_ID],
        queryFn: fetchAnimals,
        enabled,
    });
};