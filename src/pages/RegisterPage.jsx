import { useState } from "react";
import {
    validateEmail,
    validateUsername,
    validateFullname,
    validatePassword,
} from "../utils/validation";

//API functions importing
import {
    checkusername,
    registerUser,
} from "../services/authApi"

import { Link } from "react-router-dom";

function RegisterPages() {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [fullname, setfullname] = useState("")


    //...input value validate cheyyunnu.......

    const usernameValid = validateUsername(username);
    const emailvalid = validateEmail(email);
    const fullnamevalid = validateFullname(fullname);
    const passwordvalid = validatePassword(password);

    //....API functions state.......

    const [message, setmessage] = useState("")
    const [loading, setloading] = useState(false)


    //......register function.......

    async function handleRegister(e) {
        e.preventDefault();

        setmessage("")

        if (
            !validateUsername(username) ||
            !validateEmail(email) ||
            !validateFullname(fullname) ||
            !validatePassword(password)
        ) {
            setmessage("Please enter valid details.");
            return;

        }
        try {
            setloading(true)
            const exists = await checkusername(username.trim())

            if (exists) {
                setmessage("Username already exists!")
                return;

            }

            await registerUser({
                username: username.trim(),
                email: email.trim(),
                fullname: fullname.trim(),
                password: password,
            });
            setmessage("Registration successful!")

        } catch (error) {
            setmessage("Registration failed. Please try again.")
        } finally {
            setloading(false);
        }
    }

    return (

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 rounded-xl bg-white p-6 shadow-lg">

            <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
                Create Account
            </h1>

            <input
                className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition ${username.length === 0
                    ? "border-gray-300"
                    : usernameValid
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                placeholder="Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
            />

            <input
                className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition ${email.length === 0
                    ? "border-gray-300"
                    : validateEmail(email)
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
            />

            <input
                className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition ${fullname.length === 0
                    ? "border-gray-300"
                    : validateFullname(fullname)
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                placeholder="Enter your Full name"
                value={fullname}
                onChange={(e) => setfullname(e.target.value)}
            />

            <input
                className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition ${password.length === 0
                    ? "border-gray-300"
                    : validatePassword(password)
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
            />


            <button
                type="button"
                onClick={handleRegister}
                disabled={loading}
                className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95 disabled:opacity-50"
            >
                {loading ? "Registering..." : "Register"}
            </button>
            {message && (
                <p className="mt-3 text-center text-sm text-gray-700">
                    {message}
                </p>
            )}
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                    to="/"
                    className="font-semibold text-blue-600 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>

    )
}
export default RegisterPages