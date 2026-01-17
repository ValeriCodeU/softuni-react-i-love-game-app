import { useParams } from "react-router";
import Swal from "sweetalert2";
import useRequest from "../../hooks/useRequest";
import useForm from "../../hooks/useForm";

export default function CreateComment({
    user,
    refreshComments,
}) {

    // const [comment, setComment] = useState('');
    const { gameId } = useParams();
    const { request } = useRequest();

    // const changeHandler = (e) => {

    //     setComment(e.target.value);
    // }


    const submitHandler = async (data) => {

        try {
            await request('/data/comments', 'POST', {
                // author: user.email, // jsonstore practise server
                commentText: data.comment,
                gameId,
            });

            refreshComments();
            // setComment('');


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

    const { register, formAction } = useForm(submitHandler, {
        comment: '',
    });

    return (

        <article className="create-comment" >
            <label>Add new comment:</label>
            <form className="form" action={formAction}>
                <textarea
                    {...register("comment")}
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