import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const Timer = (props) => {
  const [seconds, setSeconds] = useState(props.seconds || 120);

  useEffect(() => {
    let interval = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else {
      props.complete();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <View>
      <Text style={styles.timerText}>
          {seconds}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: { fontSize: 40, margin: 20, textAlign: 'center' }
});


export default Timer;