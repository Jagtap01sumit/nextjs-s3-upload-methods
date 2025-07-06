import AWS from "aws-sdk";
import { randomUUID } from "crypto";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY!,
  secretAccessKey: process.env.AWS_SECRET_KEY!,
  region: process.env.AWS_REGION!,
});

const s3 = new AWS.S3();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileType = searchParams.get("filetype");
  const fileName = searchParams.get("filename");

  console.log(fileType, fileName)
  if (!fileType || !fileName) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
    });
  }

  const fileExtension = fileType.split("/")[1];
  const Key = `${randomUUID()}.${fileExtension}`;

  const params = {
    Bucket: process.env.S3_BUCKET!,
    Key,
    ContentType: fileType,
    Expires: 100,
  };

  try {
    const uploadUrl = s3.getSignedUrl("putObject", params);

    return new Response(
      JSON.stringify({
        uploadUrl,
        key: Key,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("S3 Error:", error);
    return new Response(JSON.stringify({ error: "S3 URL generation failed" }), {
      status: 500,
    });
  }
}
