import Axios, { AxiosPromise } from "axios";
import { Autocomplete, Search } from "models";

export const axios = Axios.create({
    baseURL: "/news"
})

export default {
    autocomplete: (term: string): AxiosPromise<{autocompletes: Autocomplete[]}> => {
        return axios.get('/autocompletes', {
            headers: {
                'Content-Type': 'application/json',
                'X-AYLIEN-NewsAPI-Application-ID': 'f562734b',
                'X-AYLIEN-NewsAPI-Application-Key': '242d78e610884df2e931d0d94a99446a',
            },
            params: {
                type: 'dbpedia_resources',
                term: term,
                language: 'en',
                perPage: 10
            }
        })
    },
    search: (term: string): AxiosPromise<Search> => {
        return axios.get('/stories', {
            headers: {
                'Content-Type': 'application/json',
                'X-AYLIEN-NewsAPI-Application-ID': 'f562734b',
                'X-AYLIEN-NewsAPI-Application-Key': '242d78e610884df2e931d0d94a99446a',
            },
            params: {
                type: 'dbpedia_resources',
                "entities.surface_forms.text": [term],
                language: 'en',
                perPage: 25
            }
        })
    }
}
