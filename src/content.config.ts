import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

function uMap(url: string) {
    return async () => {
        let sona = await fetch(url);
        let sonaJson = await sona.json();
        // ala li lon insa pi poki Properties la mi weka e ijo pi poki ni
        return sonaJson.features.filter(ijo => Object.keys(ijo.properties).length);
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
