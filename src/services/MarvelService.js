import { useHttp } from "../hooks/http.hook"; 

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = 'apikey=061d017f7244ea5abde010c88ab53e59';
    const _baseOffset = '210'

    const getComics = async (offset = _baseOffset) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&&offset=${offset}&${_apikey}`)
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apikey}`);
        return _transformComics(res.data.results[0]);
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`)
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        clearError()
        const res = await request(`${_apiBase}characters/${id}?${_apikey}`)
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {

        if (!char.description) {
            char.description = 'This character have not description'
        } 
        if (char.description.length > 200) {
            char.description = char.description.slice(0, 200) + '...';
        }

        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki:char.urls[1].url,
            comics: char.comics.items
        }
    }

        const _transformComics = (comics) => {

            if (!comics.description) {
                comics.description = 'This character have not description'
            } 
            if (comics.description.length > 200) {
                comics.description = comics.description.slice(0, 200) + '...';
            }
    
            return {
                id: comics.id,
                name: comics.title,
                description: comics.description,
                pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
                thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
                homepage: comics.urls[0].url,
                language: comics.textObjects.language || 'en-us',
                price: comics.prices[0].price,
            }
    }
    return {loading, error, clearError, getAllCharacters, getCharacter, getComics, getComic}
}
export default useMarvelService;