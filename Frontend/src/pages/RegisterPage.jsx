import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/Logo.jpg'
import { useThemePreference } from '../hooks/useThemePreference.js'

export default function RegisterPage() {
  const { theme, toggleTheme } = useThemePreference()
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    dob: '',
    phone: '',
    email: '',
    userid: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    // Map input IDs to state keys
    const keyMap = {
      'signup-name': 'name',
      'signup-address': 'address',
      'signup-dob': 'dob',
      'signup-phone': 'phone',
      'signup-email': 'email',
      'signup-userid': 'userid',
      'signup-password': 'password',
      'signup-confirm': 'confirmPassword',
    }
    const key = keyMap[id]
    if (key) {
      setFormData((prev) => ({ ...prev, [key]: value }))
      // Clear error when user types
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: null }))
      }
    }
  }

  const validateAge = (dob) => {
    if (!dob) return false
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age >= 18
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!validateAge(formData.dob)) {
      newErrors.dob = 'You must be at least 18 years old to register.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Proceed with registration logic (placeholder)
    console.log('Form submitted:', formData)
    alert('Registration successful!')
  }

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

          <form className="signup-form" onSubmit={handleSubmit}>
            <fieldset className="field-section">
              <legend>Personal details</legend>
              <div className="field-row">
                <div className="text-field">
                  <label htmlFor="signup-name">Full name</label>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="e.g., Maya Rao"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-field">
                  <label htmlFor="signup-address">Address</label>
                  <input
                    id="signup-address"
                    type="text"
                    placeholder="Ward / Street"
                    autoComplete="address-line1"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-field">
                  <label htmlFor="signup-dob">Date of birth</label>
                  <input
                    id="signup-dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    style={{ borderColor: errors.dob ? '#ef4444' : undefined }}
                  />
                  {errors.dob && <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>{errors.dob}</span>}
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
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="text-field">
                  <label htmlFor="signup-email">Email ID</label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="you@city.gov.in"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="field-section">
              <legend>Login details</legend>
              <div className="field-row">
                <div className="text-field">
                  <label htmlFor="signup-userid">User ID</label>
                  <input
                    id="signup-userid"
                    type="text"
                    placeholder="Choose a unique ID"
                    autoComplete="username"
                    value={formData.userid}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-field">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="Create password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-field">
                  <label htmlFor="signup-confirm">Confirm password</label>
                  <input
                    id="signup-confirm"
                    type="password"
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
