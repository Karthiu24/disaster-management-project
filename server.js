// server.js

console.log("Starting server...");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static HTML files

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, description, category, email } = req.body;

  if (!name || !description || !category || !email) {
    return res.status(400).send({ message: 'All fields are required!' });
  }

  // Save data to resources.json
  const newResource = { name, description, category, email };
  const filePath = './resources.json';

  let resources = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    if (data) {
      resources = JSON.parse(data);
    }
  }

  resources.push(newResource);
  fs.writeFileSync(filePath, JSON.stringify(resources, null, 2));

  console.log('Received resource:', newResource);

  // Send response without email functionality
  res.status(200).send({ message: 'Resource submitted successfully!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});