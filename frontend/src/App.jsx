import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './index.css'
import { Hero1 } from './components/ui/hero-1'
import Auth from './components/Auth'
import { Heart, LogOut, User as UserIcon } from 'lucide-react'

function App() {
  const [session, setSession] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [savedIds, setSavedIds] = useState([])
  const [activeTab, setActiveTab] = useState('AI news')

  const tabs = ['AI news', 'ben bites', 'reddit AI', 'wishlist']

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

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
  }, [])

  useEffect(() => {
    if (session) {
      fetchSavedIds()
    } else {
      setSavedIds([])
    }
  }, [session])

  const fetchSavedIds = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_articles')
        .select('article_id')
        .eq('user_id', session.user.id)
        
      if (error) throw error
      
      if (data) {
        setSavedIds(data.map(row => row.article_id))
      }
    } catch (error) {
      console.error("Database Error (Fetch):", error.message)
    }
  }

  const toggleSave = async (id) => {
    if (!session) return alert("Please sign in to save articles!")

    const isCurrentlySaved = savedIds.includes(id)

    try {
      if (isCurrentlySaved) {
        setSavedIds(prev => prev.filter(i => i !== id))
        const { error } = await supabase
          .from('saved_articles')
          .delete()
          .eq('article_id', id)
          .eq('user_id', session.user.id)
        if (error) throw error
      } else {
        setSavedIds(prev => [...prev, id])
        const { error } = await supabase
          .from('saved_articles')
          .insert([{ article_id: id, user_id: session.user.id }])
        if (error) throw error
      }
    } catch (err) {
      console.error("Database Error (Toggle):", err.message)
      // Rollback
      if (isCurrentlySaved) setSavedIds(prev => [...prev, id])
      else setSavedIds(prev => prev.filter(i => i !== id))
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const getFilteredArticles = () => {
    if (activeTab === 'wishlist') {
      return articles.filter(article => savedIds.includes(article.id))
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
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>

      {!session && <Auth />}

      <Hero1 />

      <div className="app-container">
        {session && (
          <div className="user-profile">
            <div className="flex items-center gap-2 text-sm font-medium text-dim">
              <UserIcon size={16} />
              {session.user.email}
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}

        <header className="header">
          <h1 className="header-logo">The Daily Newsletter</h1>
          <p className="header-subtitle text-dim">Elite curated intelligence for the modern era</p>
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
          <div className="loading-state">Synthesizing intelligence...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="empty-state glass-panel">
            {activeTab === 'wishlist' 
              ? "Your curated collection is empty. Explore and save intelligence."
              : `No data streams found for ${activeTab}.`}
          </div>
        ) : (
          <main className="articles-grid">
            {filteredArticles.map(article => (
              <article key={article.id} className="article-card glass-panel">
                <span className="article-source-tag">{article.source || 'Intelligence'}</span>
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
                  
                  <button 
                    className={`heart-button ${savedIds.includes(article.id) ? 'saved' : ''}`}
                    onClick={() => toggleSave(article.id)}
                    aria-label="Save intelligence"
                  >
                    <Heart 
                      size={20} 
                      fill={savedIds.includes(article.id) ? "currentColor" : "none"} 
                    />
                  </button>
                </div>
              </article>
            ))}
          </main>
        )}
        
        <footer className="footer mt-20 text-center text-dim text-sm">
          <p>© {new Date().getFullYear()} The Daily Newsletter. Premium Intelligence Platform.</p>
        </footer>
      </div>
    </>
  )
}

export default App