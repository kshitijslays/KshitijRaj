import { useState, useEffect } from "react";

const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Who developed React?", options: ["Google", "Facebook", "Microsoft", "Apple"], answer: "Facebook" },
  { question: "What is the largest planet?", options: ["Earth", "Jupiter", "Mars", "Venus"], answer: "Jupiter" },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizTimer, setQuizTimer] = useState(600); // 10 minutes in seconds
  const [questionTimer, setQuestionTimer] = useState(15); // 15 seconds per question

  useEffect(() => {
    const quizInterval = setInterval(() => {
      setQuizTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(quizInterval);
  }, []);

  useEffect(() => {
    const questionInterval = setInterval(() => {
      if (questionTimer > 0) {
        setQuestionTimer((prev) => prev - 1);
      } else {
        handleNextQuestion();
      }
    }, 1000);

    return () => clearInterval(questionInterval);
  }, [questionTimer]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setQuestionTimer(15);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      <div className="text-xl font-bold">Quiz Timer: {Math.floor(quizTimer / 60)}:{String(quizTimer % 60).padStart(2, "0")}</div>

      {!showResult ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mt-4">
          <div className="text-lg font-semibold">
            {currentQuestion + 1}. {questions[currentQuestion].question}
          </div>
          <div className="mt-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`block w-full px-4 py-2 mt-2 rounded-md ${
                  selectedOption === option ? "bg-blue-600" : "bg-gray-700"
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm">Time left: {questionTimer}s</div>
          {selectedOption && (
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white py-2 mt-4 rounded-md"
            >
              Submit
            </button>
          )}
        </div>
      ) : (
        <div
          className={`w-full max-w-md p-6 rounded-lg shadow-lg text-center ${
            isCorrect ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="text-xl font-bold">
            {isCorrect ? "Correct Answer! ✅" : "Incorrect Answer ❌"}
          </div>
          <button
            onClick={handleNextQuestion}
            className="w-full bg-white text-black py-2 mt-4 rounded-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
