import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View, 
  Text,
  Button
} from 'react-native';

import Quiz from './components/workflows/Quiz'

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(-1);          // no longer determines quiz state
  const [quizState, setQuizState] = useState('');  // quizStates: '', 'active', 'completed' (perminent comment)

  const handleCompleted = (score) => {
    setScore(score);
    setQuizState('completed');  // set quiz state to completed
  };

  const handleReset = () => {
    setQuizState('active');  // set quiz state to playing, remove set score
  }

  useEffect(() => {
    (async function fetchData () {
      const res = await fetch(
        `http://interview.workwhilejobs.com/quiz/questions`
      );
      const json = await res.json();

      console.log(json);
      setQuestions(json);
      setQuizState('active'); // set gameState to playing
    })();
  }, []);


  const MainView = () => {
    if (quizState === 'completed') {  // check quiz state
      const total = questions.length;
      return (
        <View>
          <Text>{`You scored ${score}/${total}`}</Text>
            <Button 
              title="Reset"
              onPress={handleReset}
            />
        </View>
      )
    } else if (quizState === 'active') {  // check quiz state
      return (
        <Quiz 
          questions={questions}
          completed={handleCompleted}
        />
      );
    } else {
      return (
        <Text>App Loading...</Text>
      );
    }
  }

  return (
    <>
      <View style={styles.app}>
        <MainView />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  app: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default App;
