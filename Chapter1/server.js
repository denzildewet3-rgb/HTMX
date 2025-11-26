import express from 'express';

// Inintialize an express app and store in a variable
const app = express();

//MIDDLEWARE
// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded ({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle GET request to fetch users
app.get('/users', async (req, res) => {
//   const users = [
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Bob Williams' },
//     { id: 3, name: 'Shannon Jackson'},
//    ];

setTimeout(async ()=> {
const limit = +req.query.limit || 10;

const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
const users = await response.json()

   res.send(`
        <h2>Users</h2>
        <ul class="list-group">
          ${users
                .map((user)=>`<li class="list-group-item">${user.name}</li>`)
                .join('')}
        </ul>
        `)
  },2000)
});


// Start the server
app.listen (3000, ()=>{
        console. log('Server listening on port 3000');
});

// server.js: "// This code sets up a simple Express.js server that serves static files, 
// parses incoming request bodies, and provides a /users endpoint. 
// When a GET request is made to /users, the server waits 2 seconds, 
// fetches a limited list of users from the JSONPlaceholder API (default limit of 10), 
// and responds with an HTML list of user names. The server listens for requests on port 3000."