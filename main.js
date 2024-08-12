let score = 0;
const totalQuestions = document.querySelectorAll(".question").length;

/**
 * Checks the selected answer upon user interaction.
 * Disables further clicks on options, highlights correct and incorrect answers,
 * updates the score, and shows a modal when all questions have been answered.
 * @param {Event} event - The event object triggered by the user interaction.
 */
const checkAnswer = (event) => {
  const selectedOption = event.target;
  const questionElement = selectedOption.closest(".question");
  const correctAnswer = questionElement.dataset.correct;
  const options = questionElement.querySelectorAll("li");

  // Disable further clicks on options
  options.forEach((option) => {
    option.style.pointerEvents = "none";
  });

  if (selectedOption.textContent === correctAnswer) {
    selectedOption.classList.add("correct"); // Highlight correct answer
    score++; // Update the score for correct answer
  } else {
    selectedOption.classList.add("incorrect"); // Highlight wrong answer
    const correctOption = Array.from(options).find(
      (option) => option.textContent === correctAnswer
    );
    correctOption.classList.add("correct"); // Highlight correct answer
  }

  // Check if all questions have been answered
  if (
    document.querySelectorAll(".question ul li.correct").length ===
    totalQuestions
  ) {
    showModal(); // Show modal when all questions have been answered
  }
};

/**
 * Displays a modal with the user's score.
 *
 * This function retrieves the modal and score text elements from the DOM,
 * updates the score text with the user's score, and then displays the modal.
 */
const showModal = () => {
  const modal = document.getElementById("score-modal");
  const scoreText = document.getElementById("score-text");
  scoreText.textContent = `You scored ${score}/${totalQuestions}`;
  modal.style.display = "block";
};

/**
 * Closes the modal by setting its display style to "none".
 * This function targets the element with the ID "score-modal" and resets the quiz.
 */
const closeModal = () => {
  document.getElementById("score-modal").style.display = "none";
  resetQuiz(); // Reset the quiz after closing the modal
};

/**
 * Resets the quiz by clearing scores and removing styles.
 * This function resets the score and styles of all options.
 */
const resetQuiz = () => {
  score = 0; // Reset the score
  document.querySelectorAll(".question ul li").forEach((option) => {
    option.classList.remove("correct", "incorrect"); // Remove styles
    option.style.pointerEvents = ""; // Re-enable clicks
  });
  document.querySelectorAll(".question").forEach((question) => {
    // Re-enable clicks for all options in each question
    question.querySelectorAll("li").forEach((option) => {
      option.style.pointerEvents = "";
    });
  });
};

// Attach event listeners to each option
/**
 * Adds a click event listener to each list item within elements that match the selector ".question ul li".
 * When a list item is clicked, the checkAnswer function is called.
 */
document.querySelectorAll(".question ul li").forEach((option) => {
  option.addEventListener("click", checkAnswer);
});
