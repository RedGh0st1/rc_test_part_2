\*\*Part 2 - JWT Authentication Vulnerability

You will be provided with two applications:- [Github Link](https://github.com/spaceforestchu/rc_test_part_2/)

- A frontend application (React JS)
- A backend application (Node JS)

1. What is the issue?

   The Application is login in the app. Which allows its users to sign. My task was to investigate the login application JWT (JSON Web Token) and see why it is not functioning as expected. Identify the frontend and backend vulnerabilities and secure the application. Make sure the JWT token is working as intended for both Frontend and backend. The current application is able to generate a JWT token but the token is bypassing the authentication. This is a serious security issue. My task is to identify the issue and fix it.

2. Why does it matter?

It matters because without proper security checks, the application is vulnerable to unauthorized access. This means anyone can access sensitive data or perform actions they shouldn't be able to, which can lead to a myriad of problems.

3. How does it occur?

   This vulnerability occurs due to security and authentication issues. The application does not validate user credentials allowing unauthorized access users to generate a JWT token. Additionally, using HTTP instead of HTTPs leaves data transmissions unencrypted, making them easy to intercept. This includes sensitive data like JWT tokens, which can be captured and reused by attackers to access protected routes and without authentication. The backend fails to verify the security token, making it easy for unauthorized users to access. The combination of the bad credentialing and unencrypted communication and poor token management is causing a security risk for the application.

4. Who is affected?

It affects everyone the relies on application(users and administrators)

5. When did or could this happen?

This intrusion can happen anytime as long as the vulnerability issues are not fixed.

2. Research Steps:
3. How did you approach the research?

I research how JWT works. Alos by thoroughly examining the application’s existing code, focusing on both the backend and frontend components. Identifying key areas where security measures were lacking, such as credential validation, HTTPS implementation, and token management, was the first step. I then cross-referenced best practices from trusted sources like OWASP and cybersecurity documentation to confirm my findings. I used sites like [https://jwt.io/](https://jwt.io/) ,[rate limiting](https://express-rate-limit.mintlify.app/overview), for [bcrypt](https://www.npmjs.com/package/bcrypt), [owasp](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html), [CORS Middleware in Express](https://expressjs.com/en/resources/middleware/cors.html) , https://www.npmjs.com/package/cookie-parser

[Why HttpOnly Cookies Are SAFER Than Local Storage! | Using HttpOnly Cookie With JWT .Net 6 API](https://www.youtube.com/watch?v=ROg1p0UZL0M)

Youtube links: [Cross-Site Scripting (XSS) Explained](https://www.youtube.com/watch?v=EoaDgUgS6QA) ,[Password Storage Tier List: encryption, hashing, salting, bcrypt, and beyond](https://www.youtube.com/watch?v=qgpsIBLvrGY)

2. How did you validate your hypothesis?

My hypothesis: I performed tests of potential attack, postman queries and console.log.This included generating and manipulating JWT tokens, intercepting/checking HTTP traffic to observe data vulnerabilities, and attempting to bypass authentication using various methods.By comparing these results with the expected secure behavior, I was able to confirm where and how the application was vulnerable. This methodical approach ensured that my findings were both accurate and actionable.

You will be asked to present your code and give a presentation covering your understanding of the problem, the solution process, and improvements for future prevention.

1. What is a JWT token?

A JWT (JSON Web Token) is a compact, URL-safe means of representing claims between two parties. It's used for securely transmitting information as a JSON object. This information can be verified and trusted because it's digitally signed.

2. What are the three main parts of a JWT, and what role does each part play?

- Header: Contains metadata about the token, including the type of token (JWT) and the signing algorithm used (e.g., HMAC SHA256).
- Payload: Contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

-Signature: Ensures the token hasn’t been altered. It's created by combining the encoded header and payload, signing it with a secret or private key, and then encoding it.

3. How does the JWT token facilitate stateless authentication in a web application?

JWT tokens are self-contained and carry all the necessary information about a user, allowing the server to authenticate requests without needing to store session information. When a user logs in, the server generates a JWT token and sends it to the client. The client stores the token (usually in local storage or a cookie) and includes it in subsequent requests. The server then verifies the token to grant or deny access, eliminating the need for maintaining session state.

4. How is the JWT token signed, and why is this process important?

The JWT token is signed using a cryptographic algorithm (e.g., HMAC SHA256). The signing process involves creating a signature by combining the encoded header and payload, and then hashing them with a secret key. This signature is crucial because it ensures the integrity and authenticity of the token. If the token is tampered with, the signature will no longer match, and the server will reject the token, thereby maintaining the security of the communication.

To prevent similar security vulnerabilities in the future, it's essential to implement HTTPS for encrypted data transmission, perform robust input validation, and manage JWT tokens properly. Utilizing security libraries like Helmet.js, conducting regular security audits, and staying updated on the latest threats are crucial. Continuous training for developers, code reviews focused on security, and regular penetration testing will help anticipate and address potential issues early. Adopting a security-first mindset throughout the development process ensures that security measures are prioritized from the start. Combining these proactive steps will significantly enhance the application's security and protect against future threats. Feel secure and proactive!

.

\*\*
