particlesJS('particles-js', {
  particles: {
    number: {
      value: 80, // Number of particles
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#00FFFF" // Color of the particles (cyan blue)
    },
    shape: {
      type: "circle", // Particle shape (you can also use 'polygon' or 'edge')
      stroke: {
        width: 0,
        color: "#ffffff"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5, // Opacity of particles
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3, // Size of particles
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true, // Lines connecting the particles
      distance: 150,
      color: "#00FFFF", // Color of the lines
      opacity: 0.5,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse" // Effect when mouse hovers over particles
      },
      onclick: {
        enable: true,
        mode: "push" // Effect when clicked on canvas
      }
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});


const questionsPool = [
  { question: "Identify whether T or F : ∫tanxdx = log|secx| + C ", answer: "T" },
  { question: "d(tanx)/dx at x=0 is?", answer: "1" },
  { question: "Identify whether T or F : ∫logx = xlogx - x + C", answer: "T" },
  { question: "What is the slope of the tangent line to y = x³ at x = 2?", answer: "12" },
  { question: "Identify whether T or F : ∫sec²xdx/tanx = log|tanx| + C", answer: "T" },
  { question: "Identify whether T or F : For y = -sinx to be maximum, sinx has to be minimum", answer: "T" },
  { question: "d(arcsinx)/dx = -k/√(1-x²) ; find k", answer: "-1" },
  { question: "Identify whether T or F : If sinx=cosx, then x = nπ ± π/4, where n is any integer.", answer: "F" },
  { question: "For a function to be maximum or minimum, its ____(first/second) order derivative must be zero", answer: "first" },
  { question: "In the 1st quadrant, cosx, cosecx, and cotx are ____ (inc/dec) functions", answer: "dec" },
  { question: "What is the derivative of ln(x)?", answer: "1/x" },
  { question: "Find the value of d/dx(e^x) when x = 0", answer: "1"},
  { question: "", image: "1.jpg", answer: "0"},
  // Add more math-related questions here
];

const rewards = [
  "reward1.jpg", // Replace with your photo file names
  "reward2.jpg",
  "reward3.jpg",
  "reward4.jpg",
  "reward5.jpg",
  "reward6.jpg",
  "reward7.jpg",
  "reward8.jpg",
  "reward9.jpg",
  "reward10.jpg",
  // Add more photo file names here
];

function getRandomQuestions(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const questions = getRandomQuestions(questionsPool, 10);


// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle questions and rewards
shuffleArray(questions);
shuffleArray(rewards);

let currentQuestionIndex = 0;

const questionElement = document.getElementById('question');
const questionNumberElement = document.getElementById('question-number');
const answerElement = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const revealButton = document.getElementById('reveal');
const startButton = document.getElementById('start');
const galleryElement = document.getElementById('gallery');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');

startButton.addEventListener('click', () => {
  startButton.style.display = "none";
  answerElement.style.display = "block";
  submitButton.style.display = "inline-block";
  revealButton.style.display = "inline-block";
  previousButton.style.display = "inline-block";
  nextButton.style.display = "inline-block";
  loadQuestion();
});

submitButton.addEventListener('click', () => {
  const userAnswer = answerElement.value.trim();
  
  // Check if answer is correct
  if (userAnswer === questions[currentQuestionIndex].answer) {
    rewardPlayer();  // Reward for correct answer
    currentQuestionIndex++;  // Move to next question
    
    // If there are more questions, load the next one
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      // If no more questions, show completion message
      questionElement.textContent = "Congratulations! You've completed the quiz!";
      answerElement.style.display = "none";
      submitButton.style.display = "none";
      revealButton.style.display = "none";
      previousButton.style.display = "none";
      nextButton.style.display = "none";
    }
  } else {
    alert("Oops! Try again.");
  }
  
  // Clear the answer input field after each submission
  answerElement.value = "";
});

revealButton.addEventListener('click', () => {
  alert(`The correct answer is: ${questions[currentQuestionIndex].answer}`);
});

previousButton.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
});

function loadQuestion() {
  // Update the question number
  questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}`;
  
  // Update the question text
  questionElement.textContent = questions[currentQuestionIndex].question;
  
  // Add or update the image for the question
  const imageElement = document.getElementById('question-image');
  if (questions[currentQuestionIndex].image) {
    if (!imageElement) {
      // Create the image element if it doesn't exist
      const newImageElement = document.createElement('img');
      newImageElement.id = 'question-image';
      newImageElement.style.maxWidth = "100%";
      questionElement.appendChild(newImageElement);
    }
    document.getElementById('question-image').src = questions[currentQuestionIndex].image;
  } else if (imageElement) {
    // Remove the image if the question has none
    imageElement.remove();
  }
}

function rewardPlayer() {
  // Show reward for the correct answer
  const rewardImage = document.createElement('img');
  rewardImage.src = rewards[currentQuestionIndex]; // Rewards align with shuffled questions
  rewardImage.alt = `Reward ${currentQuestionIndex + 1}`;
  galleryElement.appendChild(rewardImage);
}
