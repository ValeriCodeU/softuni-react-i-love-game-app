export default function GameDetailsComments() {
    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                <li className="comment">
                    <p>Content: A masterpiece of world design, though the boss fights are brutal.</p>
                </li>
                <li className="comment">
                    <p>Content: Truly feels like a next-gen evolution of the Souls formula!</p>
                </li>
            </ul>
            {/* <!-- Display paragraph: If there are no games in the database --> */}
            <p className="no-comment">No comments.</p>
        </div>

    );
}