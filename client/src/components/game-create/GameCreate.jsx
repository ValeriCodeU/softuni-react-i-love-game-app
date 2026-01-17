import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";

export default function GameCreate() {

    // const [imageUpload, setImageUpload] = useState(false);
    // const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();
    const { request } = useRequest();

    // useEffect(() => {
    //     return () => {
    //         if (imagePreview) {
    //             URL.revokeObjectURL(imagePreview);                     
    //         }
    //     };
    // }, [imageUpload,imagePreview]);

    const createGameHander = async (values) => {

        console.log('test');



        const { image, ...game } = values;

        game.imageUrl = image;
        game.players = Number(game.players);
        game._createdOn = Date.now();

        try {

            const result = await request('/data/games', 'POST', game);
            //version without request service
            // const response = await fetch('http://localhost:3030/jsonstore/games', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // })

            // if (!response.ok) {
            //     throw new Error('Failed to create game!');
            // }

            // const result = await response.json();

            navigate('/games');



            await Swal.fire({
                title: "✅ Success!",
                text: `${result.title} has been created successfully!`,
            });

        } catch (err) {

            await Swal.fire({
                title: "❌ Error!",
                text: err.message,
            });
        }
    }

    const { formAction, register } = useForm(createGameHander, {
        title: '',
        genre: '',
        players: 0,
        date: '',
        imageUrl: '',
        summary: '',
    });

    // const imageChangeHandler = (e) => {
    //     const image = e.target.files[0];

    //     const imageUrl = URL.createObjectURL(image);
    //     // setImagePreview(imageUrl);
    //     // чистим стария preview ако има
    //     setImagePreview(prev => {
    //         if (prev) URL.revokeObjectURL(prev);
    //         return imageUrl;
    //     });

    //     console.log(imageUrl);
    // }

    // const imageUploadClickHandler = () => {
    //     setImageUpload(state => !state);
    //     // setImagePreview('');
    //     setImagePreview(prev => {
    //         if (prev) URL.revokeObjectURL(prev);
    //         return '';
    //     });
    // }

    return (
        <section id="add-page" >
            <form id="add-new-game" action={formAction} >
                <div className="container">

                    <h1>Add New Game</h1>

                    <div className="htmlForm-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input type="text" id="gameName" {...register("title")} placeholder="Enter game title..." />
                    </div>

                    <div className="htmlForm-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input type="text" id="genre" {...register("genre")} placeholder="Enter game genre..." />
                    </div>

                    <div className="htmlForm-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input type="number" id="activePlayers" {...register("players")} min="0" placeholder="0" />
                    </div>

                    <div className="htmlForm-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input type="date" id="releaseDate" {...register("date")} />
                    </div>

                    <div className="htmlForm-group-full">
                        {/* <label htmlFor="image">{imageUpload ? 'Image Upload:' : 'Image Url:'}</label> */}
                        {/* <button className="details-button" onClick={imageUploadClickHandler} type="button">Image Type</button> */}
                        {/* {imageUpload ?
                            <input type="file" className="file-upload-btn" id="image" name="image" onChange={imageChangeHandler} placeholder="Upload image..." />
                            :
                            <input type="text" id="image" name="image" placeholder="Enter image URL..." />} */}

                        {/* {imagePreview && (
                            <img src={imagePreview} alt="preview image" />
                        )} */}
                        {/* Simple initial version */}
                        <label htmlFor="image">Image Url:</label>

                        <input type="text" id="image" {...register('image')} placeholder="Enter image URL..." />


                    </div>

                    <div className="htmlForm-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea {...register("summary")} id="summary" rows="5" placeholder="Write a brief summary..."></textarea>
                    </div>

                    <input className="btn submit" type="submit" value="ADD GAME" />
                </div>
            </form>
        </section>

    );
}