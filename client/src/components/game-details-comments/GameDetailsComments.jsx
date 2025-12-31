export default function GameDetailsComments({
    comments,
}) {
    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.map(c => (<li className="comment" key={c._id}>
                    <p>{c.commentText}</p>
                </li>))}
            </ul>
            {/* <!-- Display paragraph: If there are no games in the database --> */}
            {comments.length === 0 &&
                <p className="no-comment">No comments.</p>}

        </div>

    );
}