'use server'


import { getPayload } from "payload"
import config from "@/payload.config"
import type { FilmEvent } from "@/payload-types"
import type { RegistrationState } from "./registration-types"

export async function registerForEvent(
    eventId: FilmEvent['id'],
    _previousState: RegistrationState,
    formData: FormData,
): Promise<RegistrationState> {
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim().toLowerCase()
    const ageValue = String(formData.get('age') ?? '').trim()
    const age= Number(ageValue)

    if(!name || !email || !ageValue || !Number.isInteger(age) || age < 0) {
        return {
            success: false,
            message: "Fyll inn navn, e-post og en gyldig alder.",
        }
    }

try {
    const payload = await getPayload({ config })


    await payload.findByID({
        collection: "film-events",
        id: eventId,
        depth: 0,
    })

    await payload.create({
        collection: "registrations",
        overrideAccess: true,
        data: {
            name,
            email,
            age,
            event: eventId,
        },
    })

    return{
        success: true,
        message: "Du er påmeldt filmkvelden!",
    }
} catch {
        return {
            success: false,
            message:
            "Påmeldingen kunne ikke lagres. Kontroller opplysningene. Du kan allerede være påmeldt.",
        }  
    }
}