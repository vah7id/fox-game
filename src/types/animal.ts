export interface Animal {
    image: string;
    type: AnimalTypes;
}

export type AnimalTypes = 'fox' | 'cat' | 'dog';