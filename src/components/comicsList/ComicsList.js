import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getComics} = useMarvelService();

    useEffect(() => {
        onRequest(true);
    }, [])

    const onRequest = (initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true) 
        getComics()
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let end = false;
        if (newCharList.length < 9) {
            end = true;
        }
        
        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(end);

    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li className="comics__item" key={item.id}>
                    <a href={item.homepage}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{`${item.price}$`}</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                 {items}   
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
            style={{'display': charEnded ? 'none' : 'block'}}
            disabled={newItemLoading}
            onClick={() => {onRequest()}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;