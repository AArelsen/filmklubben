import { getPayload } from "payload"
import config from '@/payload.config'
import Image from "next/image"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const payload = await getPayload({ config })
  
  const homepage = await payload.findGlobal({
    slug: "homepage",
    depth: 2,
  })

  return (
    <div>
      <h1>Filmklubben Rulletekst</h1>
      {homepage.layout?.map((block) => {
        if (block.blockType === 'filmEventBanner') {
          const event = block.event

          if(!event || typeof event !== 'object') return null

          return(
            <section key={block.id} className="event-banner">
              {event.image &&
                typeof event.image === "object" &&
                event.image.url && (
                  <Image
                  src= {event.image.url}
                  alt= {event.image.alt}
                  width={event.image.width ?? 1200}
                  height={event.image.height ?? 800}
                  />
                )}
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <Link href={'/events/' + event.slug}>
                Les mer om filmkvelden
              </Link>
            </section>
          )
        }

        if(block.blockType === "articleSelection"){
          return (
            <section key={block.id} className="article-selection">
              <h2>Artikler</h2>
                <div className="article-grid">
                  {block.articles.map((article)=>{
                    if(typeof article !== "object" || !article) return null

                    return(
                      <article key={article.id} className="article-card">
                        {article.image &&
                        typeof article.image === "object" &&
                        article.image.url && (
                          <Image
                          src={article.image.url}
                          alt={article.image.alt}
                          width={article.image.width ?? 800}
                          height={article.image.height ?? 600}
                        />
                        )}
                        <h3>
                          <Link href={'/articles/' + article.slug}>
                            {article.title}
                          </Link>
                        </h3>
                      </article>
                    )
                  })}
              </div>
              
            </section>
          )
        }
        if(block.blockType === "reviewSelection"){
          return (
            <section key={block.id} className="review-selection">
              <h2>Filmanmeldelser</h2>
                <div className="review-grid">  
                    {block.reviews.map((review) => {
                      if(!review || typeof review !== "object") return null
                      
                      return(
                        <article key={review.id} className="review-card">
                          {review.image && 
                            typeof review.image === "object" &&
                            review.image.url && (
                              <Image
                                src= {review.image.url}
                                alt= {review.image.alt}
                                width={review.image.width ?? 800}
                                height={review.image.height ?? 600}
                              />
                            )}
                          <h3>
                            <Link href= {'/reviews/' + review.slug}>
                              {review.title}
                            </Link>
                          </h3>
                          {review.excerpt && <p>{review.excerpt}</p>}
                        </article>
                      )
                    })}
                  </div>
            </section>
          )
        }
        return null
      })}
    </div>
  )
}
