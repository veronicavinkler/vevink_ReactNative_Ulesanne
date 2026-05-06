import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';


export default function MenuScreen() {
 const router = useRouter();
 const [username, setUsername] = useState('');
 const [category, setCategory] = useState('Science');
 const [difficulty, setDifficulty] = useState('easy');


 const startQuiz = () => {
   if (!username.trim()) {
     alert("Please enter a name");
     return;
   }
  
   router.push({
     pathname: "/quiz",
     params: { username, category, difficulty }
   });
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
 container: {
   flex: 1,
   justifyContent: 'center',
   padding: 20,
   backgroundColor: '#f5f5f5'
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   marginBottom: 20,
   textAlign: 'center',
   color: '#007AFF'
 },
 label: {
   color: '#333',
   marginBottom: 5,
   fontWeight: '600'
 },
 input: {
   borderBottomWidth: 1,
   borderBottomColor: '#007AFF',
   marginBottom: 20,
   padding: 8,
   color: '#000'
 },
 picker: {
   height: 50,
   width: '100%',
   marginBottom: 20,
   color: '#007AFF',
   backgroundColor: '#fff'
 },
 link: {
   marginTop: 15,
   paddingVertical: 15,
   color: '#007AFF'
 }
});
