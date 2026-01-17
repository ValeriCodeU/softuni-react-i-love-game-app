import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import useForm from "../../hooks/useForm";

export default function Login() {

    const navigate = useNavigate();
    const { loginHandler } = useContext(UserContext);

    const loginSubmitHandler = async (data) => {

        const { email, password } = data;

        if (!email || !password) {
            return Swal.fire({
                title: "❌ Error!",
                text: 'Email and password are required!',
            })
        }

        try {

            await loginHandler(email, password);

            navigate('/');

        } catch (error) {

            Swal.fire({
                title: "❌ Error!",
                text: error.message,
            })
        }

    }

    const {
        register,
        formAction,
    }
        = useForm(loginSubmitHandler, {
            email: '',
            password: '',
        });

    return (
        <section id="login-page">

            <form id="login" action={formAction}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email")} placeholder="Your Email" />

                    <label htmlFor="login-pass">Password</label>
                    <input type="password" id="login-password" {...register("password")} placeholder="Password" />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
            </form>
        </section>
    );
}