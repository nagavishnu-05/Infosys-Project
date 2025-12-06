import { useState, useEffect, useCallback, useRef } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'

export default function CaptchaVerifier({ onVerify }) {
  const [captchaCode, setCaptchaCode] = useState('')
  const [userInput, setUserInput] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const canvasRef = useRef(null)

  const drawCaptcha = useCallback((canvas, code) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f3f4f6')
    gradient.addColorStop(1, '#e5e7eb')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 200}, ${Math.random() * 200}, ${Math.random() * 200}, 0.3)`
      ctx.beginPath()
      ctx.moveTo(Math.random() * width, Math.random() * height)
      ctx.lineTo(Math.random() * width, Math.random() * height)
      ctx.stroke()
    }

    // Add noise dots
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.4)`
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2)
    }

    // Draw text with transformation
    ctx.font = 'bold 28px Arial'
    ctx.fillStyle = '#1e40af'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'

    let x = width / 6
    for (let i = 0; i < code.length; i++) {
      ctx.save()
      ctx.translate(x, height / 2)
      ctx.rotate((Math.random() - 0.5) * 0.3)
      ctx.fillText(code[i], 0, 0)
      ctx.restore()
      x += width / 5.5
    }

    // Add border
    ctx.strokeStyle = '#cbd5e1'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, width, height)
  }, [])

  const generateCaptchaCode = useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = ''
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }, [])

  const generateCaptcha = useCallback(() => {
    const code = generateCaptchaCode()
    setCaptchaCode(code)
    setUserInput('')
    setError('')
    setIsVerified(false)
    setAttempts(0)
    onVerify(false)
    setTimeout(() => {
      if (canvasRef.current) {
        drawCaptcha(canvasRef.current, code)
      }
    }, 0)
  }, [generateCaptchaCode, drawCaptcha, onVerify])

  useEffect(() => {
    const timer = setTimeout(() => {
      generateCaptcha()
    }, 0)
    return () => clearTimeout(timer)
  }, [generateCaptcha])

  const handleVerifyCaptcha = useCallback(() => {
    if (userInput.toUpperCase() === captchaCode) {
      setIsVerified(true)
      setError('')
      setAttempts(0)
      onVerify(true)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setError('Incorrect CAPTCHA. Please try again.')
      setIsVerified(false)
      onVerify(false)
      if (newAttempts >= 3) {
        const code = generateCaptchaCode()
        setCaptchaCode(code)
        setUserInput('')
        drawCaptcha(canvasRef.current, code)
        setAttempts(0)
      }
    }
  }, [userInput, captchaCode, attempts, onVerify, generateCaptchaCode, drawCaptcha])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.length === 5) {
      handleVerifyCaptcha()
    }
  }

  return (
    <div className="captcha-section">
      {/* Verify CAPTCHA Text */}
      <p className="captcha-label">Verify CAPTCHA</p>

      {/* All CAPTCHA elements in one line */}
      <div className="captcha-row">
        <div className="captcha-canvas-container">
          <canvas
            ref={canvasRef}
            width={200}
            height={50}
            className="captcha-canvas"
          />
        </div>
        <button
          type="button"
          onClick={generateCaptcha}
          className="captcha-refresh-btn"
          title="Refresh CAPTCHA"
        >
          <RotateCcw />
        </button>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Enter code"
          maxLength="5"
          className="captcha-input"
        />
        <button
          type="button"
          onClick={handleVerifyCaptcha}
          disabled={userInput.length !== 5}
          className={`captcha-verify-btn ${isVerified ? 'verified' : ''}`}
        >
          {isVerified ? '✓' : 'Check'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="captcha-error">
          <AlertCircle />
          <p>{error}</p>
        </div>
      )}

      {/* Attempts Counter */}
      {attempts > 0 && !isVerified && (
        <p className="captcha-attempts">
          Attempt {attempts}/3
        </p>
      )}
    </div>
  )
}

