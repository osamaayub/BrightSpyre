import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } =  await context.params;

    if (!id) {
      return NextResponse.json({ message: "Missing company ID" }, { status: 400 });
    }

    const response = await axios.get(
      `https://resume.brightspyre.com/api/auth/jobs/detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(
        {
          message: error.response.data?.message || "Error fetching data",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
