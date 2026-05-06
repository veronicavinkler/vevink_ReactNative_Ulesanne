import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('quiz_results.db');

export const initDb = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      score INTEGER,
      percentage REAL,
      timestamp TEXT,
      duration INTEGER,
      totalQuestions INTEGER,
      correctAnswers INTEGER,
      wrongAnswers INTEGER,
      details TEXT
    );
  `);
};

export const saveResult = (data) => {
  const {
    username,
    score,
    percentage,
    duration,
    total,
    correct,
    wrong,
    details
  } = data;

  const timestamp = new Date().toLocaleString();

  db.runSync(
    `INSERT INTO leaderboard (
      username, score, percentage, timestamp, duration, 
      totalQuestions, correctAnswers, wrongAnswers, details
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      username,
      score,
      percentage,
      timestamp,
      duration,
      total,
      correct,
      wrong,
      JSON.stringify(details)
    ]
  );
};

export const getTopScores = () => {
  return db.getAllSync(
    'SELECT * FROM leaderboard ORDER BY score DESC, duration ASC LIMIT 5'
  );
};