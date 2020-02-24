import React, { useState, useEffect } from 'react';
import {
  // StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import Timer from '../Timer';

const Quiz = (props) => {
  // const [questions, setQuestions] = useState(props.questions);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);

  // useEffect(() => {
  //   setQuestions(props.questions);
  //   setIndex(0);
  //   setActive(true);
  // }, [props.questions]);

  return (
    <>
      <View>
        <Timer />
        <Question question={props.questions[index]} />
      </View>
    </>
  );
};

const Question = (props) => {
  const answers = props.question.answers.map((e, i) => {
    return (
      <Button
        key={i}
        title={e} />
    )
  });
  return (
    <View>
      <Text>{props.question.question}</Text>
      {answers}
    </View>
  )
}

// const styles = StyleSheet.create({
//   app: { flex: 1, justifyContent: "center", alignItems: "center" }
// });

export default Quiz;
