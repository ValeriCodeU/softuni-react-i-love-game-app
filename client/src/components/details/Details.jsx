import { useOptimistic, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import CreateComment from "../create-comment/CreateComment";
import GameDetailsComments from "../game-details-comments/GameDetailsComments";
import useRequest from "../../hooks/useRequest";
import { useUserContext } from "../../contexts/UserContext";

// const baseUrl = 'http://localhost:3030/jsonstore/games';
// const commentsUrl = 'http://localhost:3030/jsonstore/comments';


export default function Details() {

    const { gameId } = useParams();
    const { user, isAuthenticated } = useUserContext();
    // const [gameDetails, setGameDetails] = useState({});
    // const [comments, setComments] = useState([]);
    // const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const { data: gameDetails, request } = useRequest(`/data/games/${gameId}`, {});

    // useEffect(() => {
    //     request(`${baseUrl}/${gameId}`)
    //         .then(result => {
    //             console.log(result);
    //             setGameDetails(result);
    //         })
    //         .catch(err => {
    //             Swal.fire({
    //                 title: "❌ Error!",
    //                 text: err.message,
    //             });
    //         })
    // }, [gameId]);

    const urlParams = new URLSearchParams();
    urlParams.append('load', 'author=_ownerId:users');
    urlParams.append('where', `gameId="${gameId}"`);


    const { data: comments, setData: setComments } = useRequest(`/data/comments?${urlParams.toString()}`, []);


    const [optimisticComments, dispatchOptimisticComments] = useOptimistic(
        comments,
        (state, action) => {
            switch (action.type) {
                case 'ADD_COMMENT':
                    return [...state, action.payload];

                case 'REPLACE_COMMENT':
                    return state.map(comment =>
                        comment._id === action.tempId
                            ? action.payload
                            : comment
                    );

                case 'REMOVE_COMMENT':
                    return state.filter(comment => comment._id !== action.tempId);

                default:
                    return state;
            }
        }
    );

    //old version without useRequest
    // useEffect(() => {
    //     request(`/data/comments?${urlParams.toString()}`)
    //         .then(result => {
    //             console.log(result);
    //             setComments(Object.values(result).filter(c => c.gameId === gameId));
    //         })
    //         .catch(err => {
    //             Swal.fire({
    //                 title: "❌ Error!",
    //                 text: err.message,
    //             });
    //         })
    // }, [gameId, refresh]);

    // const forceRefresh = () => {
    //     setRefresh(state => !state);
    // }

    // const createEndCommentHandler = (createdComment) => {
    //     setComments(state => [...state, { ...createdComment, author: { email: user.email } }]);
    // }


    // const createStartCommentHandler = (newComment) => {
    //     dispatchOptimisticComments({ type: 'ADD_COMMENT', payload: { ...newComment, author: { email: user.email } } });
    // }

    const createStartCommentHandler = (tempComment) => {
        dispatchOptimisticComments({
            type: 'ADD_COMMENT',
            payload: tempComment,
        });
    };

    const createEndCommentHandler = (tempId, createdComment) => {
        const finalComment = {
            ...createdComment,
            author: { email: user.email },
        };

        dispatchOptimisticComments({
            type: 'REPLACE_COMMENT',
            tempId,
            payload: finalComment,
        });

        setComments(state =>
            state.some(c => c._id === finalComment._id)
                ? state
                : [...state, finalComment]
        );
    };

    const createFailCommentHandler = (tempId) => {
        dispatchOptimisticComments({
            type: 'REMOVE_COMMENT',
            tempId,
        });
    };



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

            await request(`/data/games/${gameId}`, 'DELETE')

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
                {isAuthenticated &&
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                        {/* <Link to={`games/${gameId}/delete`} className="button">Delete</Link> */}
                        <button className="button" onClick={deleteGameHandler}>Delete</button>
                    </div>
                }
                {/* <GameDetailsComments comments={comments} /> */}
                <GameDetailsComments comments={optimisticComments} />

            </div>
            {isAuthenticated &&
                // <CreateComment refreshComments={forceRefresh} user={user} />}
                <CreateComment
                    onCreateStart={createStartCommentHandler}
                    onCreateEnd={createEndCommentHandler}
                    onCreateFail={createFailCommentHandler}
                    user={user} />}
        </section>
    );
}