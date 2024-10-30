import React, { useEffect, useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleProtectedRoute = async () => {
    try {
      const cookies = document.cookie.split("; ").reduce((acc, curr) => {
        const [key, value] = curr.split("=");
        acc[key] = value;
        return acc;
      }, {});

      const token = cookies.token;

      const response = await axios.get("http://localhost:3001/protected", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      // console.log("Access to protected route:", response);
      return response;
    } catch (error) {
      // console.error("Error accessing protected route:", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      handleProtectedRoute();
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please enter correct username and password.");
      return;
    }

    if (!/^[A-Za-z0-9]+$/.test(username)) {
      setMessage("Username contains invalid characters.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setMessage(`Login Successful!`);
      console.log("Login successful: here's the jwt token ->", response.data);
      setIsLoggedIn(true);
      setTimeout(() => {
        console.log("Document Cookies after login:", document.cookie);
      }, 1000);
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          There is no database and users: Please user the following to emulate
          your login experience
          <br />
          username: admin
          <br />
          password: password
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignInForm;
