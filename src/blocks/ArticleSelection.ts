import type { Block } from "payload"

export const ArticleSelection: Block = {
    slug: "articleSelection",
    labels: {
        singular: "Artikkelutvalg",
        plural: "Artikkelutvalg",
    },
    fields: [
        {
            name: "articles",
            type: "relationship",
            relationTo: "articles",
            hasMany: true,
            required: true,
            label: "Artikler",
        },
    ],
}