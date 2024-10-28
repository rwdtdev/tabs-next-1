import { getObjectsListAction } from "./getObjectsListAction";
import { VideoList } from "./VideoList";

export default async function VideoPage() {
  const videosList = await getObjectsListAction();
  //   console.log("🚀 ~ VideoPage ~ res:", videosList);
  return (
    <>
      <h1>VideoPage</h1>
      <VideoList videosList={videosList} />
    </>
  );
}
