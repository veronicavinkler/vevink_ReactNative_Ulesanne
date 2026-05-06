import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchQuestions } from '../services/api';

export default function MenuScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('Science');
  const [difficulty, setDifficulty] = useState('easy');

  const startQuiz = async () => {
    if (!username.trim()) {
      alert("Please enter a name");
      return;
    }
    const questions = await fetchQuestions(category, difficulty);
    navigation.navigate('Quiz', { questions, username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz App</Text>
      
      <TextInput
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <Text>Select Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Science" value="Science" />
        <Picker.Item label="Art" value="Art" />
        <Picker.Item label="History" value="History" />
        <Picker.Item label="Tech" value="Tech" />
        <Picker.Item label="Sport" value="Sport" />
      </Picker>

      <Text>Select Difficulty:</Text>
      <Picker
        selectedValue={difficulty}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>

      <Button title="Alusta viktoriini" onPress={startQuiz} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 8 },
  picker: { height: 50, width: '100%', marginBottom: 20 }
});