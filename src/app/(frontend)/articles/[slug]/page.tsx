import { getPayload } from "payload";
import { notFound } from "next/navigation";
import config from "@/payload.config"
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";

export const dynamic = "force-dynamic"

type ArticlePageProps = {
    params: Promise<{ slug: string}>
}

export default async function ArticlePage({params}: ArticlePageProps) {
    const { slug } = await params
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: "articles",
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 2,
    })
    
    const article = result.docs[0]

    if(!article) notFound()
    
    return(
        <article className="article-selection">
            <h1>{article.title}</h1>
            <p>{article.subtitle}</p>

            {article.autor &&
                typeof article.autor === "object" &&
                article.autor.profilePhoto &&
                typeof article.autor.profilePhoto === "object" &&
                article.autor.profilePhoto.url && (
                <Image
                    src={article.autor.profilePhoto.url}
                    alt={article.autor.profilePhoto.alt}
                    width={64}
                    height={64}
                    className="author-photo"
                />    
            )}

            {article.autor && typeof article.autor === "object" && (
             <p>Skrevet av {article.autor.name}</p>   
            )}

            <p>
                Publisert {' '}
                <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString('nb-NO', {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "Europe/Oslo"                        
                    })}
                </time>
            </p>
            <RichText data={article.content} />
        </article>
    )
}
    