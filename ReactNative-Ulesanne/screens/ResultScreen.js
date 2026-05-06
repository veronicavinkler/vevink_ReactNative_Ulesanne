import React from 'react';
import { View, Text, Button } from 'react-native';
import { getTopScores } from '../services/database';

export default function ResultScreen({ route, navigation }) {
  const { score, total } = route.params;
  const percentage = (score / total) * 100;
  const leaderboard = getTopScores();

  return (
    <View>
      <Text>Final Score: {score} / {total}</Text>
      <Text>Success: {percentage}%</Text>
      
      <Text>--- Leaderboard (Top 5) ---</Text>
      {leaderboard.map((item, i) => (
        <Text key={i}>{item.username}: {item.score} ({item.duration}s)</Text>
      ))}
      
      <Button title="Restart" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}
