import type { Block } from "payload"

export const ReviewSelcetion: Block = {
    slug: "reviewSelection",
    labels: {
        singular: "Anmeldelsesutvalg",
        plural: "Anmeldelsesutvalg",
    },
    fields:  [
        {
            name: "reviews",
            type: "relationship",
            relationTo: "film-reviews",
            hasMany: true,
            required: true,
            label: "Filmanmeldelser",
        },
    ],
}