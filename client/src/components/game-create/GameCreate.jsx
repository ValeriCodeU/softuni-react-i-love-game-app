import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import request from "../../utils/request";

export default function GameCreate() {

    const navigate = useNavigate();

    const createGameHander = async (e) => {
        e.preventDefault();

        const formdData = new FormData(e.target);

        const data = Object.fromEntries(formdData);

        data.players = Number(data.players);
        data._createdOn = Date.now();

        try {

            const result = await request('http://localhost:3030/jsonstore/games', 'POST', data);

            //version without request service
            // const response = await fetch('http://localhost:3030/jsonstore/games', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // })

            // if (!response.ok) {
            //     throw new Error('Failed to create game!');
            // }

            // const result = await response.json();

            navigate('/games');

            await Swal.fire({
                title: "✅ Success!",
                text: `${result.title} has been created successfully!`,
            });

        } catch (err) {         

            Swal.fire({
                title: "❌ Error!",
                text: err.message,
            });
        }
    }

    return (
        <section id="add-page" onSubmit={createGameHander}>
            <form id="add-new-game">
                <div className="container">

                    <h1>Add New Game</h1>

                    <div className="htmlForm-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input type="text" id="gameName" name="title" placeholder="Enter game title..." />
                    </div>

                    <div className="htmlForm-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input type="text" id="genre" name="genre" placeholder="Enter game genre..." />
                    </div>

                    <div className="htmlForm-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input type="number" id="activePlayers" name="players" min="0" placeholder="0" />
                    </div>

                    <div className="htmlForm-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input type="date" id="releaseDate" name="date" />
                    </div>

                    <div className="htmlForm-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input type="text" id="imageUrl" name="imageUrl" placeholder="Enter image URL..." />
                    </div>

                    <div className="htmlForm-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary" rows="5" placeholder="Write a brief summary..."></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="ADD GAME" />
                </div>
            </form>
        </section>

    );
}