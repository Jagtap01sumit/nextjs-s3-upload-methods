import { NextResponse } from "next/server";
import { s3 } from "@/lib/s3";

export async function POST(req) {
  const contentType = req.headers.get("content-type");

  if (!contentType || !contentType.startsWith("application/octet-stream")) {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 400 }
    );
  }

  const filename = req.headers.get("x-filename") || `${Date.now()}`;

  const webStream = req.body;
  const arrayBuffer = await streamToArrayBuffer(webStream);
  const buffer = Buffer.from(arrayBuffer);

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `files/${filename}`,
    Body: buffer,
    ContentType: "application/octet-stream",
  };

  try {
    await s3.upload(params).promise();
    return NextResponse.json({
      message: "File uploaded successfully!",
      key: filename,
    });
  } catch (error) {
    console.error("S3 upload error:", error);
    return NextResponse.json({ error: "S3 upload failed" }, { status: 500 });
  }
}

async function streamToArrayBuffer(stream) {
  const reader = stream.getReader();
  const chunks = [];
  let done, value;

  while (true) {
    ({ done, value } = await reader.read());
    if (done) break;
    chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const arrayBuffer = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    arrayBuffer.set(chunk, offset);
    offset += chunk.length;
  }

  return arrayBuffer;
}
