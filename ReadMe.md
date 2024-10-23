## Folder Structure

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

## How to Run This Application (At the ROOT of the FOLDER)

Follow these steps:

1. Install dependencies for the client and server:

```
   npm run install:client
   npm run install:server
```

2. Start the application:

```
   npm run start
```

Once running, both the client and server will be available:

Visit http://localhost:3000 to see the React app.\
Visit http://localhost:3001/testing to view the server app.\

# JWT Authentication Vulnerability

## Overview

This project involves securing a React JS frontend and a Node JS backend that use JWT (JSON Web Token) for authentication. The current implementation is vulnerable to authentication bypass.
## Objectives

1. Investigate the JWT implementation.
    
2. Identify and fix vulnerabilities.
    
3. Ensure the JWT token works as intended.

## Key Points

- **Issue**: The JWT token can be tampered with, bypassing authentication.
    
- **Impact**: Significant security risk due to unauthorized access.
    
- **Affected**: The application and its users.
    
- **Research**: Explored JWT structure and potential vulnerabilities.
    
## Steps

1. Investigate the JWT implementation.
    
2. Fix vulnerabilities:
    
    - Use strong, random secret keys.
        
    - Implement token expiration and rotation.
        
    - Validate tokens on frontend and backend.
        
3. Prevent future issues with regular audits and secure coding practices.
   
    ## Real-World Example

- **GitHub (2018)**: Exposed JWT encryption key, allowing attackers to forge tokens and gain unauthorized access1.
    

