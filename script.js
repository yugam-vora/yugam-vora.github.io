// Keep your existing script.js file, but REPLACE the `nextBtn` event listener
// and the `showCompletionScreen` function with these new versions.

// Find this part in your script.js:
nextBtn.addEventListener('click', () => {
    userAnswers[currentQuestionIndex] = answerTextarea.value;
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        // This function will now be empty as we are not showing a final screen
        showCompletionScreen(); 
    }
});

// And find this function:
function showCompletionScreen() {
    // ... all the old code ...
}


// REPLACE THEM WITH THIS:
nextBtn.addEventListener('click', (event) => {
    userAnswers[currentQuestionIndex] = answerTextarea.value;
    if (currentQuestionIndex < questions.length - 1) {
        event.preventDefault(); // Prevent form submission if it's not the last question
        currentQuestionIndex++;
        showQuestion();
    } else {
        // This is the last question, so we prepare the form for submission
        collateAnswersForSubmission();
        // The form will now submit naturally because we don't prevent the default action
    }
});

function collateAnswersForSubmission() {
    let summary = `Reflections from: ${userNameInput.value}\n`;
    if (userEmailInput.value) {
        summary += `Email: ${userEmailInput.value}\n`;
    }
    summary += `================================\n\n`;

    questions.forEach((q, index) => {
        summary += `## ${q.title}\n\n${q.question}\n\nAnswer:\n${userAnswers[index] || 'No answer.'}\n\n---\n\n`;
    });
    
    const allAnswersHiddenInput = document.getElementById('all-answers-hidden-input');
    allAnswersHiddenInput.value = summary.trim();
}

// You can delete the old showCompletionScreen function entirely.
// And you can delete the `completionScreen` and `submitBtn`/`copyBtn` variable declarations at the top.
