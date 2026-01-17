import useRequest from "../../hooks/useRequest";
import GameCard from "../game-card/GameCard";
import Swal from "sweetalert2";

export default function Home() {

    const params = new URLSearchParams();
    params.append('sortBy', '_createdOn desc');
    params.append('pageSize', '3');

    const query = params.toString().replace(/\+/g, '%20');

    const { data: latestGames } = useRequest(`/data/games?${query}`, []);

    // const [latestGames, setLatestGames] = useState([]);

    // useEffect(() => {
    //     request(`http://localhost:3030/jsonstore/games`)
    //         .then(result => {
    //             setLatestGames(Object.values(result).sort((a, b) => (b._createdOn - a._createdOn)).slice(0, 3));
    //         })
    //         .catch(err => {
    //             Swal.fire({
    //                 title: "❌ Error!",
    //                 text: err.message,
    //             })
    //         });

    // }, []);

    return (

        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in </h3>
                <img id="logo-left" src="./images/logo.png" alt="logo" />
            </div>

            <div id="home-page">
                <h1>Latest Games</h1>
                <div id="latest-wrap">
                    {/* <!-- Display div: with information about every game (if any) --> */}
                    <div className="home-container">
                        {latestGames.length > 0
                            ?
                            latestGames.map(g => <GameCard key={g._id} {...g} />)
                            :
                            <p className="no-articles">No games yet</p>
                        }
                    </div>
                </div>

            </div>
        </section >
    );
}