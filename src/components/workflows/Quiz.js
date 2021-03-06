import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import PropTypes from 'prop-types';

import CountdownTimer from '../CountdownTimer';

const Quiz = (props) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);

  const handleSelect = (value) => {
    setSelected(value);
  }

  const handleSubmit = () => {
    const question = props.questions[index],
          answer = question.answers[question.correct_index];
    
    let currentScore = score;

    if (answer === selected) {
      currentScore++;
      setScore(currentScore);
    }

    if (index >= props.questions.length - 1) {
      props.completed(currentScore)
    } else {
      setIndex(index + 1);
      setSelected('');
    }
  }

  const handleTimerComplete = () => {
    props.completed(score)
  }

  const Question = (props) => {
    const answers = props.question.answers.map((e, i) => {
      return (
        <Button
          key={i}
          title={e}
          onPress={() => {handleSelect(e)}}
          color={e === selected ? 'green' : 'blue'}
        />
      )
    });
    return (
      <View >
        <Text style={styles.questionText}>
          {props.question.question}
        </Text>
        {answers}
      </View>
    )
  }

  const SubmitButton = selected ?
    (<Button 
      title="Submit"
      onPress={handleSubmit}            // remove button height style (cause does nothing)
      color="red"
    />) :
    <View style={styles.buttonHeight} />;

  return (
    <>
      <View>
        <CountdownTimer  
          complete={handleTimerComplete}
        />
        <Question question={props.questions[index]} />
        {SubmitButton}
      </View>
    </>
  );
};

Quiz.propTypes = {  // add props typechecking
  questions: PropTypes.array.isRequired,
  completed: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  selected: { borderColor: 'blue' },
  questionText: { fontSize: 20, margin: 20 },
  buttonHeight: { height: 39 }                  // adjust to actual button height
});

export default Quiz;
