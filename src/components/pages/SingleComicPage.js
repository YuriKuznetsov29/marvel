import { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';
import AppBanner from '../appBanner/AppBanner';
import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const {charId} = useParams();
    const [comic, setComic] = useState(null);
    const [char, setChar] = useState({});

    const {loading, error, getComic, clearError, getCharacter} = useMarvelService();

    

    useEffect(() => {
        onContentLoading()
    }, [charId, comicId])

    const onContentLoading = () => {
        if (comicId) {
            updateComic();
        } else if (charId) {
            updateChar();
        }
    }

    const onCharLoaded = (char) => {
        setChar(char);
        console.log(char)

}

const updateChar = () => {
    getCharacter(charId)
        .then(onCharLoaded)
}

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const contentComics = !(loading || error || !comic) ? <View comic={comic}/> : null;
    const contentChar = !(loading || error || !char) ? <ViewChar char={char}/> : null;
    const content = () => {
        if (comicId) {
            return contentComics
        } else if (charId) {
            return contentChar
        }}

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content()}
            
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{`${price}$`}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

const ViewChar = ({char}) => {
    const {name, description, thumbnail} = char;

    

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to main</Link>
        </div>
    )
}

export default SingleComicPage;