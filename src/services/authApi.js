import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

// Username already exist cheyyunnundo check cheyyan
export async function checkusername(username) {
    const response = await API.get("/users", {
        params: { username },
    });

    return response.data.length > 0;
}

// Puthiya user create cheyyan
export async function registerUser(userdata) {
    const response = await API.post("/users", userdata);

    return response.data;
}

// user login cheyyan

export async function loginUser(email, password) {
    const response = await API.get("./users", {
        params: { email, password },

    })
    if (response.data.length === 0) {
        throw new Error("Invalid email or password")
    }
    return response.data[0]
}

export default API;