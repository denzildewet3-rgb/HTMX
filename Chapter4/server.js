import express from "express";

// Inintialize an express app and store in a variable
const app = express();

//MIDDLEWARE
// Set static folder
app.use(express.static("public"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle POST request for contacts search
app.post('/search', async(req, res) => {

const searchTerm = req.body.search.toLowerCase();
if(!searchTerm) {
    return res.send('<tr></tr>');
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await response.json()

const searchResults = users.filter((user) =>{
  const name = user.name.toLowerCase();
  const email = user.email.toLowerCase();

  return name.includes(searchTerm) || email.includes(searchTerm)
})

const searchResultHtml = searchResults
  .map((user) => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
    </tr>
  `)
  .join('');

  res.send(searchResultHtml);
  
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Chat GPT Summary
// It starts with a variable currentPrice set to 60 (representing the Bitcoin price).

// The /get-price route simulates a changing Bitcoin price:
// - Each time the route is called, it adjusts currentPrice by a random number between -1 and +1.
// - This makes the price go slightly up or down every time.
// The server then sends back the updated price formatted as:
// This works perfectly with the HTMX front end that fetches /get-price every 5 seconds, creating a live-updating Bitcoin price display.