"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BucketItem } from "minio";

type Props = {
  videosList: BucketItem[];
};
export function VideoList({ videosList }: Props) {
  return (
    <>
      <h1>VideoList</h1>
      <ul>
        {videosList.map((item) => (
          <li key={item.name}>
            <Dialog>
              <DialogTrigger>{item.name}</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <video
                  src={"/api/videostream/" + item.name}
                  width="100%"
                  itemType="video/mp4"
                  autoPlay
                  controls
                ></video>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </>
  );
}
