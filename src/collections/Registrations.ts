import type { CollectionConfig } from "payload"

export const Registrations: CollectionConfig = {
    slug: "registrations",
    indexes: [
        {
            fields: ["email", "event"],
            unique: true,
        },
    ],
    admin: {
        useAsTitle: "name", 
    },
    access: {
        create: ({ req }) => Boolean(req.user),
        read: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
    },
    fields: [
        {
        name: "name",
        type: "text",
        required: true,
        label: "Navn",
        },
        {
            name: "email",
            type: "email",
            required: true,
            label: "E-post",
                hooks: {
                    beforeValidate: [
                        ({ value }) => {
                            return typeof value === "string"
                                ? value.trim().toLowerCase()
                                : value
                        },
                    ],
                },
        },
        {
            name: "age",
            type: "number",
            required: true,
            min: 0,
            label: "Alder",
            validate: (value: number | null | undefined) => {
                if (value == null) return "Oppgi alder."

                if (!Number.isInteger(value) || value < 0) {
                    return "Alder må være et helt tall som er 0 eller høyere."
                }
                    return true
            },
        },
        {
            name: "event",
            type: "relationship",
            relationTo: "film-events",
            required: true,
            label: "Filmkveld",
        }
    ],
}