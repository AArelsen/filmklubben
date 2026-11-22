import { getPayload } from "payload";
import Link from "next/link";
import config from "@payload-config";
import Image from "next/image";

export const dynamic = "force-dynamic"

type ArticlesPageProps={
    searchParams: Promise<{ page?: string | string[]}>
}   

export default async function ArticlesPage( {
    searchParams,
}: ArticlesPageProps) {
    const params = await searchParams
    const requestedPage = Number(params.page)
    const page =
        Number.isSafeInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1

    const payload = await getPayload ({ config })

    const articles = await payload.find({
        collection: "articles",
        sort: "-publishedAt",
        limit: 6,
        page,
        depth: 1, 
    })

    return (
        <section className="article-selection">
            <h1>Artikler</h1>

            {articles.docs.length === 0 && <p>Ingen artikler ennå.</p>}
            <div className="article-grid">
                {articles.docs.map((article) => (
                    <article key= {article.id} className="article-card">
                        {article.image &&
                            typeof article.image === "object" &&
                            article.image.url && (
                                <Image
                                    src= {article.image.url}
                                    alt= {article.image.alt}
                                    width={article.image.width ?? 800}
                                    height={article.image.height ?? 600}
                                />
                        )}

                        <h2>
                            <Link href={'/articles/' + article.slug}>
                            {article.title}
                            </Link>
                        </h2>
                        <p>{article.subtitle}</p>
                    </article>
                ))}
            </div>

            <nav aria-label="Artikkelsider">
                {articles.hasPrevPage && (
                   <Link href={'/articles?page=' + articles.prevPage}>
                        Forrige side
                   </Link>
                )}

                <p>
                    Side {articles.page} av {articles.totalPages}
                </p>

                {articles.hasNextPage && (
                  <Link href={'/articles?page=' + articles.nextPage}>
                    Neste side
                  </Link>  
                )}
            </nav>
        </section>
    )
}