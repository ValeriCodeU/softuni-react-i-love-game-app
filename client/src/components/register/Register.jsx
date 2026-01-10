import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Register() {

    const navigate = useNavigate();

    const { registerHandler } = useContext(UserContext);

    // const registerHandler = (data) => {

    //     const email = data.get('email');
    //     const password = data.get('password');
    //     const confirmPassword = data.get('confirm-password');

    //     if (!email || !password) {
    //         return Swal.fire({
    //             title: "❌ Error!",
    //             text: 'Email and password are required!',
    //         })
    //     }

    //     if (password !== confirmPassword) {
    //         return Swal.fire({
    //             title: "❌ Error!",
    //             text: 'Password missmatch!',
    //         })
    //     }
    //     try {
    //         onRegister(email, password);
    //         navigate('/');

    //     } catch (error) {
    //         Swal.fire({
    //             title: "❌ Error!",
    //             text: error.message,
    //         })
    //     }

    //     console.log('test');
    // }

    const registerSubmitHandler = async (data) => {
        const { email, password, confirmPassword } = data;

        if (!email || !password) {
            return Swal.fire({
                title: "❌ Error!",
                text: 'Email and password are required!',
            })
        }

        if (password !== confirmPassword) {
            return Swal.fire({
                title: "❌ Error!",
                text: 'Password missmatch!',
            })
        }

        try {
            await registerHandler(email, password);
            navigate('/');

        } catch (error) {
            Swal.fire({
                title: "❌ Error!",
                text: error.message,
            })
        }
        console.log('test');
    }

    const {
        formAction,
        register
    } = useForm(registerSubmitHandler, {
        email: '',
        password: '',
        confirmPassword: '',
    });

    return (

        <section id="register-page" className="content auth">
            <form id="register" action={formAction}>
                <div className="container">
                    <div className="brand-logo"></div>

                    <h1>Register</h1>
                    {/* For test */}
                    {/* {user && <h2 style={{ color: 'white', textAlign: 'center' }}>{user.email}</h2>} */}

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" {...register('email')} placeholder="Your Email" />

                    <label htmlFor="pass">Password:</label>
                    <input type="password" {...register('password')} id="register-password" placeholder="Password" />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" {...register('confirmPassword')} id="confirm-password" placeholder="Repeat Password" />

                    <input className="btn submit" type="submit" value="Register" />

                </div>

            </form>

        </section >

    )
}