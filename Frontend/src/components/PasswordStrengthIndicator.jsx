import { Check, X } from 'lucide-react'

export default function PasswordStrengthIndicator({ requirements }) {
  const requirementsList = [
    {
      key: 'minLength',
      label: 'At least 8 characters',
      met: requirements.minLength,
    },
    {
      key: 'uppercase',
      label: 'One uppercase character (A-Z)',
      met: requirements.uppercase,
    },
    {
      key: 'numeric',
      label: 'One numeric character (0-9)',
      met: requirements.numeric,
    },
    {
      key: 'specialChar',
      label: 'One special character (!@#$%^&*)',
      met: requirements.specialChar,
    },
  ]

  const metCount = Object.values(requirements).filter(Boolean).length
  const totalCount = Object.values(requirements).length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-200">Password Requirements</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {metCount}/{totalCount}
        </p>
      </div>

      <div className="space-y-2">
        {requirementsList.map(({ key, label, met }) => (
          <div
            key={key}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
              met
                ? 'bg-green-50 dark:bg-green-900/20'
                : 'bg-slate-50 dark:bg-slate-900/30'
            }`}
          >
            {met ? (
              <Check className="size-4 text-green-600 dark:text-green-400 flex-shrink-0" />
            ) : (
              <X className="size-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
            )}
            <span className={`${met ? 'text-green-700 dark:text-green-300' : 'text-slate-600 dark:text-slate-400'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              metCount === 0
                ? 'w-0 bg-slate-300'
                : metCount === 1
                  ? 'w-1/4 bg-red-500'
                  : metCount === 2
                    ? 'w-1/2 bg-yellow-500'
                    : metCount === 3
                      ? 'w-3/4 bg-blue-500'
                      : 'w-full bg-green-500'
            }`}
          />
        </div>
      </div>
    </div>
  )
}
