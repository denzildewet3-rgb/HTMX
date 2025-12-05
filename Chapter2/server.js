import express from "express";

// Inintialize an express app and store in a variable
const app = express();

//MIDDLEWARE
// Set static folder
app.use(express.static("public")); // Makes all files inside the public folder (HTML, CSS, images, JS) accessible to the browser.

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));  // Allows Express to read data submitted from HTML forms (e.g., text inputs).

// Parse JSON bodies (as sent by API clients)
app.use(express.json());  //Allows Express to understand JSON sent by APIs or JavaScript fetch requests.

app.post("/calculate", (req, res) => {
  const height = parseFloat(req.body.height);
  console.log("Heigth = ", height)

  const weight = parseFloat(req.body.weight);
  console.log("Weigth = ", weight)

  const bmi = weight / (height * height);
  console.log("BMI = ", bmi)

let message = "";

if (bmi < 18.5) {
  message = `<p style="color: blue;">You are Underweight.</p>`;
} else if (bmi >= 18.5 && bmi < 24.9) {
  message = `<p style="color: green;">You are in the Healthy range.</p>`
} else if (bmi >= 25 && bmi < 29.9) {
  message = `<p style="color: orange;">You are Overweight.</p>`
} else {
  message = `<p style="color: red;">You are Obese.</p>`
}

  res.send(`
        <p>Height of <strong>${height}</strong> and Weight of <strong>${weight}</strong> gives you BMI of <strong>${bmi.toFixed(2)}</strong></p>
        <p><strong>${message}</strong></p>`);
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Chat GPT Summary
// This route handles the BMI Calculator form submission.
// - When the form sends a POST request to /calculate, this function runs.
// - It extracts the height and weight values from the form (req.body).
// - It converts both values from text to numbers using parseFloat.

// - It calculates the BMI using the formula:
// BMI = weight / (height * height)

// - It logs the height, weight, and BMI to the console (useful for debugging).
// - Finally, it sends back an HTML snippet showing the result:
// Height of X & Weight of Y gives you BMI of Z

// This result is displayed inside the <div id="result"></div> on the page because of HTMX.