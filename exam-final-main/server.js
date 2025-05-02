const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000
;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Shuffle function to randomize an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// Questions categorized by different domains
const questions = {
    "Full Stack": [
        { id: 1, text: "What is the purpose of the MVC pattern?", type: "descriptive" },
        { id: 5, text: "What is Node.js used for?", choices: ["A runtime for executing JavaScript", "A front-end framework", "A database", "A CSS preprocessor"], correctAnswer: "A runtime for executing JavaScript", type: "multiple-choice" },
        { id: 8, text: "Explain the concept of responsive design.", type: "descriptive" },
        { id: 1, text: "What is a REST API?", choices: ["A", "B", "C", "D"], correctAnswer: "A" },
        { id: 4, text: "What is the difference between front-end and back-end development?", choices: ["UI vs Server", "CSS vs HTML", "JS only", "None"], correctAnswer: "UI vs Server" },
        { id: 5, text: "What is Node.js used for?", choices: ["Frontend", "Backend", "Both", "None"], correctAnswer: "Backend" },
        { id: 6, text: "What is a web server?", choices: ["HTML Storage", "Database", "Hosts websites", "API only"], correctAnswer: "Hosts websites" },
        { id: 7, text: "What is the role of a database in a web application?", choices: ["Stores data", "Hosts website", "Frontend only", "None"], correctAnswer: "Stores data" },
        { id: 8, text: "Explain the concept of responsive design.", choices: ["For mobile only", "For backend", "Adapts to screen size", "For desktop only"], correctAnswer: "Adapts to screen size" },
        { id: 9, text: "What is the purpose of AJAX?", choices: ["Fetch data", "Secure data", "Cache data", "Style data"], correctAnswer: "Fetch data" },
        { id: 10, text: "How do you manage state in a React application?", choices: ["Redux", "Node.js", "SQL", "HTML"], correctAnswer: "Redux" },
        { id: 11, text: "What is the use of CSS preprocessors?", choices: ["Enhance CSS", "Storage", "Debugging", "Database"], correctAnswer: "Enhance CSS" },
        { id: 12, text: "What is the purpose of a package manager?", choices: ["Install packages", "Data storage", "Database", "Memory management"], correctAnswer: "Install packages" },
        { id: 13, text: "How do you ensure the security of a web application?", choices: ["Authorization", "Styling", "CSS", "Designing"], correctAnswer: "Authorization" },
        { id: 14, text: "What are the advantages of using a JavaScript framework?", choices: ["Faster dev", "Better styling", "Data storage", "Security"], correctAnswer: "Faster dev" },
        { id: 15, text: "Explain the concept of middleware in web development.", choices: ["Middleware logic", "CSS", "HTML only", "API calls"], correctAnswer: "API calls" },
    ],
    "DSA": [
        { id: 1, text: "What is a binary search tree?", type: "descriptive" },
        { id: 6, text: "What is the time complexity of binary search?", choices: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], correctAnswer: "O(log n)", type: "multiple-choice" },
        { id: 8, text: "What are graph traversal algorithms?", type: "descriptive" },
        { id: 4, text: "How does a hash table work?", choices: ["Key-value storage", "Tree structure", "Stack", "Queue"], correctAnswer: "Key-value storage" },
        { id: 5, text: "What is recursion?", choices: ["Function calls itself", "Stack only", "No looping", "Queue only"], correctAnswer: "Function calls itself" },
        { id: 6, text: "Explain the time complexity of different sorting algorithms.", choices: ["O(n log n)", "O(n^2)", "O(1)", "Depends"], correctAnswer: "Depends" },
        { id: 7, text: "What is a linked list?", choices: ["A collection of nodes", "A type of array", "Static data structure", "None"], correctAnswer: "A collection of nodes" },
        { id: 8, text: "What is the purpose of an algorithm?", choices: ["To solve problems", "To store data", "To display data", "None"], correctAnswer: "To solve problems" },
        { id: 9, text: "What is the main advantage of a stack data structure?", choices: ["Faster access", "Last-in-first-out", "More memory", "None"], correctAnswer: "Last-in-first-out" },
        { id: 10, text: "What does Big O notation represent?", choices: ["Space complexity", "Time complexity", "Both", "None"], correctAnswer: "Time complexity" },
        { id: 11, text: "Which of the following is not a sorting algorithm?", choices: ["Quick sort", "Merge sort", "Heap sort", "Data sort"], correctAnswer: "Data sort" },
        { id: 12, text: "What is a breadth-first search?", choices: ["Searching tree level by level", "Searching depth first", "Searching binary trees only", "None"], correctAnswer: "Searching tree level by level" },
        { id: 13, text: "What is a binary tree?", choices: ["Tree with two children", "Tree with one child", "Single linked list", "None"], correctAnswer: "Tree with two children" },
        { id: 14, text: "What is the difference between a binary tree and a binary search tree?", choices: ["Binary tree has no rules", "Binary search tree allows duplicates", "Both have the same rules", "None"], correctAnswer: "Binary tree has no rules" },
        { id: 15, text: "What is the main purpose of a queue?", choices: ["Store data", "FIFO", "LIFO", "None"], correctAnswer: "FIFO" },
    ],
    "Machine Learning": [
        { id: 1, text: "What is supervised learning?", type: "descriptive" },
        { id: 4, text: "What are the types of machine learning?", choices: ["Supervised, Unsupervised, Reinforcement", "Classification, Clustering", "Decision Trees", "None of these"], correctAnswer: "Supervised, Unsupervised, Reinforcement", type: "multiple-choice" },
        { id: 6, text: "What is cross-validation?", choices: ["Data splitting for model testing", "Only for supervised models", "A type of neural network", "None"], correctAnswer: "Data splitting for model testing", type: "multiple-choice" },
    ],
    "Deep Learning": [
        { id: 1, text: "What are neural networks?", type: "descriptive" },
        { id: 4, text: "What are activation functions?", type: "descriptive" },
        { id: 10, text: "What is the role of backpropagation in training neural networks?", type: "descriptive" },
    ],
    "Aptitude": [
        { id: 1, text: "If a train travels 60 miles in 1 hour, how long will it take to travel 180 miles?", type: "descriptive" },
        { id: 6, text: "What is the value of 25% of 200?", choices: ["25", "50", "75", "100"], correctAnswer: "50", type: "multiple-choice" },
        { id: 9, text: "What is the sum of the angles in a triangle?", type: "descriptive" },
        { id: 4, text: "How does a hash table work?", choices: ["Key-value storage", "Tree structure", "Stack", "Queue"], correctAnswer: "Key-value storage" },
        { id: 5, text: "What is recursion?", choices: ["Function calls itself", "Stack only", "No looping", "Queue only"], correctAnswer: "Function calls itself" },
        { id: 6, text: "Explain the time complexity of different sorting algorithms.", choices: ["O(n log n)", "O(n^2)", "O(1)", "Depends"], correctAnswer: "Depends" },
        { id: 7, text: "What is a linked list?", choices: ["A collection of nodes", "A type of array", "Static data structure", "None"], correctAnswer: "A collection of nodes" },
        { id: 8, text: "What is the purpose of an algorithm?", choices: ["To solve problems", "To store data", "To display data", "None"], correctAnswer: "To solve problems" },
        { id: 9, text: "What is the main advantage of a stack data structure?", choices: ["Faster access", "Last-in-first-out", "More memory", "None"], correctAnswer: "Last-in-first-out" },
        { id: 10, text: "What does Big O notation represent?", choices: ["Space complexity", "Time complexity", "Both", "None"], correctAnswer: "Time complexity" },
        { id: 11, text: "Which of the following is not a sorting algorithm?", choices: ["Quick sort", "Merge sort", "Heap sort", "Data sort"], correctAnswer: "Data sort" },
        { id: 12, text: "What is a breadth-first search?", choices: ["Searching tree level by level", "Searching depth first", "Searching binary trees only", "None"], correctAnswer: "Searching tree level by level" },
        { id: 13, text: "What is a binary tree?", choices: ["Tree with two children", "Tree with one child", "Single linked list", "None"], correctAnswer: "Tree with two children" },
        { id: 14, text: "What is the difference between a binary tree and a binary search tree?", choices: ["Binary tree has no rules", "Binary search tree allows duplicates", "Both have the same rules", "None"], correctAnswer: "Binary tree has no rules" },
        { id: 15, text: "What is the main purpose of a queue?", choices: ["Store data", "FIFO", "LIFO", "None"], correctAnswer: "FIFO" },
    ]
};
app.post('/submitAnswers', (req, res) => {
    const { aptitudeScore } = req.body;
    // Assuming totalScore is calculated here
    const totalScore = aptitudeScore; // Adjust as needed based on your scoring logic
    res.json({ totalScore });
});


