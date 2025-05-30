import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params:{id:string}}
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
  }

  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "Missing Job ID" }, { status: 400 });
  }

  try {
    const token = req.headers.get("authorization");
    const response = await axios.get(
  `https://resume.brightspyre.com/api/auth/jobs/detail/${id}`,
  {
    headers: {
      Authorization: token || "",
    }
  }
);
    return NextResponse.json(response.data);
  } catch (error: any) {
    
    return NextResponse.json(
      { message: error.response?.data?.message || "An unexpected error occurred." },
      { status: error.response?.status || 500 }
    );
  }
}
