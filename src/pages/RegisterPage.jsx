import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/Logo.jpg'
import { useThemePreference } from '../hooks/useThemePreference.js'

export default function RegisterPage() {
  const { theme, toggleTheme } = useThemePreference()

  return (
    <div className="page">
      <header className="app-header">
        <div className="logo-group">
          <img src={logoImg} alt="CivicPulse Hub logo" />
          <div>
            <p className="logo-title">CivicPulse Hub</p>
          </div>
        </div>
        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun /> : <Moon />}
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>
      </header>

      <main className="register-shell">
        <section className="form-panel">
          <Link to="/" className="secondary-link">
            <ArrowLeft /> Back to login
          </Link>
          <div>
            <p className="eyebrow">SIGN UP</p>
            <h3>Enroll your Details</h3>
            
          </div>

          <form className="signup-form">
            <fieldset className="field-section">
              <legend>Personal details</legend>
              <div className="field-row">
                <div className="text-field">
                  <label htmlFor="signup-name">Full name</label>
                  <input id="signup-name" type="text" placeholder="e.g., Maya Rao" autoComplete="name" />
                </div>
                <div className="text-field">
                  <label htmlFor="signup-address">Address</label>
                  <input id="signup-address" type="text" placeholder="Ward / Street" autoComplete="address-line1" />
                </div>
                <div className="text-field">
                  <label htmlFor="signup-dob">Date of birth</label>
                  <input id="signup-dob" type="date" />
                </div>
              </div>
            </fieldset>

            <fieldset className="field-section">
              <legend>Contact details</legend>
              <p className="section-note">Enter at least one contact so we can share the activation link.</p>
              <div className="field-row">
                <div className="text-field">
                  <label htmlFor="signup-phone">Phone number</label>
                  <div className="phone-input-group">
                    <span className="country-code-static">🇮🇳 +91</span>
                    <input
                      id="signup-phone"
                      type="tel"
                      placeholder="00000 00000"
                      autoComplete="tel"
                      className="phone-number-input"
                    />
                  </div>
                </div>
                <div className="text-field">
                  <label htmlFor="signup-email">Email ID</label>
                  <input id="signup-email" type="email" placeholder="you@city.gov.in" autoComplete="email" />
                </div>
              </div>
            </fieldset>

            <fieldset className="field-section">
              <legend>Login details</legend>
              <div className="field-row">
                <div className="text-field">
                  <label htmlFor="signup-userid">User ID</label>
                  <input id="signup-userid" type="text" placeholder="Choose a unique ID" autoComplete="username" />
                </div>
                <div className="text-field">
                  <label htmlFor="signup-password">Password</label>
                  <input id="signup-password" type="password" placeholder="Create password" autoComplete="new-password" />
                </div>
                <div className="text-field">
                  <label htmlFor="signup-confirm">Confirm password</label>
                  <input
                    id="signup-confirm"
                    type="password"
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </fieldset>

            <button type="submit" className="primary-btn">
              SignUp
            </button>
          </form>
        </section>

      </main>
    </div>
  )
}
