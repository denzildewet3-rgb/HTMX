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

let currentPrice = 60;

app.get("/get-price", (req, res) => {
  currentPrice = currentPrice + ((Math.random() * 2) - 1)
  res.send("$" + currentPrice.toFixed(1));
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