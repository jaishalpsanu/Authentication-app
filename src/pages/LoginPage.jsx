import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {
    const { setUser } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setEmail("");
        setPassword("");
        setMessage("");
    }, []);


    async function handleLogin() {
        if (!email.trim() || !password.trim()) {
            setMessage("Please enter email and password");
            return;
        }
        setLoading(true)
        setMessage("")
        try {
            const user = await loginUser(email.trim(), password);
            setUser(user);
            setEmail("");
            setPassword("");
            navigate("/dashboard");


            setMessage(`Welcome,${user.fullname}!`)
        } catch (error) {
            setMessage("Invalid email or password");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 rounded-xl bg-white p-6 shadow-lg">
            <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
                Login
            </h1>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {message && (
                <p className="text-center text-sm text-gray-700">
                    {message}
                </p>
            )}
            <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:underline"
                >
                    Create Account
                </Link>
            </p>
        </div>
    );
}

export default LoginPage;