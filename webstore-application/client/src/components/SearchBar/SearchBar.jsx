import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SearchBar.module.css';
import { useState } from 'react';

export default function SearchBar({setSearchterm}) {
    const [query, setQuery] = useState('');

    const handleEnterKey = (event) => {
        event.preventDefault();
        setSearchterm(query);
        console.log(query);
    };
    const handleClearSearch = () => {setSearchterm(''); setQuery('')};

    return(
        <form className={styles.searchComponent} onSubmit={handleEnterKey}>
            {query.trim() !== '' &&
                <button className={styles.clearSearchtermButton} type='button' onClick={handleClearSearch}>
                    <FontAwesomeIcon className={styles.clearSearchterm} icon="fa-solid fa-xmark" title="Clear Search" />
                </button>
            }
            <input name='searchbar' type="text" value={query} placeholder='Search Geek Stuff...' 
                onChange={(event) => setQuery(event.target.value)}
            />
            <button className={styles.searchButton} type='submit' aria-label='search'>
                <FontAwesomeIcon 
                icon="fa-solid fa-magnifying-glass"
                className={styles.magnifyingGlass}
                title='search'
                />
            </button>
        </form>
    );
}