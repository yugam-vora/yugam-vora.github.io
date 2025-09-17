document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            title: "The 'Magnum Opus' Question",
            question: "Imagine your retirement party. What is the one accomplishment or quality someone highlights that would make you feel the proudest?"
        },
        {
            title: "The 'Perfect Ordinary Day' Question",
            question: "Describe your perfect, ordinary day, with no major celebrations. From morning to night, what does it look, sound, smell, and feel like?"
        },
        {
            title: "The 'Sanctuary' Question",
            question: "Describe your ideal personal sanctuary. It could be a room, a corner, or an outdoor space. What's in it, and what feeling does it give you?"
        },
        {
            title: "The 'Wisdom' Question",
            question: "Imagine your 80-year-old self could send a single, one-sentence message back to you today. What would it say?"
        },
        {
            title: "The 'Legacy in a Bottle' Question",
            question: "If you left a time capsule with one thing you created (a recipe, a story, a photo), what would it be and why?"
        },
        {
            title: "The 'Celebration' Question",
            question: "You get to host a dinner party to celebrate a personal achievement. Who is at the table, and what are you celebrating?"
        }
    ];

    let currentQuestionIndex = 0;
    const userAnswers = new Array(questions.length).fill('');

    const introScreen = document.getElementById('intro-screen');
    const questionnaireScreen = document.getElementById('questionnaire-screen');
    const completionScreen = document.getElementById('completion-screen');

    const startBtn = document.getElementById('start-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const copyBtn = document.getElementById('copy-btn');
    
    const questionTitleEl = document.getElementById('question-title');
    const questionTextEl = document.getElementById('question-text');
    const answerTextarea = document.getElementById('answer-textarea');
    const progressBarInner = document.getElementById('progress-bar-inner');
    const summaryTextarea = document.getElementById('summary-textarea');

    startBtn.addEventListener('click', () => {
        introScreen.classList.remove('active');
        questionnaireScreen.classList.add('active');
        showQuestion();
    });

    nextBtn.addEventListener('click', () => {
        userAnswers[currentQuestionIndex] = answerTextarea.value;
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showCompletionScreen();
        }
    });

    prevBtn.addEventListener('click', () => {
        userAnswers[currentQuestionIndex] = answerTextarea.value;
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    });

    copyBtn.addEventListener('click', () => {
        summaryTextarea.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy Answers'; }, 2000);
    });

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionTitleEl.textContent = currentQuestion.title;
        questionTextEl.textContent = currentQuestion.question;
        answerTextarea.value = userAnswers[currentQuestionIndex];

        updateProgressBar();
        updateNavigationButtons();
    }
    
    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBarInner.style.width = `${progress}%`;
    }

    function updateNavigationButtons() {
        prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
        nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
    }
    
    function showCompletionScreen() {
        let summary = '';
        questions.forEach((q, index) => {
            summary += `## ${q.title}\n\n${q.question}\n\nMy Answer:\n${userAnswers[index] || 'No answer.'}\n\n---\n\n`;
        });
        summaryTextarea.value = summary.trim();
        
        questionnaireScreen.classList.remove('active');
        completionScreen.classList.add('active');
    }
});