// Endpoint to get random questions based on selected domains
app.post('/getRandomQuestions', (req, res) => {
    const domains = Object.keys(questions);
    let randomQuestions = [];

    // Collect questions from each domain
    domains.forEach(domain => {
        const domainQuestions = questions[domain];
        if (domainQuestions) {
            // Shuffle the domain questions
            shuffleArray(domainQuestions);
            randomQuestions.push(...domainQuestions);
        }
    });

    // Shuffle the combined questions
    shuffleArray(randomQuestions);
    
    // Select the first 50 questions
    const selectedQuestions = randomQuestions.slice(0, 50);

    res.json({ questions: selectedQuestions });
});

// Endpoint to submit answers
app.post('/submitAnswers', (req, res) => {
    const { answers } = req.body; // Answers array should include both descriptive and multiple-choice responses
    let totalScore = 0;

    answers.forEach(answer => {
        const { questionId, selectedOption, isDescriptive, descriptiveAnswer } = answer;
        const question = Object.values(questions).flat().find(q => q.id === questionId);

        // Check for multiple-choice questions
        if (question && question.type === "multiple-choice") {
            if (selectedOption === question.correctAnswer) {
                totalScore += 1; // Increment score for correct answer
            }
        }
        // Descriptive questions can be scored based on custom logic, for example, checking answer length
        else if (question && question.type === "descriptive") {
            if (descriptiveAnswer) {
                totalScore += 1; // You can implement your scoring logic for descriptive answers here
            }
        }
    });

    res.json({ totalScore });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
