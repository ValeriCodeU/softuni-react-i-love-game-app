import { useState } from "react";
import { useEffect } from "react";
import Game from "../game/Game";

export default function Catalog() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/games`)
            .then(response => response.json())
            .then(result => {
                setGames(Object.values(result));
            })
            .catch(err => alert(err.message))
    }, []);

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>
            {/* <!-- Display div: with information about every game (if any) --> */}
            <div className="catalog-container">


                {games.map(g => <Game key={g._id} {...g} />)}

            </div>
            {/* <!-- Display paragraph: If there is no games  --> */}
            <h3 className="no-articles">No Added Games Yet</h3>
        </section>
    );
}