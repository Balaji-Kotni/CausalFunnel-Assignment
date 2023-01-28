Blog API
Welcome to the Blog API! This API allows users to Signup, Login, and reset their password. Once authenticated, users can create, update, and delete blogs, and also pagination is supported.

Endpoints
The base URL for the API is http://localhost:5001/api.

User Authentication
POST /signup: Allows new users to signup for the service.
POST /login: Allows existing users to login to the service.
POST /password-reset: Allows users to reset their password.
Blog Management
GET /blogs: Retrieves a list of all blogs.
POST /blogs: Creates a new blog.
PUT /blogs/:id: Updates an existing blog.
DELETE /blogs/:id: Deletes an existing blog.
Note: The above endpoints are only accessible to authenticated users.

Pagination
Pagination is supported for the GET /blogs endpoint. To access different pages, you can use the ?page=N query parameter, where N is the page number. For example, GET /blogs?page=2 will retrieve the second page of blogs.

Swagger Documentation
The Swagger documentation for this API can be found at http://localhost:5001/api-docs/. The documentation provides detailed information about the endpoints and their parameters, and allows you to test the endpoints directly in the browser.

Getting Started
To start using the Blog API, you will first need to sign up for an account. Once you have an account, you can use the /login endpoint to authenticate and receive a JWT token. You can then include this token in the headers of all subsequent requests to the API.

Conclusion
This is a simple Blog API which has capabilities of Signup, Login, Password Reset, and only Authenticated Users able to create, update and delete Blogs with pagination and swagger documentation. This API is built on Nodejs and MongoDB.

Please let me know if you have any questions or issues while using the API.