export interface Autocomplete {
    id: string
    text: string
}

export interface Story {
    author: {
        id: number
        name: string
    }
    body: string
    categories: Array<{
        confident: boolean
        id: string
        label: string
        level: number
        score: number
        taxonomy: string
        links: {
            parent: string
            self: string
        }
    }>
    industries: string[]
    characters_count: number
    clusters: number[]
    entities: Array<{
        body: Array<{
                id: string
                types: string[]
                sentiment: {
                    polarity: string
                    confidence: number
                }
                surface_forms: [
                    {
                        text: string
                        indices: number[][]
                        frequency: number
                    }
                ]
                prominence_score: number
            }>
    }>
    hashtags: string[]
    id: number
    keywords: string[]
    language: string
    links: {
        permalink: string
        related_stories: string
        clusters: string
    }
    media: Array<{
        content_length: number
        format: string
        height: number
        type: string
        url: string
        width: number
    }>
    paragraphs_count: number
    published_at: string
    sentences_count: number
    sentiment: {
        body: {
            polarity: string
            score: number
        }
        title: {
            polarity: string
            score: number
        }
    }
    social_shares_count: {
        facebook: number[]
        google_plus: number[]
        linkedin: number[]
        reddit: number[]
    }
    source: {
        domain: string
        home_page_url: string
        id: number
        locations: [
            {
                city: string
                country: string
                state: string
            }
        ]
        name: string
        rankings: {
            alexa: Array<
                {
                    fetched_at: string
                    rank: number
                }>
        }
        scopes: Array<
            {
                level: string
            }
        >
    }
    summary: {
        sentences: string[]
    }
    title: string
    words_count: number
    license_type: number
}

export interface Search {
    stories: Story[]
    next_page_cursor: string
    'published_at.start': string
}
