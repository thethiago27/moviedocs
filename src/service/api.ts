import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})

interface FetcherInterface {
    patch: string;
    query?: string
}

export const fetcher = async ({patch, query}: FetcherInterface) => {

    const response = await api.get(`${patch}?api_key=${process.env.API_KEY}&${query}`)
    return response.data
}