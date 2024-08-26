export const fetchArticles = async () => {
  try {
    const response = await fetch(
      'https://newsdata.io/api/1/latest?apikey=pub_50930b0959b7ba6b48c83de78e677aac54354&category=politics&country=bd'
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.articles; // Ensure this matches the actual response structure
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
