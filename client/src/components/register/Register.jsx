import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Register({
    onRegister
}) {

    const navigate = useNavigate();

    const registerHandler = (data) => {

        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirm-password');

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
            onRegister(email, password);
            navigate('/');

        } catch (error) {
            Swal.fire({
                title: "❌ Error!",
                text: error.message,
            })
        }

        console.log('test');
    }

    return (

        <section id="register-page" className="content auth">
            <form id="register" action={registerHandler}>
                <div className="container">
                    <div className="brand-logo"></div>

                    <h1>Register</h1>
                    {/* For test */}
                    {/* {user && <h2 style={{ color: 'white', textAlign: 'center' }}>{user.email}</h2>} */}

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" />

                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" placeholder="Password" />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" placeholder="Repeat Password" />

                    <input className="btn submit" type="submit" value="Register" />

                </div>

            </form>

        </section >

    )
}