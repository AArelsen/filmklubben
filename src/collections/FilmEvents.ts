import type { CollectionConfig } from "payload"

export const FilmEvents: CollectionConfig = {
    slug: "film-events",
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name:  "title",
            type: "text",
            required: true,
            label: "Tittel",
        },
        {
            name: "descriprion",
            type: "text",
            required: true,
            label: "Beskrivelse",
        },
        {
            name: "eventDate",
            type: "date",
            required: true,
            label: "Dato og klokkeslett",
            admin: {
                date: {
                    pickerAppearance: "dayAndTime",
                },
            },
        },
        {
            name: "slug",
            type: "text",
            unique: true,
            required: true,
            label: "URL-navn",
        },
        {
            name: "image",
            type: "upload",
            required: true,
            relationTo: "media",
            label: "Arrangementsbilde",
        },
    ],
}