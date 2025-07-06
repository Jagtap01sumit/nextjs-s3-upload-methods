import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileType = searchParams.get("filetype");
  const fileName = searchParams.get("filename");

  if (!fileType || !fileName) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
    });
  }
  console.log("sumit")
  const fileExtension = fileType.split("/")[1];
  const Key = `${randomUUID()}.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  console.log(uploadUrl, "sumit")
  return new Response(
    JSON.stringify({
      uploadUrl,
      key: Key,
    }),
    { status: 200 }
  );
}
