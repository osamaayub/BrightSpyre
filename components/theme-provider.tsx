'use client'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import * as React from 'react'


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Avoid rendering until mounted to prevent hydration mismatch
    return null
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
