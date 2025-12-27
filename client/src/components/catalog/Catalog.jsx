import { useState } from "react";
import { useEffect } from "react";
import GameCard from "../game-card/GameCard";
import request from "../../utils/request";
import Swal from "sweetalert2";

export default function Catalog() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        request(`http://localhost:3030/jsonstore/games`)
            .then(result => {
                setGames(Object.values(result));
            })
            .catch(err => {
                Swal.fire({                    
                    title: "❌ Error!",
                    text: err.message,
                });
            })
    }, []);

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>
            <div className="catalog-container">

                {games.length > 0
                    ?
                    games.map(g => <GameCard key={g._id} {...g} />)
                    :
                    <h3 className="no-articles">No Added Games Yet</h3>
                }

            </div>

        </section>
    );
}