// const questionsContainer = document.getElementById("questionsContainer");
// const result = document.getElementById("result");

// async function generateExam() {
//     const category = document.getElementById("categorySelect").value;
//     const response = await fetch(`/getRandomQuestions?category=${category}`);
//     const data = await response.json();
    
//     questionsContainer.innerHTML = ''; // Clear previous questions
//     data.questions.forEach((question, index) => {
//         const questionDiv = document.createElement("div");
//         questionDiv.innerHTML = `
//             <p>${index + 1}. ${question.text}</p>
//             ${question.choices ? question.choices.map((choice, i) => `
//                 <label><input type="radio" name="q${question.id}" value="${i}"> ${choice}</label><br>
//             `).join('') : ''}
//         `;
//         questionsContainer.appendChild(questionDiv);
//     });
// }

// async function submitAnswers() {
//     const answers = Array.from(document.querySelectorAll('input[type="radio"]:checked'))
//         .map(input => ({ questionId: input.name, answer: input.value }));

//     const response = await fetch('/submitAnswers', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ answers })
//     });
//     const resultData = await response.json();
//     result.innerText = `Your Score: ${resultData.score}`;
// }
const questionsContainer = document.getElementById("questionsContainer");
const result = document.getElementById("result");
const codingPlatform = document.getElementById("codingPlatform");
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

async function generateExam() {
    const category = document.getElementById("categorySelect").value;
    const response = await fetch(`/getRandomQuestions?category=${category}`);
    const data = await response.json();
    
    questionsContainer.innerHTML = ''; // Clear previous questions
    data.questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `
            <p>${index + 1}. ${question.text}</p>
            ${question.choices ? question.choices.map((choice, i) => `
                <label><input type="radio" name="q${question.id}" value="${i}"> ${choice}</label><br>
            `).join('') : ''}
        `;
        questionsContainer.appendChild(questionDiv);
    });

    if (category === 'coding') {
        codingPlatform.style.display = 'block';
    } else {
        codingPlatform.style.display = 'none';
    }
}

async function runCode() {
    const code = editor.getValue();
    const response = await fetch('/runCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
    });
    const resultData = await response.json();
    document.getElementById("output").innerText = resultData.output;
}

async function submitAnswers() {
    const answers = Array.from(document.querySelectorAll('input[type="radio"]:checked'))
        .map(input => ({ questionId: input.name, answer: input.value }));

    const response = await fetch('/submitAnswers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
    });
    const resultData = await response.json();
    result.innerText = `Your Score: ${resultData.score}`;
}

