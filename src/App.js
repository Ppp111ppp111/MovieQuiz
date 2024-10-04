import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

const movieData = [
  { movie: "Dilwale Dulhania Le Jayenge", dialogue: "Ja Simran ja, jee le apni zindagi." },
  { movie: "Sholay", dialogue: "Kitne aadmi the?" },
  { movie: "Kuch Kuch Hota Hai", dialogue: "Pyaar dosti hai." },
  { movie: "Mughal-e-Azam", dialogue: "Salim, mohabbat zindagi hai aur zindagi ka dusra naam maut." },
  { movie: "Deewar", dialogue: "Mere paas maa hai." },
  { movie: "Zindagi Na Milegi Dobara", dialogue: "Seize the day my friend, pehle is din ko poori tarah jiyo, phir chalis ke baare mein sochna." },
  { movie: "3 Idiots", dialogue: "All is well!" },
  { movie: "Om Shanti Om", dialogue: "Ek chutki sindoor ki keemat, tum kya jaano Ramesh babu." },
  { movie: "Kabhi Khushi Kabhie Gham", dialogue: "Keh diya na? Bas. Keh diya." },
  { movie: "Lagaan", dialogue: "Sach aur angrezi cricket, dono seedhi cheez hai. Samajh mein aa jaayegi." }
];

const UserNamePage = ({ onSubmit }) => {
  const [userName, setUserName] = useState('');
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome to Bollywood Movie Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button className="mt-4" onClick={() => onSubmit(userName)}>Start Quiz</Button>
      </CardContent>
    </Card>
  );
};

const QuizPage = ({ userName, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [notification, setNotification] = useState('');

  const handleSubmit = () => {
    const isCorrect = currentAnswer.toLowerCase() === movieData[currentQuestion].movie.toLowerCase();
    setUserAnswers([...userAnswers, { answer: currentAnswer, correct: isCorrect }]);
    setCurrentAnswer('');

    if (!isCorrect) {
      setNotification('Wrong answer! Try again or use the hint.');
      setShowHint(true);
    } else {
      setNotification('Correct answer!');
      setShowHint(false);
      if (currentQuestion < movieData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete(userAnswers);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < movieData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowHint(false);
      setNotification('');
    } else {
      onComplete(userAnswers);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Question {currentQuestion + 1} of {movieData.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{movieData[currentQuestion].dialogue}</p>
        <Input
          placeholder="Enter movie name"
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
        />
        <Button className="mt-4" onClick={handleSubmit}>Submit Answer</Button>
        {showHint && (
          <p className="mt-2 text-yellow-600">Hint: The movie starts with "{movieData[currentQuestion].movie.charAt(0)}"</p>
        )}
        {notification && (
          <p className={`mt-2 ${notification.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>{notification}</p>
        )}
        {showHint && (
          <Button className="mt-4" onClick={handleNextQuestion}>
            {currentQuestion < movieData.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const ResultsPage = ({ userName, userAnswers }) => {
  const correctAnswers = userAnswers.filter((answer) => answer.correct).length;

  const userLevel = correctAnswers >= 8 ? "Movie Buff" : 
                    correctAnswers >= 5 ? "Regular Viewer" : "Casual Watcher";

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Congratulations, {userName}!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your Level: {userLevel}</p>
        <p>Correct Answers: {correctAnswers} out of {movieData.length}</p>
        <h3 className="mt-4 mb-2">Your Answers:</h3>
        <ul>
          {userAnswers.map((answer, index) => (
            <li key={index} className={answer.correct ? 'text-green-500' : 'text-red-500'}>
              {index + 1}. {answer.answer} {!answer.correct && `(Correct: ${movieData[index].movie})`}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const App = () => {
  const [userName, setUserName] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentPage, setCurrentPage] = useState('userName');

  const handleUserNameSubmit = (name) => {
    setUserName(name);
    setCurrentPage('quiz');
  };

  const handleQuizComplete = (answers) => {
    setUserAnswers(answers);
    setCurrentPage('results');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {currentPage === 'userName' && <UserNamePage onSubmit={handleUserNameSubmit} />}
      {currentPage === 'quiz' && <QuizPage userName={userName} onComplete={handleQuizComplete} />}
      {currentPage === 'results' && <ResultsPage userName={userName} userAnswers={userAnswers} />}
    </div>
  );
};

export default App;
