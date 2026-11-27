import { getPayload } from 'payload'
import config from '../src/payload.config'
import path from 'node:path'
import { demoRichText } from './demo-rich-text'

const password = process.env.DEMO_PASSWORD

if (!password || password.length < 12) {
  throw new Error('Sett DEMO_PASSWORD med minst 12 tegn i .env.')
}

const payload = await getPayload({ config })

try {
    const existingMedia = await payload.find({
    collection: 'media',
    where: {
      filename: { equals: 'cinema.png' },
    },
    limit: 1,
    depth: 0,
  })

  if (existingMedia.docs.length === 0) {
    await payload.create({
      collection: 'media',
      data: {
        alt: 'Illustrasjon med Filmklubben Rulletekst og slagordet.',
      },
      filePath: path.resolve('demo-assets/cinema.png'),
    })
  }
    const mediaResult = await payload.find({
    collection: 'media',
    where: {
      filename: { equals: 'cinema.png' },
    },
    limit: 1,
    depth: 0,
  })

  const demoImage = mediaResult.docs[0]

  if (!demoImage) {
    throw new Error('Fant ikke demobildet.')
  }
  const users = [
    { name: 'Anna Demo', email: 'anna@example.com' },
    { name: 'Erik Demo', email: 'erik@example.com' },
  ]

  for (const user of users) {
    const existing = await payload.find({
      collection: 'users',
      where: {
        email: { equals: user.email },
      },
      limit: 1,
      depth: 0,
    })

        const existingUser = existing.docs[0]

    if (existingUser) {
      if (!existingUser.profilePhoto) {
        await payload.update({
          collection: 'users',
          id: existingUser.id,
          data: {
            profilePhoto: demoImage.id,
          },
        })
      }

      continue
    }

    await payload.create({
      collection: 'users',
      data: {
        ...user,
        password,
        profilePhoto: demoImage.id,
      },
    })
  }

    const annaResult = await payload.find({
    collection: 'users',
    where: {
      email: { equals: 'anna@example.com' },
    },
    limit: 1,
    depth: 0,
  })

  const anna = annaResult.docs[0]

  if (!anna) {
    throw new Error('Fant ikke Anna Demo.')
  }

  const existingArticle = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: 'demo-film-og-fellesskap' },
    },
    limit: 1,
    depth: 0,
  })

  if (existingArticle.docs.length === 0) {
    await payload.create({
      collection: 'articles',
      data: {
        title: 'Film og fellesskap',
        subtitle: 'Samtalen fortsetter etter rulleteksten.',
        slug: 'demo-film-og-fellesskap',
        content: demoRichText(
          'En film kan oppleves på mange måter. I filmklubben deler vi tankene våre etter visningen. Andres perspektiver hjelper oss å oppdage nye detaljer.',
        ),
        autor: anna.id,
        publishedAt: '2026-11-20T17:00:00.000Z',
        image: demoImage.id,
      },
    })
  }

    const erikResult = await payload.find({
    collection: 'users',
    where: {
      email: { equals: 'erik@example.com' },
    },
    limit: 1,
    depth: 0,
  })

  const erik = erikResult.docs[0]

  if (!erik) {
    throw new Error('Fant ikke Erik Demo.')
  }

  const existingReview = await payload.find({
    collection: 'film-reviews',
    where: {
      slug: { equals: 'demo-en-sommer-sammen' },
    },
    limit: 1,
    depth: 0,
  })

  if (existingReview.docs.length === 0) {
    await payload.create({
      collection: 'film-reviews',
      data: {
        title: 'En varm historie om vennskap',
        movieTitle: 'En sommer sammen',
        director: 'Kari Eksempel',
        duration: 100,
        ageLimit: 12,
        cast: 'Ola Eksempel, Nora Eksempel',
        rating: 5,
        slug: 'demo-en-sommer-sammen',
        excerpt: 'Et nært filmdrama om vennskap og nye begynnelser.',
        content: demoRichText(
          'To venner møtes igjen etter mange år. Rolige bilder og gode samtaler gir historien varme. Noen scener kunne vært kortere, men helheten gjør inntrykk.',
        ),
        author: erik.id,
        publishedAt: '2026-11-21T17:00:00.000Z',
        image: demoImage.id,
      },
    })
  }

    const existingEvent = await payload.find({
    collection: 'film-events',
    where: {
      slug: { equals: 'demo-filmkveld' },
    },
    limit: 1,
    depth: 0,
  })

  if (existingEvent.docs.length === 0) {
    await payload.create({
      collection: 'film-events',
      data: {
        title: 'Filmkveld med Rulletekst',
        description:
          'Vi ser en film sammen og møtes til en åpen samtale etterpå. Alle er velkomne til å dele sine tanker.',
        eventDate: '2026-12-11T17:00:00.000Z',
        slug: 'demo-filmkveld',
        image: demoImage.id,
      },
    })
  }

    const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 0,
  })

  if (!homepage.layout?.length) {
    const articles = await payload.find({
      collection: 'articles',
      where: {
        slug: { equals: 'demo-film-og-fellesskap' },
      },
      limit: 1,
      depth: 0,
    })

    const reviews = await payload.find({
      collection: 'film-reviews',
      where: {
        slug: { equals: 'demo-en-sommer-sammen' },
      },
      limit: 1,
      depth: 0,
    })

    const events = await payload.find({
      collection: 'film-events',
      where: {
        slug: { equals: 'demo-filmkveld' },
      },
      limit: 1,
      depth: 0,
    })

    const article = articles.docs[0]
    const review = reviews.docs[0]
    const event = events.docs[0]

    if (!article || !review || !event) {
      throw new Error('Demoinnhold mangler.')
    }

    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        layout: [
          { blockType: 'filmEventBanner', event: event.id },
          { blockType: 'articleSelection', articles: [article.id] },
          { blockType: 'reviewSelection', reviews: [review.id] },
        ],
      },
    })
  }

  console.log('Demobrukerne er klare.')
} finally {
  await payload.destroy()
}