// app/api/jobs/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getBearerToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const tokenResponse = await axios.post(
      "https://resume.brightspyre.com/oauth/v2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
  );

  const data = tokenResponse.data;
  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000;

  return cachedToken;
}

export async function GET() {
  try {
    const token = await getBearerToken();

    const response = await axios.get(
        "https://resume.brightspyre.com/api/auth/jobs/list?limit=all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
        {
          message:
              `Error fetching data: ` +
              (error.message || error.response?.data?.message || "Unknown error"),
        },
        { status: 500 }
    );
  }
}
