import { useState } from 'react'
import { supabase } from '../supabaseClient'
import Mail from 'lucide-react/dist/esm/icons/mail'
import Lock from 'lucide-react/dist/esm/icons/lock'
import User from 'lucide-react/dist/esm/icons/user'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Hexagon from 'lucide-react/dist/esm/icons/hexagon'


export default function Auth({ onAuthSuccess, onBypass }) {
  const handleBypass = () => {
    if (onBypass) {
      onBypass({
        id: 'coffee-enthusiast-id',
        email: 'anc@glaido.com'
      })
    }
  }
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
      if (onAuthSuccess) onAuthSuccess()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGitHubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' })
      if (error) throw error
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="auth-overlay">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <div className="auth-icon-container">
            <User className="auth-icon" />
          </div>
          <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isSignUp ? 'Join our curated intelligence community' : 'Sign in to access your saved articles'}</p>
        </div>

        <form onSubmit={handleAuth} className="auth-form">
          <div className="input-group">
            <Mail className="input-icon" />
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            <ArrowRight className="btn-icon" />
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button onClick={handleGitHubLogin} className="auth-social-btn github">
          <Hexagon className="btn-icon" />
          Continue with GitHub
        </button>

        <button onClick={handleBypass} className="auth-demo-btn">
          Brew Demo Session
        </button>

        <div className="auth-footer">
          <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-auth-btn">
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  )
}
