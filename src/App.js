import React, { useEffect, useState } from 'react';
import { fetchArticles } from './services/newsapi';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState(null); // State to manage expanded article

  useEffect(() => {
    fetchArticles()
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles. Please check the console for more details.');
        setLoading(false);
      });
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleExpand = (index) => {
    setExpandedArticle(prevIndex => (prevIndex === index ? null : index));
  };

  if (loading) return <div className={`loading ${darkMode ? 'dark' : ''}`}>Loading...</div>;
  if (error) return <div className={`error ${darkMode ? 'dark' : ''}`}>{error}</div>;

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="navbar">
        <div className="navbar-container">
          <h1>News App</h1>
          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      <div className="content">
        <h1>Latest Religion News</h1>
        <div className="card-container">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div 
                key={index} 
                className={`card ${expandedArticle === index ? 'expanded' : ''}`}
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="article-image"
                  />
                )}
                <div className="card-content">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <button 
                    className="read-more-btn" 
                    onClick={() => handleExpand(index)}
                  >
                    {expandedArticle === index ? 'Read Less' : 'Read More'}
                  </button>
                  {expandedArticle === index && (
                    <div className="expanded-content">
                      <p>{article.content}</p>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">Read full article</a>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
