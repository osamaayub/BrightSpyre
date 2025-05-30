"use client"

import { useState, useEffect, FormEvent } from "react"
import { useAuth, useSignIn } from "@clerk/nextjs"
import type { NextPage } from "next"
import { useRouter } from "next/navigation"

const ChangePassword: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [sucessfulCreation, setSucessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState('')

  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push("/")
    }
  }, [isSignedIn, router])

  if (!isLoaded) return null

  async function Create(e: FormEvent) {
    e.preventDefault()
    await signIn?.create({
      strategy: 'reset_password_email_code',
      identifier: email
    }).then(() => {
      setSucessfulCreation(true)
      setError('')
    }).catch((error: any) => {
      setError(error.errors[0].longMessage)
    })
  }

  async function reset(e: FormEvent) {
    e.preventDefault()
    await signIn?.attemptFirstFactor({
      strategy: 'reset_password_email_code',
      code,
      password
    }).then((result) => {
      if (result.status === 'needs_second_factor') {
        setSecondFactor(true)
        setError('')
      } else if (result.status === 'complete') {
        setActive({ session: result.createdSessionId })
        setError('')
      } else {
        console.log(result)
      }
    }).catch((error: any) => {
      setError(error.errors[0].longMessage)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Forgot Password</h1>
        <form onSubmit={!sucessfulCreation ? Create : reset} className="space-y-4">
          {!sucessfulCreation ? (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Provide Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
              >
                Send Password Reset Code
              </button>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Enter your new password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Enter the password reset code sent to your email
                </label>
                <input
                  type="text"
                  id="code"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
              >
                Reset Password
              </button>
            </>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {secondFactor && (
            <p className="text-yellow-600 text-sm text-center">2FA is required, but this UI does not handle that.</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
