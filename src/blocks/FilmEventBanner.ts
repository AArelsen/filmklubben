import type { Block } from "payload"

export const FilmEventBanner : Block = {
    slug: "filmEventBanner",
    labels: {
        singular: "Filmkveldbanner",
        plural: "FilmkveldBannere",
    },
    fields: [
        
        {
            name: "event",
            type: "relationship",
            relationTo: "film-events",
            required: true,
            label: "Filmkveld", 
        },
    ],
} 