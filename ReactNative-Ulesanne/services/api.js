export const fetchQuestions = async (category, difficulty) => {
  const categories = { Science: 17, Art: 25, History: 23, Tech: 18, Sport: 21 };
  const catId = categories[category] || 17;
  
  const url = `https://opentdb.com/api.php?amount=10&category=${catId}&difficulty=${difficulty.toLowerCase()}&type=multiple`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
