import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import request from "../../utils/request";
import CreateComment from "../create-comment/CreateComment";
import GameDetailsComments from "../game-details-comments/GameDetailsComments";

const baseUrl = 'http://localhost:3030/jsonstore/games';

export default function Details({
    user
}) {

    const { gameId } = useParams();
    const [gameDetails, setGameDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        request(`${baseUrl}/${gameId}`)
            .then(result => {
                console.log(result);
                setGameDetails(result);
            })
            .catch(err => {
                Swal.fire({
                    title: "❌ Error!",
                    text: err.message,
                });
            })
    }, [gameId]);

    const deleteGameHandler = async () => {

        const result = await Swal.fire({
            title: "⚠️ Are you sure?",
            text: `Do you really want to delete: ${gameDetails.title}?`,
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) {
            return;
        }

        try {

            // await fetch(`${baseUrl}/${gameId}`, {
            //     method: 'DELETE',
            // })

            await request(`${baseUrl}/${gameId}`, 'DELETE')

            Swal.fire({
                title: "✅ Deleted!",
                text: `${gameDetails.title} was deleted successfully.`,
            });

            navigate('/games');


        } catch (err) {

            Swal.fire({
                title: "❌ Error!",
                text: err.message,
            });
        }
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="header-and-image">
                    <img className="game-img" src={gameDetails.imageUrl} alt={gameDetails.title} />

                    <div className="meta-info">
                        <h1 className="game-name">{gameDetails.title}</h1>

                        <p className="data-row">
                            <span className="label">Genre:</span>
                            <span className="value">{gameDetails.genre}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Active Players:</span>
                            <span className="value">{gameDetails.players}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Release Date:</span>
                            <span className="value">{gameDetails.date}</span>
                        </p>
                    </div>
                    <div className="summary-section">
                        <h2>Summary:</h2>
                        <p className="text-summary">
                            {gameDetails.summary}
                        </p>
                    </div>
                </div>


                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {user &&
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                        {/* <Link to={`games/${gameId}/delete`} className="button">Delete</Link> */}
                        <button className="button" onClick={deleteGameHandler}>Delete</button>
                    </div>
                }
            <GameDetailsComments />
               
            </div>
            <CreateComment user={user}/>
        </section>
    );
}