const questions = [
    {
        type: 'radio',
        question: 'What does HTML stand for?',
        options: ['Hyper Text Preprocessor', 'Hyper Text Markup Language', 'Hyper Text Multiple Language', 'Hyper Tool Multi Language'],
        correctAnswer: 'Hyper Text Markup Language'
    },
    {
        type: 'radio',
        question: 'What does CSS stand for?',
        options: ['Common Style Sheet', 'Colorful Style Sheet', 'Computer Style Sheet', 'Cascading Style Sheet'],
        correctAnswer: 'Cascading Style Sheet'
    },
    {
        type: 'radio',
        question: 'What does PHP stand for?',
        options: ['Hypertext Preprocessor', 'Hypertext Programming', 'Hypertext Preprogramming', 'Hometext Preprocessor'],
        correctAnswer: 'Hypertext Preprocessor'
    },
    {
        type: 'radio',
        question: 'What does SQL stand for?',
        options: ['Stylish Question Language', 'Stylesheet Query Language', 'Statement Question Language', 'Structured Query Language'],
        correctAnswer: 'Structured Query Language'
    },
    {
        type: 'radio',
        question: 'What does XML stand for?',
        options: ['eXtensible Markup Language', 'eXecutable Multiple Language', 'eXTra Multi-Program Language', 'eXamine Multiple Language'],
        correctAnswer: 'eXtensible Markup Language'
    },
    {
        type: 'radio',
        question: 'Which HTML tag is used to define an internal style sheet?',
        options: ['<style>', '<script>', '<css>', '<link>'],
        correctAnswer: '<style>'
    },
    {
        type: 'radio',
        question: 'Which property is used to change the background color in CSS?',
        options: ['color', 'bgcolor', 'background-color', 'background'],
        correctAnswer: 'background-color'
    },
    {
        type: 'radio',
        question: 'Which CSS property controls the text size?',
        options: ['font-style', 'text-size', 'font-size', 'text-style'],
        correctAnswer: 'font-size'
    },
    {
        type: 'radio',
        question: 'Which built-in method combines the text of two strings and returns a new string?',
        options: ['append()', 'concat()', 'attach()', 'link()'],
        correctAnswer: 'concat()'
    },
    {
        type: 'radio',
        question: 'Which of the following is a valid JavaScript variable name?',
        options: ['2names', 'first-name', '_first_and_last_names', 'first&last'],
        correctAnswer: '_first_and_last_names'
    },
    {
        type: 'radio',
        question: 'Which tag is used to create a hyperlink in HTML?',
        options: ['<link>', '<a>', '<href>', '<hyperlink>'],
        correctAnswer: '<a>'
    },
    {
        type: 'radio',
        question: 'Which attribute is used to specify the destination of a hyperlink in HTML?',
        options: ['src', 'href', 'link', 'dest'],
        correctAnswer: 'href'
    },
    {
        type: 'radio',
        question: 'Which of the following is the correct way to comment in CSS?',
        options: ['// comment', '/* comment */', '<!-- comment -->', '# comment'],
        correctAnswer: '/* comment */'
    },
    {
        type: 'radio',
        question: 'Which built-in method sorts the elements of an array?',
        options: ['changeOrder(order)', 'order()', 'sort()', 'None of the above.'],
        correctAnswer: 'sort()'
    },
    {
        type: 'radio',
        question: 'Which of the following functions is used to parse a string to an integer in JavaScript?',
        options: ['Integer.parse', 'parseInt()', 'parse()', 'None of the above.'],
        correctAnswer: 'parseInt()'
    },
    {
        type: 'radio',
        question: 'Which HTML tag is used to define an ordered list?',
        options: ['<ul>', '<ol>', '<li>', '<list>'],
        correctAnswer: '<ol>'
    },
    {
        type: 'radio',
        question: 'Which method is used to remove the whitespace at the beginning and end of a string?',
        options: ['strip()', 'trim()', 'cut()', 'None of the above.'],
        correctAnswer: 'trim()'
    },
    {
        type: 'radio',
        question: 'Which property is used to change the font of an element in CSS?',
        options: ['font-family', 'font-style', 'font-weight', 'font-size'],
        correctAnswer: 'font-family'
    },
    {
        type: 'radio',
        question: 'Which tag is used to create a line break in HTML?',
        options: ['<break>', '<lb>', '<br>', '<line>'],
        correctAnswer: '<br>'
    },
    {
        type: 'radio',
        question: 'Which of the following is not a reserved word in JavaScript?',
        options: ['interface', 'throws', 'program', 'short'],
        correctAnswer: 'program'
    }
];

const quizContainer = document.getElementById('quiz');
const paginationContainer = document.getElementById('pagination');
const submitButton = document.getElementById('submit');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const scorePopup = document.getElementById('score-popup');
const quizScore = document.getElementById('quiz-score');
const totalScore = document.getElementById('total-score');
const playAgainButton = document.getElementById('play-again');
const timerDisplay = document.querySelector('.timer-display');
const quizDuration = 10 * 60; // 10 minutes
let currentPage = 1;
const questionsPerPage = 5;
let userAnswers = {};
let timer;

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

function renderQuizPage(page) {
    quizContainer.innerHTML = '';

    const startIndex = (page - 1) * questionsPerPage;
    const endIndex = page * questionsPerPage;

    questions.slice(startIndex, endIndex).forEach((question, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<h2>${escapeHTML(question.question)}</h2>`;
        
        const optionsElement = document.createElement('div');
        optionsElement.classList.add('options');
        
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('label');
            optionElement.innerHTML = `
                <input type="${question.type}" name="question${startIndex + index}" value="${escapeHTML(option)}">
                ${escapeHTML(option)}
            `;
            optionsElement.appendChild(optionElement);
        });
        
        card.appendChild(questionElement);
        card.appendChild(optionsElement);
        quizContainer.appendChild(card);
    });

    prevPageButton.style.display = page === 1 ? 'none' : 'inline-block';
    nextPageButton.style.display = page === Math.ceil(questions.length / questionsPerPage) ? 'none' : 'inline-block';
    submitButton.style.display = page === Math.ceil(questions.length / questionsPerPage) ? 'inline-block' : 'none';
}

function renderPagination() {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= Math.ceil(questions.length / questionsPerPage); i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add('pagination-button');
        if (i === currentPage) {
            pageButton.disabled = true;
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderQuizPage(currentPage);
            renderPagination();
        });
        paginationContainer.appendChild(pageButton);
    }
}

function handlePageNavigation() {
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderQuizPage(currentPage);
            renderPagination();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(questions.length / questionsPerPage)) {
            currentPage++;
            renderQuizPage(currentPage);
            renderPagination();
        }
    });
}

function calculateScore() {
    let score = 0;

    questions.forEach((question, index) => {
        const questionIndex = index + 1;
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);

        if (selectedOption && selectedOption.value === question.correctAnswer) {
            score++;
        }
    });

    return score;
}

function displayScore() {
    const score = calculateScore();
    quizScore.innerText = score;
    totalScore.innerText = questions.length;

    scorePopup.style.display = 'block';
}

function startTimer() {
    let timeLeft = quizDuration;

    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            displayScore();
        }

        timeLeft--;
    }, 1000);
}

function resetQuiz() {
    currentPage = 1;
    userAnswers = {};
    scorePopup.style.display = 'none';
    startTimer();
    renderQuizPage(currentPage);
    renderPagination();
}

submitButton.addEventListener('click', () => {
    clearInterval(timer);
    displayScore();
});

playAgainButton.addEventListener('click', resetQuiz);

document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    renderQuizPage(currentPage);
    renderPagination();
    handlePageNavigation();
});