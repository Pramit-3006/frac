import { NextResponse } from "next/server";
import { resultFromUpload } from "@/lib/analysis";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const filename = file instanceof File ? file.name : "uploaded-xray.png";

  return NextResponse.json(resultFromUpload(filename));
}

