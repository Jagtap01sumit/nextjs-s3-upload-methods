This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ✅ Step 1: Create an S3 Bucket
Go to the AWS Console → S3.

Click Create Bucket.

Optional: If uploading public assets, uncheck:
Block all public access.

After the bucket is created, set CORS Configuration:

S3 → Permissions → CORS configuration → Paste this:
```
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "POST", "PUT"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```
## ✅ Step 2: Create an IAM User with S3 Access
Go to AWS Console → IAM → Users.

Click Add user.

Set a name (e.g., s3-uploader-user).

Select Access key - Programmatic access.

Click Next → Attach policies directly.

✅ Attach: AmazonS3FullAccess.

## ✅ Step 3: (Optional) Add Bucket Policy for Public Read Access
If you want files accessible via public URLs:

S3 → Permissions → Bucket Policy → Paste this:
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForObjects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<your-bucket-name>/*"
    }
  ]
}

```
⚠️ Replace <your-bucket-name> with your actual bucket name.

## ✅ Step 4: Install AWS SDK

```
npm install aws-sdk

```

🎉 You’re all set! Now you can start building your file upload features.

![image](https://github.com/user-attachments/assets/2ed497e9-a61f-4aa3-999f-7ef7f8d2e2fd)

![image](https://github.com/user-attachments/assets/f8cea217-39ca-4556-b6d1-c4081f4935ae)

