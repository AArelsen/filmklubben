import type { CollectionConfig } from "payload" 

export const FilmReviews: CollectionConfig = {
    slug: "film-reviews",
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            label: "Tittel",
        },
        {
            name: "movieTitle",
            type: "text",
            required: true,
            label: "Filmtittel",
        },
        {
            name: "director",
            type: "text",
            required: true,
            label: "Regissør",
        },
        {
            name: "duration",
            type: "number",
            required: true,
            min: 1,
            label: "Spilletid (minutter)",
        },
        {
            name: "ageLimit",
            type: "number",
            required: true,
            min: 0,
            label: "Aldersgrense",
        },
        {
            name: "cast",
            type: "text",
            required: true,
            label: "Hovedroller",
        },
        {
            name: "rating",
            type: "number",
            required: true,
            min: 1,
            max: 6,
            label: "Terningkast",
            validate: (value: number | null | undefined) => {
                if (value == null) return "Velg en ternningkast."
                
                if(!Number.isInteger(value)) {
                    return "Terningkast må være et helt tall."
                }
                if(value < 1 || value >6) {
                    return "Terningkast må være mellom 1 og 6."
                }
                
                return true
            },
        },
        {
            name: "content",
            type: "richText",
            required: true,
            label: "Innhold",
        },
        {
            name: "author",
            type: "relationship",
            relationTo: "users",
            required: true,
            label: "Forfatter",
        },

        {
            name: "publishedAt",
            type: "date",
            required: true,
            label: "Publiseringsdato",
            admin: {
                date:  {
                    pickerAppearance: "dayAndTime",
                },
            },
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            label: "URL-navn",
        },
        {
           name: "image",
           type: "upload",
           relationTo: "media",
           required: true,
           label: "Anmeldelsesbilde", 
        },
        {
            name: "excerpt",
            type: "textarea",
            label: "Kort omtale",
        },
    ],
}