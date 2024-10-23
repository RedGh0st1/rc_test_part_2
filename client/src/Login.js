import React, { useEffect, useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleProtectedRoute = async () => {
    try {
      const response = await axios.get("http://localhost:3001/protected", {
        withCredentials: true, //makes sure cookies are set correctly
      });
      console.log("Protected route response:", response.data);
    } catch (error) {
      console.error("Error accessing protected route:", error);
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
    //  validation on the username and password fields.
    if (!username || !password) {
      setMessage("Please enter correct username and password.");
      return;
    }

    try {
      // include in the fetch CSRF token from the backend.
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          username,
          password,
        },
        {
          withCredentials: true, //makes sure cookies are set correctly
        }
      );

      setMessage(`Login Successful!`);
      console.log("Login successful: here's the jwt token ->", response.data); // remove this later
      setIsLoggedIn(true);
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
