// Initialize the user's score
let score = 0;

// Get the total number of questions in the quiz
const totalQuestions = document.querySelectorAll(".question").length;

// Object to store the correct answers for each question
// Each key corresponds to a question's ID, and the value is the correct answer
const correctAnswers = {
  q1: "Paris",
  q2: "2",
  q3: "H2O",
};

/**
 * Function to check the selected answer upon user interaction.
 * This function will:
 * - Disable further clicks on the options for the question.
 * - Highlight the selected answer as correct or incorrect.
 * - Update the score if the answer is correct.
 * - Display a modal with the final score once all questions have been answered.
 *
 * @param {Event} event - The event object triggered by the user interaction.
 */
const checkAnswer = (event) => {
  // The option that the user clicked on
  const selectedOption = event.target;

  // The entire question element that contains the clicked option
  const questionElement = selectedOption.closest(".question");

  // The ID of the question, used to match it with the correct answer
  const questionId = questionElement.id;

  // Retrieve the correct answer for the question from the correctAnswers object
  const correctAnswer = correctAnswers[questionId];

  // Get all the options (list items) for the current question
  const options = questionElement.querySelectorAll("li");

  // Disable further clicks on the options to prevent multiple selections
  options.forEach((option) => {
    option.style.pointerEvents = "none";
  });

  // Check if the selected option matches the correct answer
  if (selectedOption.textContent === correctAnswer) {
    // If correct, apply the 'correct' class and add a green border to indicate correctness
    selectedOption.classList.add("correct");
    selectedOption.style.border = "2px solid green";

    // Increment the user's score
    score++;
  } else {
    // If incorrect, apply the 'incorrect' class and add a red border to indicate incorrectness
    selectedOption.classList.add("incorrect");
    selectedOption.style.border = "2px solid red";

    // Also, find the correct option and highlight it with a green border
    const correctOption = Array.from(options).find(
      (option) => option.textContent === correctAnswer
    );
    correctOption.classList.add("correct");
    correctOption.style.border = "2px solid green";
  }

  // Check if the user has answered all the questions by counting the correct answers
  if (
    document.querySelectorAll(".question ul li.correct").length ===
    totalQuestions
  ) {
    // If all questions are answered, display the modal with the final score
    showModal();
  }
};

/**
 * Function to display the modal with the user's final score.
 * This function retrieves the modal and score text elements,
 * updates the score text with the user's score, and then displays the modal.
 */
const showModal = () => {
  const modal = document.getElementById("score-modal");
  const scoreText = document.getElementById("score-text");

  // Set the text content of the score text to show the user's final score
  scoreText.textContent = `You scored ${score}/${totalQuestions}`;

  // Make the modal visible by changing its display style
  modal.style.display = "block";
};

/**
 * Function to close the modal and reset the quiz.
 * This function hides the modal and resets the quiz by clearing scores
 * and removing styles from the previous attempt.
 */
const closeModal = () => {
  // Hide the modal by setting its display style to "none"
  document.getElementById("score-modal").style.display = "none";

  // Call resetQuiz to prepare the quiz for another attempt
  resetQuiz();
};

/**
 * Function to reset the quiz to its initial state.
 * This function clears the score, removes any correct or incorrect styles from the options,
 * and re-enables the ability to click on the options.
 */
const resetQuiz = () => {
  // Reset the user's score to 0
  score = 0;

  // Loop through all the options in the quiz
  document.querySelectorAll(".question ul li").forEach((option) => {
    // Remove the 'correct' and 'incorrect' classes from the options
    option.classList.remove("correct", "incorrect");

    // Re-enable the ability to click on the options
    option.style.pointerEvents = "";

    // Remove any border styling that was added
    option.style.border = "";
  });
};

// Attach a click event listener to each option in each question
// When an option is clicked, the checkAnswer function is called to process the user's selection
document.querySelectorAll(".question ul li").forEach((option) => {
  option.addEventListener("click", checkAnswer);
});
