import Link from "next/link"

export default function NotFound(){
    return (
        <section className="article-selection">
            <h1>Siden finnes ikke</h1>
            <p>Vi fant ikke siden du leter etter.</p>
            <Link href="/">Til forsiden</Link>
        </section>
    )
}