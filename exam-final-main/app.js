const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5002
; // You can use any port

// MongoDB connection string
const dbURI = 'mongodb://127.0.0.1:27017/examResult';  // Change this if using MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define a schema for storing form data and results
const formResultSchema = new mongoose.Schema({
    name: String,
    section: String,
    email: String,
    phone: String,
    mcqScore: Number,
    codingScore: Number,
    totalScore: Number,
    feedback1: String,
    feedback2: String,
    timestamp: { type: Date, default: Date.now }
});

const FormResult = mongoose.model('FormResult', formResultSchema);

// POST route to save form data and results
app.post('/submitFormDataAndResults', (req, res) => {
    const { name, section, email, phone, mcqScore, codingScore, totalScore, feedback1, feedback2 } = req.body;

    const formResult = new FormResult({
        name,
        section,
        email,
        phone,
        mcqScore,
        codingScore,
        totalScore,
        feedback1,
        feedback2
    });

    formResult.save()
        .then(() => res.status(200).json({ message: 'Form data and results saved successfully' }))
        .catch((err) => res.status(500).json({ message: 'Error saving form data and results', error: err }));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
