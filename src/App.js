import React, {useEffect, useState} from "react";

import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com?apikey=c3a2aad2';


const App= ()=>{
    const [movies, setMovies] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    const searchMovies = async (title) =>{
        const response = await fetch (`${API_URL} &s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(()=> {
        searchMovies('Avatar')
    },[])

    return (
       <div className="app">
        <h1>MovieMela</h1>

        <div className="search">
            <input placeholder="Search for movies" value={searchItem} onChange={(e) =>setSearchItem(e.target.value)} onKeyUp={(event)=>{if(event.key==="Enter"){event.preventDefault();
            searchMovies(searchItem)
            }
            }}>
            </input>
            <img src={SearchIcon} alt="search" onClick={(e)=>searchMovies(searchItem)}/>
        </div>

        {
            movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie)=>(<MovieCard movie={movie}/>))}
                 </div>
            )
            : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>

            )
        }
       </div>
    )

}

export default App;