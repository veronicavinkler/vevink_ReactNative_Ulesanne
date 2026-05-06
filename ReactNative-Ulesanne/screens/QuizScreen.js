import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function QuizScreen({ route, navigation }) {
  const { questions, username } = route.params;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    if (timer === 0) handleAnswer(null);
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswer = (answer) => {
    if (answer === questions[index].correct_answer) setScore(score + 1);
    
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setTimer(15); // Reset timer
    } else {
      navigation.navigate('Results', { score, total: questions.length, username });
    }
  };

  return (
    <View>
      <Text>Time Left: {timer}s</Text>
      <Text>{questions[index].question}</Text>
      {/* Map answers here into buttons */}
    </View>
  );
}
