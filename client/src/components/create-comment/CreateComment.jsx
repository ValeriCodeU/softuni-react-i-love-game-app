import { useParams } from "react-router";
import Swal from "sweetalert2";
import useRequest from "../../hooks/useRequest";
import useForm from "../../hooks/useForm";
import { v4 as uuid } from 'uuid';

export default function CreateComment({
    user,
    // refreshComments,
    onCreateStart,
    onCreateEnd,
    onCreateFail,
}) {

    // const [comment, setComment] = useState('');
    const { gameId } = useParams();
    const { request } = useRequest();

    // const changeHandler = (e) => {

    //     setComment(e.target.value);
    // }


    const submitHandler = async (data) => {
        const tempId = uuid();

        const tempComment = {
            _id: tempId,
            commentText: data.comment,
            gameId,
            author: { email: user.email },
            pending: true,
        };

        const commentData = {
            commentText: data.comment,
            gameId,
        };

        onCreateStart(tempComment);

        try {
            const createdComment = await request('/data/comments', 'POST', commentData);

            // refreshComments();
            // setComment('');
            // onCreateEnd(createdComment);
            onCreateEnd(tempId, createdComment);


            //Махнато заради use optimistic update UX
            //Няма success popup, защото optimistic UI вече показва успешното добавяне
            // Swal.fire({
            //     title: "✅ Success!",
            //     text: `Comment has been created successfully!`,
            // });

        } catch (err) {
            onCreateFail(tempId);
            
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