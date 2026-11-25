"use client"

import type { FilmEvent } from "@/payload-types"
import { useActionState } from "react"
import { registerForEvent } from "./actions"
import { initialRegistrationState } from "./registration-types"


type RegistrationFormProps = {
    eventId: FilmEvent["id"]
}

export default function RegistrationForm({
    eventId,
}: RegistrationFormProps) {
    const register= registerForEvent.bind(null, eventId)

    const [state, formAction, pending] = useActionState(
        register,
        initialRegistrationState,
    )

    return (
        <form className="registration-form" action={formAction}>
                    <div>
                        <label htmlFor="registration-name">Navn</label>
                        <input
                            id="registration-name"
                            name= "name"
                            type="text"
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="registration-email">E-post</label>
                        <input
                            id="registration-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="registration-age">Alder</label>
                        <input
                            id="registration-age"
                            name="age"
                            type="number"
                            min="0"
                            step="1"
                            required
                        />
                    </div>

                    <button type="submit" disabled={pending}>
                        
                        {pending ? 'Sender påmelding...' : 'Meld deg på'}
                    </button>

                    <p role="status" aria-live="polite">
                        {state.message}
                    </p>
                </form>
    )
}