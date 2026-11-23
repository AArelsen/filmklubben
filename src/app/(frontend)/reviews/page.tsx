import { getPayload } from "payload";
import Link from "next/link"
import config from "@payload-config"
import Image from "next/image"


export const dynamic = "force-dynamic"


type ReviewsPageProps = {
    searchParams: Promise <{page?: string | string [] }>
}

export default async function ReviewsPage({
    searchParams,
}: ReviewsPageProps) {
    const params = await searchParams
    const requestedPage = Number(params.page)

    const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1
        
    const payload = await getPayload({ config })
    
    const reviews = await payload.find({
        collection: "film-reviews",
        sort: "-publishedAt",
        limit: 1,
        page,
        depth: 1,
    })

    return (
        <section className="review-selection">
            <h1>Filmanmeldelser</h1>

            {reviews.docs.length === 0 && <p>ingen filmanmeldelser ennå.</p>}

            <div className="review-grid">
                {reviews.docs.map((review) =>(
                    <article key={review.id} className="review-card">
                        {review.image &&
                        typeof review.image === "object" &&
                        review.image.url && (
                            <Image
                                src={review.image.url}
                                alt={review.image.alt}
                                width={ review.image.width ?? 800 }
                                height={review.image.height ?? 600}
                            />
                        )}
                        <h2>
                            <Link href= {"/reviews/" + review.slug}>
                                {review.title}
                            </Link>
                        </h2>
                        {review.excerpt && <p>{review.excerpt}</p>}
                    </article>
                ))}
            </div>

            <nav aria-label="Anmeldelsessider">
                {reviews.hasPrevPage && (
                    <Link href={'/reviews?page=' + reviews.prevPage}>
                        Forrige side
                    </Link>
                )}
                <p>
                    Side {reviews.page} av {reviews.totalPages}
                </p>

                {reviews.hasNextPage && (
                    <Link href= {'/reviews?page=' + reviews.nextPage}>
                        Neste Side
                    </Link>
                )}
            </nav>
        </section>
    )
}