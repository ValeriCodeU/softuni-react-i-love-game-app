import { useState } from "react";
import { useEffect } from "react";
import GameCard from "../game-card/GameCard";
import Swal from "sweetalert2";
import useRequest from "../../hooks/useRequest";
export default function Catalog() {

    const [games, setGames] = useState([]);
    const { request } = useRequest();

    useEffect(() => {
        request(`/data/games`)
            .then(result => {
                setGames(result);
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