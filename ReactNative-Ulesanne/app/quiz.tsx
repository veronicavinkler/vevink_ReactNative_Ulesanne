import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchQuestions } from '../services/api';


export default function QuizScreen() {
 const router = useRouter();
 const params = useLocalSearchParams();
  const [questions, setQuestions] = useState<any[]>([]);
 const [index, setIndex] = useState(0);
 const [score, setScore] = useState(0);
 const [timer, setTimer] = useState(15);
 const [loading, setLoading] = useState(true);


 useEffect(() => {
   const loadData = async () => {
     const data = await fetchQuestions(params.category as string, params.difficulty as string);
     setQuestions(data);
     setLoading(false);
   };
   loadData();
 }, []);


 useEffect(() => {
   if (timer === 0) {
     handleAnswer(null);
     return;
   }
   const interval = setInterval(() => setTimer(t => t - 1), 1000);
   return () => clearInterval(interval);
 }, [timer]);


 const handleAnswer = (answer: string | null) => {
   const isCorrect = answer === questions[index].correct_answer;
   const newScore = isCorrect ? score + 1 : score;


   if (index + 1 < questions.length) {
     setScore(newScore);
     setIndex(index + 1);
     setTimer(15);
   } else {
     router.push({
       pathname: "/results",
       params: {
         score: newScore,
         total: questions.length,
         username: params.username
       }
     } as any);
   }
 };


 const decodeHtml = (html: string) => {
   return html
     .replace(/&quot;/g, '"')
     .replace(/&#039;/g, "'")
     .replace(/&amp;/g, "&")
     .replace(/&lt;/g, "<")
     .replace(/&gt;/g, ">");
 };


 if (loading) {
   return (
     <View style={styles.container}>
       <ActivityIndicator size="large" color="#007AFF" />
       <Text style={styles.text}>Loading Questions...</Text>
     </View>
   );
 }


 const currentQuestion = questions[index];
 const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();


 return (
   <View style={styles.container}>
     <Text style={styles.timer}>Time Left: {timer}s</Text>
     <Text style={styles.progress}>Question {index + 1} of {questions.length}</Text>
    
     <Text style={styles.questionText}>
       {decodeHtml(currentQuestion.question)}
     </Text>


     {answers.map((answer, i) => (
       <TouchableOpacity
         key={i}
         style={styles.button}
         onPress={() => handleAnswer(answer)}
       >
         <Text style={styles.buttonText}>{decodeHtml(answer)}</Text>
       </TouchableOpacity>
     ))}
   </View>
 );
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   padding: 20,
   backgroundColor: '#f5f5f5',
 },
 timer: {
   fontSize: 22,
   fontWeight: 'bold',
   color: '#FF3B30',
   textAlign: 'center',
   marginBottom: 10,
 },
 progress: {
   textAlign: 'center',
   color: '#666',
   marginBottom: 20,
 },
 questionText: {
   fontSize: 20,
   fontWeight: '600',
   color: '#333',
   textAlign: 'center',
   marginBottom: 30,
 },
 button: {
   backgroundColor: '#007AFF',
   padding: 15,
   borderRadius: 10,
   marginBottom: 10,
 },
 buttonText: {
   color: '#FFFFFF',
   textAlign: 'center',
   fontSize: 16,
   fontWeight: '500',
 },
 text: {
   textAlign: 'center',
   marginTop: 10,
   color: '#333',
 }
});
