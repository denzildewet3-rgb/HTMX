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

// Handle GET request for profile edit
app.get("/user/:id/edit", (req, res) => {
  // send an HTML form for editing
  res.send(`
    <form hx-put="/user/${req.params.id}" hx-target="this" hx-swap="outerHTML">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" name="name" value="Greg Lim">
      </div>
      <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea type="text" class="form-control" id="bio" name="bio">Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses</textarea>
       </div>
      <button type="submit" class="btn btn-primary">
        Save Changes
      </button>
      <button type="button" hx-get="/index.html" class="btn btn-secondary">
        Cancel
      </button>
    </form>
 `);
});

// Handle PUT request for editing
app.put("/user/:id", (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;

  // Send the updated profile back with delete button
  res.send(`
    <div class="card" style="width: 18rem;"
      hx-target="this"
      hx-swap="outerHTML"
  >
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">
        ${bio}
      </p>
      <button class="btn btn-primary"
        hx-get="/user/${req.params.id}/edit">
        Click To Edit
      </button>
      <button class="btn btn-danger" 
        hx-delete="/user/${req.params.id}" 
        hx-confirm="Are you sure you want to delete this profile?">
        Delete
      </button>
    </div>
 </div>
 `);
});

app.delete("/user/:id", (req, res) => {
  // Return a card with empty name and bio but still editable
  res.send(`
    <div class="card" style="width: 18rem;"
         hx-target="this"
         hx-swap="outerHTML">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
        <button class="btn btn-primary" hx-get="/user/${req.params.id}/edit">
          Click To Edit
        </button>
        <button class="btn btn-danger" 
                hx-delete="/user/${req.params.id}" 
                hx-confirm="Are you sure you want to delete this profile?">
          Delete
        </button>
      </div>
    </div>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Summary:
// This Express.js server demonstrates an HTMX-powered inline profile editor.
// It serves static files and handles form submissions via URL-encoded + JSON middleware.
// Routes:
//  - GET /user/:id/edit → returns an HTML form for editing a user's name and bio.
//  - PUT /user/:id → receives updated data and returns an updated profile card snippet.
//  - DELETE /user/:id → returns an empty editable card and supports re-deletion.
// HTMX attributes (hx-get, hx-put, hx-delete, hx-target, hx-swap) enable dynamic,
// partial page updates without any client-side JavaScript.
// The server listens on port 3000