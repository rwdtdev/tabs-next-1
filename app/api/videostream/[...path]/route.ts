import { minioClient } from "@/lib/minioClient";
import { NextRequest } from "next/server";
import { Readable } from "stream";

type Context = {
  params: { path: string[] };
};

export async function GET(req: NextRequest, context: Context) {
  // console.log("🚀 ~ GET ~ context:", context);
  const headers = new Headers(req.headers);
  const range = headers.get("range");
  console.log("🚀 ~ GET ~ range:", range);
  const filePath = context.params.path.join("/");
  // console.log("🚀 ~ GET ~ filePath:", filePath);
  const stats = await minioClient.statObject(
    process.env.S3_BUCKET_NAME!,
    filePath
  );
  // console.log("🚀 ~ GET ~ stats:", stats);
  if (!stats) {
    throw new Error("error in s3Client.getObjectStats(filePath)");
  }

  const videoSize = stats.size;
  const start = Number(range?.replace(/\D/g, ""));
  const end = Math.min(start + 1000_000, videoSize - 1);
  const stream = await minioClient.getPartialObject(
    process.env.S3_BUCKET_NAME!,
    filePath,
    start,
    end
  );
  if (!stream) {
    throw new Error(
      "error in s3Client.getAsStreamWithRange(filePath, start, end)"
    );
  }

  const contentLength = String(end - start + 1);
  return new Response(iteratorToStream(nodeStreamToIterator(stream!)), {
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    },
  });
}

async function* nodeStreamToIterator(stream: Readable) {
  for await (const chunk of stream) {
    yield new Uint8Array(chunk);
  }
}

function iteratorToStream(iterator: AsyncGenerator<Uint8Array, void, unknown>) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}
