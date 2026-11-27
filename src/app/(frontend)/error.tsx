'use client'

export default function ErrorPage({
    reset,

}:{
    reset:() => void
}) {
    return (
        <section className="article-selection" role="alert">
            <h1>Noe gikk galt</h1>
            <p>Vi kunne ikke laste inn siden. Prøv igjen.</p>
            <button type="button" onClick={() => reset}>
                Prøv igjen
            </button>
        </section>
    )
}