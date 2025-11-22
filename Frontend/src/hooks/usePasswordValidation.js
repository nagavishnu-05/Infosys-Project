import { useState, useCallback } from 'react'

export const usePasswordValidation = () => {
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    specialChar: false,
    numeric: false,
  })

  const validatePassword = useCallback((password) => {
    const requirements = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      numeric: /[0-9]/.test(password),
    }
    setPasswordRequirements(requirements)
    return Object.values(requirements).every(req => req === true)
  }, [])

  const isPasswordValid = Object.values(passwordRequirements).every(req => req === true)

  return {
    passwordRequirements,
    validatePassword,
    isPasswordValid,
  }
}
