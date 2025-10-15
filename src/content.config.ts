import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

function uMap(url: string) {
    return async () => {
        let sona = await fetch(url);
        let sonaJson = await sona.json();
        return sonaJson.features;
    };
}

const jan = defineCollection({
    loader: uMap('https://umap.openstreetmap.fr/en/datalayer/1114317/28d555dc-de5d-42e3-a44e-141c418562dc/'),
    schema: z.object({
        geometry: z.object({
            coordinates: z.number().array(),
        }),
        properties: z.object({
            name: z.string(),
            description: z.string(),
        }),
    }),
})

export const collections = { jan };
