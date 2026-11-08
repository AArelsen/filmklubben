import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
    slug: "articles",
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
            name: "subtitle",
            type: "text",
            required: true,
            label: "Undertittel"
        },
        {
            name: "slug",
            type: "text",
            unique: true,
            required: true,
            label: "URL-navn"
        },
        {
            name: "content",
            type: "richText",
            required: true,
            label: "Innhold"
        },
        {
            name: "autor",
            type: "relationship",
            relationTo: "users",
            required: true,
            label: "Forfatter"
        },
        {
            name: "publishedAt",
            type: "date",
            required: true,
            label: "Publiseringsdato",
            admin: {
                date: {
                    pickerAppearance: "dayAndTime",
                },
            },
        },
        {
            name: "image",
            type: "upload",
            required: true,
            relationTo: "media",
            label: "Artikkelbilde"
        }
    ],

}