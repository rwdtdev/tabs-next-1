"use server";
import { minioClient } from "@/lib/minioClient";
import { BucketItem } from "minio";

export async function getObjectsListAction(): Promise<BucketItem[]> {
  const objects: BucketItem[] = [];
  const objectsStream = minioClient.listObjectsV2(
    "minio-bucket-1",
    "",
    true,
    ""
  );

  return new Promise((res, rej) => {
    objectsStream.on("data", function (obj) {
      objects.push(obj);
    });
    objectsStream.on("end", function () {
      //   console.log(objects);
      res(objects);
    });
    objectsStream.on("error", function (err) {
      console.log(err);
      rej(err);
    });
  });
}
