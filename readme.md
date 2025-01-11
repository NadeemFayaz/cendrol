# Node.js User Management API

## **Prerequisites**
Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) (local or cloud, e.g., MongoDB Atlas)



## **Getting Started**

### 1. **Clone the Repository**

```bash
git clone https://github.com/NadeemFayaz/cendrol.git
cd cendrol
```

------------------------------------------------------------------------------

### 2. **Install Dependencies**

```bash
npm install
npm install express mongoose bcrypt jsonwebtoken multer dotenv

```

-----------------------------------------------------------------------------

### 3. **Set Environment Variables**
Create a .env file in the root of your project with the following variables:
    
    ```bash
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-secret-key>
    PORT=5000 # or any other port you wish to use
    ```
Replace <your-mongodb-uri> with your MongoDB connection string and <your-secret-key> with a strong secret for JWT authentication.

------------------------------------------------------------------------------


### 4. **Run the Application**

```bash 
npm start
```
The server will start at http://localhost:5000.

-----------------------------------------------------------------------------

### 5. **API Endpoints**
## Public Endpoints
a) Register a User

POST /api/users/register
Form-data with fields:
name: string
email: string
mobile: string
password: string
profilePicture: image file 

b) Login a User

POST /api/users/login
JSON Body:
{
  "email": "example@example.com",
  "password": "password123"
}


## Protected Endpoints
Add Authorization Header:
    Key: Authorization
    Value: Bearer <token>

a) Get All Users
    GET /api/users/

b) Get a User by ID
    GET /api/users/:id

c) Update a User
    PUT /api/users/:id
    Form-data with fields:
    name: string
    email: string
    mobile: string
    password: string
    profilePicture: image file

d) Delete a User
    DELETE /api/users/:id

--------------------------------------------------------------------------


### 6. **Running the App Locally**
    Clone the repository.
    Install dependencies using "npm install".
    Set up your ".env" file with the required variables.
    Start your MongoDB server.
    Start the Node.js server using npm start.




