let currentResult;
let term1, term2, rawTerm2;

// Generates a new expression with two terms
function generateExpression() {
  do {
    term1 = Math.floor(Math.random() * 201) - 100; // Number between -100 and 100
    rawTerm2 = Math.floor(Math.random() * 201) - 100; // Number between -100 and 100

    // Introduce the double negative case
    const isDoubleNegative = Math.random() > 0.7; // 30% probability of generating a -(-n)
    term2 = isDoubleNegative ? -rawTerm2 : rawTerm2;

    const operator = Math.random() > 0.5 ? '+' : '-';
    currentResult = operator === '+' ? term1 + term2 : term1 - term2;
  } while (currentResult === 0); // Retry if the result is 0

  const term2Display = term2 !== rawTerm2 ? `-(${rawTerm2})` : term2;
  const operator = currentResult === term1 + term2 ? '+' : '-';
  const expressionText = operator === '+' ? `${term1} + (${term2Display})` : `${term1} - (${term2Display})`;

  document.getElementById('expression').innerText = expressionText;
  document.getElementById('result').innerText = '';
}

// Verifies if the answer is correct, plays the sound, and shows the result
function checkAnswer(answer) {
  const isPositive = currentResult >= 0;
  const userIsCorrect = (answer === 'positive' && isPositive) || (answer === 'negative' && !isPositive);

  if (userIsCorrect) {
    document.getElementById('result').innerText = 'Correct! 🎉';
    playSound('correct');
  } else {
    const correctAnswer = isPositive ? 'positive' : 'negative';
    const resultDescription = isPositive ? 'positive' : 'negative'; // Determine if the result is positive or negative
    document.getElementById('result').innerText = 
      `Incorrect. ❌ The correct answer is ${correctAnswer}. The result is ${currentResult}. Therefore, the result is ${resultDescription}.`;
    playSound('incorrect');
  }
}

// Plays a sound based on the answer
function playSound(type) {
  const sound = document.getElementById(type === 'correct' ? 'correctSound' : 'incorrectSound');
  sound.play();
}

// Generates the first expression when the page loads
generateExpression();
