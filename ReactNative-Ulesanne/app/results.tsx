import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { getTopScores } from '../services/database';


export default function ResultScreen() {
 const router = useRouter();
 const params = useLocalSearchParams();
 const [leaderboard, setLeaderboard] = useState<any[]>([]);


 const score = parseInt(params.score as string) || 0;
 const total = parseInt(params.total as string) || 10;
 const percentage = (score / total) * 100;


 useFocusEffect(
   useCallback(() => {
     const scores = getTopScores();
     setLeaderboard(scores);
   }, [])
 );


 return (
   <ScrollView contentContainerStyle={styles.container}>
     <Text style={styles.title}>Viktoriin läbi!</Text>
    
     <View style={styles.scoreCard}>
       <Text style={styles.resultText}>Tulemus: {score} / {total}</Text>
       <Text style={styles.resultText}>Protsent: {percentage.toFixed(1)}%</Text>
     </View>
    
     <Text style={styles.leaderboardTitle}>--- Leaderboard (Top 5) ---</Text>
     {leaderboard.map((item, i) => (
       <View key={i} style={styles.leaderboardItem}>
         <Text style={styles.itemText}>
           {i + 1}. {item.username}: {item.score} pnt ({item.duration}s)
         </Text>
       </View>
     ))}
    
     <View style={styles.buttonContainer}>
       <Button
         title="Alusta uuesti"
         onPress={() => router.replace('/')}
         color="#007AFF"
       />
     </View>
   </ScrollView>
 );
}


const styles = StyleSheet.create({
 container: {
   flexGrow: 1,
   justifyContent: 'center',
   padding: 20,
   backgroundColor: '#f5f5f5',
 },
 title: {
   fontSize: 28,
   fontWeight: 'bold',
   color: '#007AFF',
   textAlign: 'center',
   marginBottom: 20,
 },
 scoreCard: {
   backgroundColor: '#fff',
   padding: 20,
   borderRadius: 15,
   elevation: 3,
   marginBottom: 30,
 },
 resultText: {
   fontSize: 20,
   color: '#333',
   textAlign: 'center',
   marginVertical: 5,
 },
 leaderboardTitle: {
   fontSize: 18,
   fontWeight: '600',
   color: '#666',
   textAlign: 'center',
   marginBottom: 15,
 },
 leaderboardItem: {
   backgroundColor: '#e9e9e9',
   padding: 10,
   borderRadius: 8,
   marginBottom: 8,
 },
 itemText: {
   fontSize: 16,
   color: '#444',
 },
 buttonContainer: {
   marginTop: 30,
 }
});
