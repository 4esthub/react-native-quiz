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
  const [score, setScore] = useState(-1);

  const handleCompleted = (score) => {
    setScore(score);
  };

  const handleReset = () => {
    setScore(-1);
  }

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
    if (score >= 0) {
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
    } else if (questions.length) {
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
