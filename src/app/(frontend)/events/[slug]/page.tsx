import { getPayload } from "payload";
import { notFound } from "next/navigation";
import config from "@/payload.config";
import Image from "next/image"
import RegistrationForm from "./RegistrationForm";

export const dynamic = "force-dynamic"

type EventPageProps = {
    params: Promise<{ slug: string }>
}

export default async function EventPage({params}: EventPageProps) {
    const { slug } = await params
    const payload = await getPayload({ config})

    const result = await payload.find({
        collection: "film-events",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 1,
    })

    const event = result.docs[0]

    if(!event) notFound()
    
    return (
        <article className="event-banner">
            {event.image && 
                typeof event.image === "object" &&
                event.image.url && (
                    <Image
                        src = {event.image.url}
                        alt = {event.image.alt}
                        width={event.image.width ?? 1200}
                        height={event.image.height ?? 800}
                    />
                )    
            }
            <h1>{event.title}</h1>

            <p>
                <time dateTime={event.eventDate}>
                    {new Date(event.eventDate).toLocaleDateString("nb-NB", {
                       day: "numeric",
                       month: "long",
                       year: "numeric",
                       hour: "2-digit",
                       minute: "2-digit",
                       timeZone: "Europe/Oslo",
                    })}
                </time>
            </p>

            <p>{event.description}</p>

            <section aria-labelledby="registration-heading">
                <h2 id="registration-heading"> Meld deg på filmkvelden</h2>
                <RegistrationForm eventId={event.id}/>
            </section>
        </article>
    )
}