import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' })

  // Clear the cookie by setting it with maxAge 0
  response.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    maxAge: 0, // expires immediately
  })

  return response
}
