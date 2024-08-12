let score = 0;
const totalQuestions = document.querySelectorAll(".question").length;

// Object to store the correct answers
const correctAnswers = {
  q1: "Paris",
  q2: "2",
  q3: "H2O",
};

const checkAnswer = (event) => {
  const selectedOption = event.target;
  const questionElement = selectedOption.closest(".question");
  const questionId = questionElement.id; // Get the question's ID
  const correctAnswer = correctAnswers[questionId]; // Get the correct answer from the object
  const options = questionElement.querySelectorAll("li");

  // Disable further clicks on options
  options.forEach((option) => {
    option.style.pointerEvents = "none";
  });

  if (selectedOption.textContent === correctAnswer) {
    selectedOption.classList.add("correct"); // Highlight correct answer
    selectedOption.style.border = "2px solid green"; // Apply green border styling
    score++; // Update the score for correct answer
  } else {
    selectedOption.classList.add("incorrect"); // Highlight wrong answer
    selectedOption.style.border = "2px solid red"; // Apply red border styling
    const correctOption = Array.from(options).find(
      (option) => option.textContent === correctAnswer
    );
    correctOption.classList.add("correct"); // Highlight correct answer
    correctOption.style.border = "2px solid green"; // Apply green border styling to correct answer
  }

  // Check if all questions have been answered
  if (
    document.querySelectorAll(".question ul li.correct").length ===
    totalQuestions
  ) {
    showModal(); // Show modal when all questions have been answered
  }
};

const showModal = () => {
  const modal = document.getElementById("score-modal");
  const scoreText = document.getElementById("score-text");
  scoreText.textContent = `You scored ${score}/${totalQuestions}`;
  modal.style.display = "block";
};

const closeModal = () => {
  document.getElementById("score-modal").style.display = "none";
  resetQuiz(); // Reset the quiz after closing the modal
};

const resetQuiz = () => {
  score = 0; // Reset the score
  document.querySelectorAll(".question ul li").forEach((option) => {
    option.classList.remove("correct", "incorrect"); // Remove styles
    option.style.pointerEvents = ""; // Re-enable clicks
    option.style.border = ""; // Reset border styling
  });
};

// Attach event listeners to each option
document.querySelectorAll(".question ul li").forEach((option) => {
  option.addEventListener("click", checkAnswer);
});
