import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.AUTH_SECRET!

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value

  if (!token) {
    return NextResponse.json({ message: 'No token' }, { status: 401 })
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET)
    return NextResponse.json({ message: 'Token valid' })
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
}
