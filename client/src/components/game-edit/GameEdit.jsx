import { useState } from "react";


const initialValues = {
    title: '',
    genre: '',
    players: '',
    date: '',
    imageUrl: '',
    summary: '',

}

export default function GameEdit() {

    const [formdData, setFormData] = useState(initialValues);

    const changeHandler = (e) => {
        setFormData((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <section id="edit-page">
            <form id="add-new-game">
                <div className="container">

                    <h1>Edit Game</h1>

                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input
                            type="text"
                            id="gameName"
                            name="title"
                            value={formdData.title}
                            onChange={changeHandler}
                            placeholder="Enter game title..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            value={formdData.genre}
                            onChange={changeHandler}
                            placeholder="Enter game genre..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input
                            type="number"
                            id="activePlayers"
                            name="players"
                            value={formdData.players}
                            onChange={changeHandler}
                            min="0"
                            placeholder="0"
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input
                            type="date"
                            id="releaseDate"
                            name="date"
                            value={formdData.date}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={formdData.imageUrl}
                            onChange={changeHandler}
                            placeholder="Enter image URL..."
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea
                            name="summary"
                            value={formdData.summary}
                            onChange={changeHandler}
                            id="summary"
                            rows="5"
                            placeholder="Write a brief summary..."></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="EDIT GAME" />
                </div>
            </form>
        </section>
    );
}