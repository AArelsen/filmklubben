import { getPayload } from "payload";
import { notFound } from "next/navigation";
import config from "@/payload.config"
import { RichText } from "@payloadcms/richtext-lexical/react";

export const dynamic = "force-dynamic"

type ReviewPageProps = {
    params: Promise<{ slug: string}>
}

export default async function ReviewPage({ params}: ReviewPageProps){
    const { slug } = await params
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: "film-reviews",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 2,
    })

    const review = result.docs[0]

    if(!review) notFound()
    return (
        <article className="review-selection">
            <h1>{review.title}</h1>

            {review.author && typeof review.author === "object" && (
               <p>Skrevet av {review.author.name}</p> 
            )}

            <p>
                Publisert{" "}
                <time dateTime={review.updatedAt}>
                    {new Date(review.updatedAt).toLocaleDateString("no-NO", {

                        day:"numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "Europe/Oslo",
                    })}
                </time>
            </p>
            
            <section className="movie-facts" aria-label="Filmfakta">
                <h2>{review.movieTitle}</h2>

                <dl>
                    <dt>Terningkast</dt>
                    <dd>{review.rating} av 6</dd>

                    <dt>Regissør</dt>
                    <dd>{review.director}</dd>

                    <dt>Spilletid</dt>
                    <dd>{review.duration} minutter</dd>

                    <dt>Aldersgrense</dt>
                    <dd>{review.ageLimit} år</dd>

                    <dt>Hovedroller</dt>
                    <dd>{review.cast}</dd>
                </dl>

            </section>
            <RichText data={review.content}/>
        </article>
    )
}
