
import { auth} from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest) {
  const { userId, sessionId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    message: 'Authenticated',
    userId,
    sessionId
  });
}
