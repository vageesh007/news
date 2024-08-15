export const fetchArticles = async () => {
  try {
    const response = await fetch(
      'https://newsapi.org/v2/everything?q=religion&apiKey=ca1eaae4afeb405daa2545c062679a2b'
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
