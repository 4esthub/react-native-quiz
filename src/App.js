import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View, 
  Text
} from 'react-native';

import Quiz from './components/workflows/Quiz'

const App = () => {
  const [questions, setQuestions] = useState([]);

  const handleCompleted = (score = 'undefined') => {
    console.log(`quiz completed with a score of ${score}`);
  };

  useEffect(() => {
    (async function fetchData () {
      const res = await fetch(
        `http://interview.workwhilejobs.com/quiz/questions`
      );
      const json = await res.json();

      setQuestions(json);
    })();
  }, []);


  const MainView = () => {
    if (questions.length &&
        questions[0].question.length &&
        questions[0].answers.length &&
        questions[0].correct_index) {
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
