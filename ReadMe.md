# Cybersecurity Project: Secure Login Form with JWT Authentication

## Overview

This project is centered around creating a robust application with strong security foundations, utilizing **JWT (JSON Web Tokens)** for authentication. Our goal is to fortify both the frontend and backend against **SQL Injection vulnerabilities** and ensure secure user authentication. By implementing JWT for session management and encrypting password storage, we aim to guarantee safe data handling and user authentication.

**What is JWT Authentication?** JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. The token is digitally signed, ensuring its integrity and authenticity. JWTs are commonly used for authentication, allowing secure transmission of information between client and server.

## Project Goals

The primary objective of this project is to thoroughly understand the application, identify potential security vulnerabilities, particularly SQL Injection, and implement comprehensive measures to prevent such attacks. This includes:

### Key Technologies:

- **Frontend**: React with Axios for API requests
    
- **Backend**: [Node.js](https://node.js/) with Express, Bcrypt for password hashing, and JWT for token-based authentication.
    

```
root
│
├── client (React frontend)
│ ├── package.json
│ └── node_modules
│
├── server (Node.js backend)
│ ├── package.json
│ └── node_modules
│
└── package.json (root)
```


## Installation Instructions

1. **Clone the Repository**:
```bash
git clone https://github.com/your-repo/cybersecurity-project.git
cd cybersecurity-project
```
**Install Dependencies**:
```bash
npm install
```
**Set Up Environment Variables**: Create a `.env` file in the root directory with the following variables:
```bash
JWT_SECRET=your_secret_key
```

**Run the Application**:
```bash
npm start
```
This will start the server on `http://localhost:3001`.

Once running, both the client and server will be available:

Visit http://localhost:3000 to see the React app.\
Visit http://localhost:3001/testing to view the server app.\

## Usage Guide

To use this project:

1. **Login with Valid Credentials**
    
    - Start with the following credentials (no database setup is required for this project):
        
        - **Username**: admin
            
        - **Password**: password
            
2. **Access Protected Routes**
    
    - After successful login, the JWT token is generated and stored as an HTTP-only cookie.
        
    - Authenticated users can access protected routes (e.g., `/protected`), which require a valid token.
        
**Login Request Example**:
```javascript
const response = await axios.post(
  "http://localhost:3001/login",
  { username: "admin", password: "password" },
  { withCredentials: true }
);
console.log("Login successful: here's the jwt token ->", response.data);
```

**Protected Route Access Example**:
```javascript
const cookies = document.cookie.split('; ').reduce((prev, current) => {
  const [name, ...value] = current.split('=');
  prev[name] = value.join('=');
  return prev;
}, {});
const token = cookies.token;
const response = await axios.get("http://localhost:3001/protected", {
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
});
console.log("Access to protected route:", response);
```

## Objectives

#### Part 1: Secure Backend Implementation

1. **JWT Authentication**:
    
    - Utilize `jsonwebtoken` to create and verify tokens.
        
    - Ensure tokens are stored in secure HTTP-only cookies.
        
    
    **Example**:
```javascript
    const token = jwt.sign(
  { id: user.id, username: user.username },
  secretKey,
  { expiresIn: expirationTime }
);
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 3600000,
});
res.json({ token });
```

**Rate Limiting**:

- Implement `express-rate-limit` to prevent brute-force attacks.
    

**Example**:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  message: "Too many requests, please try again later",
});
app.use(limiter);
```

**Middleware Security**:

- Use `helmet` for securing HTTP headers.
    
- Use `cors` to manage cross-origin requests and allow only trusted origins.
    

**Example**:
```javascript
app.use(helmet());
app.use(cors({ origin: allowedOrigin, methods: "GET, POST", credentials: true }));
```

#### Part 2: Secure Frontend Implementation

1. **Token Handling**:
    
   - Ensure tokens are included in request headers for protected routes.
        
   - Use secure cookies and ensure they are set correctly.
        
    
    **Example**:
   
    ```javascript
    const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, ...value] = current.split('=');
    prev[name] = value.join('=');
    return prev;
    }, {});
    const token = cookies.token;
    ```



**Error Handling**:

- Provide feedback to users on authentication failures.
    
- Handle API errors gracefully.
    

**Example**:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!username || !password) {
    setMessage("Please enter correct username and password.");
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:3001/login",
      { username, password },
      { withCredentials: true }
    );
    setMessage(`Login Successful!`);
    setIsLoggedIn(true);
  } catch (error) {
    setMessage("Login failed. Please check your credentials.");
    console.error("Error logging in:", error);
  }
};
```

## Research and Development

1. **Understanding JWT**:
    
    - Refer to the [jsonwebtoken documentation](https://www.npmjs.com/package/jsonwebtoken) for implementation details.
        
    - Understand the process of token creation, verification, and expiration handling.
        
2. **Securing Cookies**:
    
    - Learn from the [cookie-parser documentation](https://www.npmjs.com/package/cookie-parser) on how to manage cookies securely.
        
3. **Rate Limiting**:
    
    - Use [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) to prevent excessive requests.
        

## Learning Outcomes

- **Deep Understanding of Authentication**:
    
    - Grasped the intricacies of JWTs and their secure implementation.
        
    - Learned to manage token storage and usage effectively.
        
- **Enhanced Security Practices**:
    
    - Implemented rate limiting, helmet, and CORS for a secure application.
        
    - Applied best practices in handling sensitive data.
        
- **Frontend-Backend Integration**:
    
    - Achieved seamless authentication flow between frontend and backend.
        
    - Ensured secure state management and error handling.


## Real-World Example

- **GitHub (2018)**: Exposed JWT encryption key, allowing attackers to forge tokens and gain unauthorized access1.
    

## Conclusion

This project underscores the critical importance of identifying and mitigating security vulnerabilities in web applications. By adhering to best practices and implementing comprehensive security measures, we have fortified the application against common attacks such as SQL Injection and JWT vulnerabilities.
Feel free to contribute by forking the repository and submitting pull requests. Your contributions are always welcome!



