import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Award } from "lucide-react";

const questions = [ 
    // HTML Questions
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
    { question: "Which HTML tag is used to define an internal stylesheet?", options: ["<style>", "<script>", "<css>", "<link>"], answer: "<style>" },
    { question: "What is the purpose of the `<head>` tag in HTML?", options: ["Defines the main content", "Contains metadata and links", "Creates a heading", "Displays images"], answer: "Contains metadata and links" },
    { question: "Which tag is used for creating a hyperlink?", options: ["<link>", "<a>", "<href>", "<nav>"], answer: "<a>" },
    { question: "Which attribute is used to open a link in a new tab?", options: ["target='_blank'", "new_tab='true'", "open='new'", "window='new'"], answer: "target='_blank'" },
    { question: "What is the correct way to insert an image in HTML?", options: ["<img src='image.jpg'>", "<image>image.jpg</image>", "<img>image.jpg</img>", "<pic src='image.jpg'>"], answer: "<img src='image.jpg'>" },
    { question: "Which HTML tag is used to define a table?", options: ["<table>", "<tab>", "<tr>", "<td>"], answer: "<table>" },
    { question: "Which tag is used to create an ordered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: "<ol>" },
    { question: "Which HTML tag is used for a line break?", options: ["<br>", "<lb>", "<break>", "<line>"], answer: "<br>" },
    { question: "What does the `<meta>` tag do in HTML?", options: ["Defines metadata about a webpage", "Creates a form", "Adds images", "Styles the page"], answer: "Defines metadata about a webpage" },
  
    // CSS Questions
    { question: "What property is used to change the text color in CSS?", options: ["color", "background-color", "text-color", "font-color"], answer: "color" },
    { question: "Which CSS property is used to make text bold?", options: ["font-weight", "text-style", "bold", "font-bold"], answer: "font-weight" },
    { question: "Which CSS property is used to set background color?", options: ["background-color", "color", "bgcolor", "background"], answer: "background-color" },
    { question: "Which CSS property is used to control the spacing between elements?", options: ["margin", "padding", "border", "spacing"], answer: "margin" },
    { question: "Which CSS unit is relative to the font size of the element?", options: ["px", "em", "cm", "%"], answer: "em" },
    { question: "What is the default position of an HTML element?", options: ["relative", "absolute", "static", "fixed"], answer: "static" },
    { question: "Which CSS property is used to make an element transparent?", options: ["visibility", "opacity", "display", "transparent"], answer: "opacity" },
    { question: "Which CSS property is used for creating rounded corners?", options: ["border", "border-radius", "corner", "rounding"], answer: "border-radius" },
    { question: "Which pseudo-class selects the first child of an element?", options: [":first-child", ":last-child", ":nth-child(1)", ":first"], answer: ":first-child" },
    { question: "Which CSS property is used to align text?", options: ["text-align", "align", "justify", "position"], answer: "text-align" },
  
    // React Questions
    { question: "What is JSX in React?", options: ["A JavaScript extension", "A CSS framework", "A package manager", "A database query language"], answer: "A JavaScript extension" },
    { question: "Which React hook is used for managing state?", options: ["useEffect", "useState", "useContext", "useReducer"], answer: "useState" },
    { question: "Which method is used to render components in React?", options: ["ReactDOM.render()", "React.render()", "renderComponent()", "createComponent()"], answer: "ReactDOM.render()" },
    { question: "How do you pass data from a parent component to a child component in React?", options: ["Using props", "Using state", "Using Redux", "Using context"], answer: "Using props" },
    { question: "Which React hook is used for side effects?", options: ["useEffect", "useState", "useRef", "useContext"], answer: "useEffect" },
    { question: "What is the main purpose of React?", options: ["To manage databases", "To build UI components", "To create servers", "To handle CSS"], answer: "To build UI components" },
    { question: "Which file is the entry point of a React application?", options: ["index.js", "App.js", "main.js", "server.js"], answer: "index.js" },
    { question: "What does the useState hook return?", options: ["A state variable and a function to update it", "A single state variable", "A function to update state", "A new React component"], answer: "A state variable and a function to update it" },
    { question: "Which function is used to create a new React component?", options: ["function Component()", "new Component()", "createComponent()", "class Component"], answer: "function Component()" },
    { question: "Which command is used to create a new React app?", options: ["npx create-react-app my-app", "npm install react", "react init my-app", "create-react-app my-app"], answer: "npx create-react-app my-app" },
    { question: "How do you handle forms in React?", options: ["Using state", "Using Redux", "Using jQuery", "Using HTML forms"], answer: "Using state" },
    { question: "What is the virtual DOM in React?", options: ["A lightweight copy of the actual DOM", "A different programming language", "A cloud database", "A styling method"], answer: "A lightweight copy of the actual DOM" },
    { question: "Which React hook is used for managing global state?", options: ["useContext", "useState", "useEffect", "useReducer"], answer: "useContext" },
    { question: "What is React Router used for?", options: ["Handling navigation", "Managing global state", "Styling components", "Fetching APIs"], answer: "Handling navigation" },
    { question: "How can you apply CSS styles in a React component?", options: ["Inline styles, CSS files, or styled-components", "Only inline styles", "Only CSS files", "Only styled-components"], answer: "Inline styles, CSS files, or styled-components" },
    { question: "Which lifecycle method runs after a component mounts?", options: ["componentDidMount", "componentWillMount", "render", "componentDidUpdate"], answer: "componentDidMount" },
    { question: "Which keyword is used to create a functional component in React?", options: ["function", "class", "component", "define"], answer: "function" },
    { question: "What does `npm start` do in a React project?", options: ["Runs the development server", "Builds the project", "Installs dependencies", "Deploys the app"], answer: "Runs the development server" },
    { question: "Which hook is used to get a reference to a DOM element in React?", options: ["useRef", "useState", "useEffect", "useMemo"], answer: "useRef" },
    { question: "Which hook is used to perform side effects in React?", options: ["useEffect", "useState", "useContext", "useReducer"], answer: "useEffect" }
  ];
  

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizTimer, setQuizTimer] = useState(600);
  const [questionTimer, setQuestionTimer] = useState(15);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const quizInterval = setInterval(() => {
      setQuizTimer((prev) => {
        if (prev <= 1) {
          setShowSummary(true);
          clearInterval(quizInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(quizInterval);
  }, []);

  useEffect(() => {
    const questionInterval = setInterval(() => {
      if (!showResult && questionTimer > 0) {
        setQuestionTimer((prev) => prev - 1);
      } else if (!showResult && questionTimer === 0) {
        handleNextQuestion();
      }
    }, 1000);

    return () => clearInterval(questionInterval);
  }, [questionTimer, showResult]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const correct = option === questions[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setQuestionTimer(15);
    } else {
      setShowSummary(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(answers[currentQuestion - 1]);
      setShowResult(false);
      setQuestionTimer(0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md text-white">
          <div className="flex items-center justify-center mb-6">
            <Award className="w-12 h-12 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Quiz Complete!</h2>
          <div className="space-y-4">
            <p className="text-center text-xl">Final Score: {score}/{questions.length}</p>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${(score / questions.length) * 100}%` }}
              />
            </div>
            <p className="text-center text-sm opacity-80">
              Time taken: {formatTime(600 - quizTimer)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress and Timer Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white">Progress: {currentQuestion + 1}/{questions.length}</span>
            <div className="flex items-center text-white">
              <Clock className="w-4 h-4 mr-2" />
              {formatTime(quizTimer)}
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4">
          {!showResult ? (
            <>
              <h2 className="text-xl font-semibold text-white mb-6">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    disabled={questionTimer === 0}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 
                      ${selectedOption === option 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-white/5 hover:bg-white/20 text-white'}
                      ${questionTimer === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102'}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-white">
                <span className="text-sm">Time left for question:</span>
                <span className="text-lg font-semibold">{questionTimer}s</span>
              </div>
            </>
          ) : (
            <div className={`text-center p-6 rounded-xl ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              <div className="flex justify-center mb-4">
                {isCorrect ? (
                  <CheckCircle className="w-16 h-16" />
                ) : (
                  <XCircle className="w-16 h-16" />
                )}
              </div>
              <p className="text-xl font-bold mb-4">
                {isCorrect ? "Correct!" : "Incorrect!"}
              </p>
              <p className="text-white opacity-80">
                {isCorrect 
                  ? "Great job! Let's move to the next question." 
                  : `The correct answer was: ${questions[currentQuestion].answer}`}
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-xl backdrop-blur-lg transition-all duration-200
              ${currentQuestion === 0 
                ? 'bg-white/10 cursor-not-allowed opacity-50' 
                : 'bg-white/20 hover:bg-white/30 text-white'}
            `}
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestion === questions.length - 1 && !showResult}
            className={`px-6 py-3 rounded-xl backdrop-blur-lg transition-all duration-200
              ${currentQuestion === questions.length - 1 && !showResult
                ? 'bg-white/10 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white'}
            `}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;