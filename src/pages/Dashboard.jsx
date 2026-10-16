
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-xl bg-white p-6 text-center shadow-lg">
      <h1 className="text-2xl font-bold text-green-600">
        Welcome, {user?.fullname}!
      </h1>

      <p className="mt-3 text-gray-600">
        You have successfully logged in.
      </p>
      <button
        onClick={() => {
          setUser(null);
          navigate("/");
        }}
        className="mt-5 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
