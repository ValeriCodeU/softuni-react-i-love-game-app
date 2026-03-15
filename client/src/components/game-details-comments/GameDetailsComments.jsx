export default function GameDetailsComments({
    comments,
}) {
    console.log(comments);
    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.map(c => (
                    <li className={`comment ${c.pending ? 'comment-pending' : ''}`}
                        key={c._id}
                    >
                        <p>
                            {c.author?.email}: {c.commentText}
                            {c.pending && <span className="pending-badge"> (sending...)</span>}
                        </p>
                    </li>))}
            </ul>
            {/* <!-- Display paragraph: If there are no games in the database --> */}
            {comments.length === 0 &&
                <p className="no-comment">No comments.</p>}

        </div>

    );
}