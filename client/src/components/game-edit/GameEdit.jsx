import { useEffect, useState } from "react";
import request from "../../utils/request";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";


const initialValues = {
    title: '',
    genre: '',
    players: '',
    date: '',
    imageUrl: '',
    summary: '',

}

// const baseUrl = 'http://localhost:3030/jsonstore/games';

export default function GameEdit() {

    const editGameHandler = async (formData) => {

        try {
            const result = await request(`/data/games/${gameId}`, 'PUT', formData);

            await Swal.fire({
                title: "✅ Success!",
                text: `${result.title} has been created successfully!`,
            });

            navigate(`/games/${gameId}/details`);

        } catch (err) {
            Swal.fire({
                title: "❌ Error!",
                text: err.message,
            });
        }
    }

    const { register, formAction, setValues } = useForm(editGameHandler, initialValues);

    // const [formdData, setFormData] = useState(initialValues);
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { request } = useRequest();

    // const changeHandler = (e) => {
    //     setFormData((state) => ({
    //         ...state,
    //         [e.target.name]: e.target.value
    //     }));
    // }

    useEffect(() => {

        request(`/data/games/${gameId}`)
            .then(result => {
                console.log(result);
                setValues(result);
            })
            .catch(err => {
                Swal.fire({
                    title: "❌ Error!",
                    text: err.message,
                });
            })

    }, [gameId, setValues]);



    return (
        <section id="edit-page">
            <form id="add-new-game" action={formAction}>
                <div className="container">

                    <h1>Edit Game</h1>

                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input
                            type="text"
                            id="gameName"
                            {...register("title")}
                            placeholder="Enter game title..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input
                            type="text"
                            id="genre"
                            {...register("genre")}
                            placeholder="Enter game genre..."
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input
                            type="number"
                            id="activePlayers"
                            {...register("players")}
                            min="0"
                            placeholder="0"
                        />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input
                            type="date"
                            id="releaseDate"
                            {...register("date")}
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            {...register("imageUrl")}
                            placeholder="Enter image URL..."
                        />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea
                            name="summary"
                            {...register("summary")}
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