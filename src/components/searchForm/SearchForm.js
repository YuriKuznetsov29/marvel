import { useState } from 'react';
import { Link} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { ErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService';
import * as Yup from 'yup';

import './SearchForm.scss';

const SearchForm = () => {
    const [char, setChar] = useState(null);
    //const [startFind, setStartFind] = useState(false);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
            
            setChar(char);
            console.log(char);
        

    }

    const updateChar = (name) => {
        clearError()
        getCharacterByName(name)
            .then(onCharLoaded)
            

    }

    // const findResult = () => {
    //     if (startFind && !char.name && !loading) {
    //         return (
    //             <label 
    //                 className="char__search-label" 
    //                 htmlFor="charName">
    //                 The character was not found. Check the name and try again
    //             </label>
    //         ) 
    //     } if (char.name && !loading) {
    //         return <FindResult char={char}/>
    //     } else {
    //         return null
    //     }
    // }

    // const content = findResult();

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__search-form">
        <Formik
        initialValues = {{
            charName: '',
        }}
        validationSchema = {Yup.object({
            charName: Yup.string()
            .required('This field is required')
        })}
        onSubmit = { ({charName}) => {
            updateChar(charName);
        }}
        >
            {({ values }) => (
                <Form>
                    
                        <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                        
                        <div className="char__search-wrapper">
                            <div>
                            <Field 
                                        id="charName" 
                                        name='charName' 
                                        type='text' 
                                        placeholder="Enter name"
                                        />
                            
                                <button 
                                    type='submit' 
                                    className="button button__main"
                                    disabled={loading}
                                    >
                                    <div className="inner">find</div>
                                </button>
                            </div>
                            <FormikErrorMessage className="char__search-error" name="charName" component="div"/>

                            
                                
                        </div>
                    
                </Form>
            )}
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

// const FindResult = ({char}) => {

//     return (
//         <>
//             <label className="char__search-label" htmlFor="charName">{`There is! Visit ${char.name} page?`}</label>
//             <Link to={`/character/${char.id}`}>
//                 <button
//                     type='submit' 
//                     className="button button__secondary">
//                     <div className="inner">Go to</div>
//                 </button>
//             </Link>
//         </>
//     )
// }

export default SearchForm;