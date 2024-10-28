import { Client } from "minio";

export const minioClient = new Client({
  endPoint: process.env.S3_CLIENT_ENDPOINT!,
  port: Number(process.env.S3_CLIENT_PORT!),
  useSSL: false,
  accessKey: process.env.S3_ACCESS_KEY!,
  secretKey: process.env.S3_SECRET_KEY!,
});
