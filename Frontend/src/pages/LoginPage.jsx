import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Lock, Moon, Sun, UserRound } from 'lucide-react'
import logoImg from '../assets/Logo.jpg'
import { useThemePreference } from '../hooks/useThemePreference.js'
import CaptchaVerifier from '../components/CaptchaVerifier'

const portals = [
  { id: 'user', label: 'User Portal', idLabel: 'User ID' },
  { id: 'admin', label: 'Admin Portal', idLabel: 'Admin ID' },
  { id: 'officer', label: 'Officer Portal', idLabel: 'Officer ID' },
]

export default function LoginPage() {
  const { theme, toggleTheme } = useThemePreference()
  const [selectedPortal, setSelectedPortal] = useState('user')
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const activePortal = useMemo(() => portals.find((portal) => portal.id === selectedPortal), [selectedPortal])
  const sliderLeft = useMemo(
    () => `${portals.findIndex((portal) => portal.id === selectedPortal) * 33.3333}%`,
    [selectedPortal],
  )

  const handleCaptchaVerify = (verified) => {
    setCaptchaVerified(verified)
  }

  const isFormValid = captchaVerified

  return (
    <div className="page">
      <header className="app-header">
        <div className="logo-group">
          <img src={logoImg} alt="CivicPulse Hub logo" />
          <p className="logo-title">CivicPulse</p>
        </div>
        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun /> : <Moon />}
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>
      </header>

      <main className="auth-shell">
        <section className="intro-content">
          <p className="eyebrow">CivicPulse Hub</p>
          <h2>CivicPulse Hub</h2>
          <h3 className="intro-subtitle">An Unified Smart City Feedback and Redressal System</h3>
          <p>Resolve civic issues faster by aligning citizens, officers, and admins on one workspace.</p>
        </section>

        <section className="form-panel">
          <div className="form-panel__header">
            <div>
              <p className="eyebrow">Login portal</p>
              <h3>{activePortal?.label}</h3>
            </div>
          </div>

          <div className="portal-toggle">
            <span className="portal-toggle__slider" style={{ left: sliderLeft }} />
            {portals.map((portal) => (
              <button
                key={portal.id}
                type="button"
                onClick={() => setSelectedPortal(portal.id)}
                className={`portal-toggle__button ${selectedPortal === portal.id ? 'is-active' : ''}`}
              >
                <UserRound />
                {portal.label}
              </button>
            ))}
          </div>

          <form className="portal-form">
            <div className="text-field">
              <label htmlFor="portal-id">{activePortal?.idLabel}</label>
              <div className="input-with-icon">
                <UserRound />
                <input
                  id="portal-id"
                  type="text"
                  name="portal-id"
                  placeholder={`Enter your ${activePortal?.idLabel.toLowerCase()}`}
                />
              </div>
            </div>

            <div className="text-field">
              <label htmlFor="portal-password">Password</label>
              <div className="input-with-icon">
                <Lock />
                <input
                  id="portal-password"
                  type="password"
                  placeholder="Enter password"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Password validation hidden */}

            <div className="mt-6 mb-6">
              <CaptchaVerifier onVerify={handleCaptchaVerify} />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`primary-btn ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Continue to {activePortal?.label}
              </button>
              {selectedPortal === 'user' ? (
                <Link to="/register" className="secondary-link">
                  New Account? Sign up
                </Link>
              ) : (
                <p className="inline-note">Need access? Ask your administrator for activation.</p>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}