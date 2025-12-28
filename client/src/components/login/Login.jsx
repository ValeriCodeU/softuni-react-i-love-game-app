import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Login({
    onLogin,
}) {

    const navigate = useNavigate();

    const loginHandler = (formData) => {
        const email = formData.get('email');
        const password = formData.get('password');

        console.log(email);

        if (!email || !password) {
            return Swal.fire({
                title: "❌ Error!",
                text: 'Email and password are required!',
            })
        }

        try {
            onLogin(email, password);
            navigate('/');

        } catch (error) {

            Swal.fire({
                title: "❌ Error!",
                text: error.message,
            })
        }

    }

    return (
        <section id="login-page">

            <form id="login" action={loginHandler}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" />

                    <label htmlFor="login-pass">Password</label>
                    <input type="password" id="login-password" name="password" placeholder="Password" />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
            </form>
        </section>
    );
}