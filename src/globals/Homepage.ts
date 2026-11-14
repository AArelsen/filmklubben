import type { GlobalConfig } from "payload"
import { FilmEventBanner } from "../blocks/FilmEventBanner"
import { ArticleSelection } from "../blocks/ArticleSelection"
import { ReviewSelcetion  } from "../blocks/ReviewSelection"
export const Homepage: GlobalConfig = {
    slug: "homepage",
    label: "Forside",
    fields: [
        {
            name: "layout",
            type: "blocks",
            label: "Innhold",
            blocks: [FilmEventBanner, ArticleSelection, ReviewSelcetion],
        },
    ],
}