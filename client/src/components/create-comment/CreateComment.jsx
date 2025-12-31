import { useState } from "react";
import request from "../../utils/request";
import { useParams } from "react-router";
import Swal from "sweetalert2";

export default function CreateComment({
    user,
    refreshComments,
}) {

    const [comment, setComment] = useState('');
    const { gameId } = useParams();

    const changeHandler = (e) => {

        setComment(e.target.value);
    }


    const submitHandler = async () => {

        try {
            await request('http://localhost:3030/jsonstore/comments', 'POST', {
                author: user.email,
                commentText: comment,
                gameId,
            });
            
            refreshComments();
            setComment('');
           

            Swal.fire({
                title: "✅ Success!",
                text: `Comment has been created successfully!`,
            });

        } catch (err) {
            Swal.fire({
                title: "❌ Error!",
                text: err.message,
            });
        }


    }

    return (

        <article className="create-comment" >
            <label>Add new comment:</label>
            <form className="form" action={submitHandler}>
                <textarea
                    name="comment"
                    value={comment}
                    onChange={changeHandler}
                    disabled={!user}
                    placeholder="Comment......">
                </textarea>
                <input
                    className="btn submit"
                    type="submit"
                    value="Add Comment"
                    disabled={!user}
                />
            </form>
        </article >
    );
}