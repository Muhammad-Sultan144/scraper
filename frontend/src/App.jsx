import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './index.css'
import './App.css'
import { Hero1 } from './components/ui/hero-1'

const HeartIcon = ({ filled }) => (
  <svg 
    className="heart-icon" 
    viewBox="0 0 24 24" 
    strokeWidth={filled ? 0 : 2} 
    stroke={filled ? "none" : "currentColor"} 
    fill={filled ? "currentColor" : "none"}
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [savedIds, setSavedIds] = useState([])
  const [activeTab, setActiveTab] = useState('AI news')

  const tabs = ['AI news', 'ben bites', 'reddit AI', 'wishlist']

  useEffect(() => {
    fetch('/articles.json')
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load articles:", err)
        setLoading(false)
      })
      
    fetchSavedIds()
  }, [])

  const fetchSavedIds = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_articles')
        .select('article_id')
        
      if (error) throw error
      
      if (data) {
        setSavedIds(data.map(row => row.article_id))
      }
    } catch (error) {
      console.error("Database Error (Fetch):", error.message)
    }
  }

  const toggleSave = async (id) => {
    const isCurrentlySaved = savedIds.includes(id)

    try {
      if (isCurrentlySaved) {
        // Optimistically update UI
        setSavedIds(prev => prev.filter(i => i !== id))
        
        const { error } = await supabase
          .from('saved_articles')
          .delete()
          .eq('article_id', id)
          
        if (error) throw error
      } else {
        // Optimistically update UI
        setSavedIds(prev => [...prev, id])
        
        const { error } = await supabase
          .from('saved_articles')
          .insert([{ article_id: id }])
          
        if (error) throw error
      }
    } catch (err) {
      console.error("Database Error (Toggle):", err.message)
      if (isCurrentlySaved) {
        setSavedIds(prev => [...prev, id])
      } else {
        setSavedIds(prev => prev.filter(i => i !== id))
      }
      alert(`Database Error: ${err.message}`)
    }
  }

  const isSaved = (id) => savedIds.includes(id)

  const getFilteredArticles = () => {
    if (activeTab === 'wishlist') {
      return articles.filter(article => isSaved(article.id))
    }
    if (activeTab === 'ben bites') {
      return articles.filter(article => article.source === "Ben's Bites")
    }
    if (activeTab === 'reddit AI') {
      return articles.filter(article => article.source === "Reddit")
    }
    if (activeTab === 'AI news') {
      return articles.filter(article => article.source === "The AI Rundown" || (article.source !== "Ben's Bites" && article.source !== "Reddit"))
    }
    return articles
  }

  const filteredArticles = getFilteredArticles()

  return (
    <>
      <Hero1 />
      <div className="app-container">
      <header className="header">
        <h1 className="header-logo">The Daily Newsletter</h1>
        <p className="header-subtitle">Curated intelligence from top sources</p>
      </header>

      <nav className="nav-tabs">
        {tabs.map(tab => (
          <button 
            key={tab}
            className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </nav>

      {loading ? (
        <div className="loading-state">Fetching the latest updates...</div>
      ) : filteredArticles.length === 0 ? (
        <div className="empty-state">
          {activeTab === 'wishlist' 
            ? "Your wishlist is empty. Start saving articles!"
            : `No articles found for ${activeTab}.`}
        </div>
      ) : (
        <main className="articles-grid">
          {filteredArticles.map(article => (
            <article key={article.id} className="article-card">
              <span className="article-source-tag">{article.source || 'News'}</span>
              <h3 className="article-title">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p className="article-summary">
                {article.summary}
              </p>
              <div className="article-footer">
                <span className="article-date">
                  {new Date(article.published_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                
                <div className="action-buttons">
                  {activeTab === 'wishlist' && (
                    <button 
                      className="delete-button"
                      onClick={() => toggleSave(article.id)}
                    >
                      Remove
                    </button>
                  )}
                  <button 
                    className={`heart-button ${isSaved(article.id) ? 'saved' : ''}`}
                    onClick={() => toggleSave(article.id)}
                    aria-label={isSaved(article.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <HeartIcon filled={isSaved(article.id)} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </main>
      )}
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} The Daily Newsletter. Minimalist Edition.</p>
      </footer>
    </div>
    </>
  )
}

export default App
