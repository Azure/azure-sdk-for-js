import { isLiveMode, isPlaybackMode, env } from "@azure/test-utils-recorder";
import { QueueServiceClient, StoragePipelineOptions } from "@azure/storage-queue";
import { RecordingHttpClient } from "@azure/test-utils-recorder-new";
import { config } from "dotenv";
config();

describe("Tests", () => {
  it("storage test", async function() {
    const file = `file_path.json`;
    // env.TEST_MODE = "record";
    env.TEST_MODE = "playback";
    // env.TEST_MODE = "playback";
    const recorder = new RecordingHttpClient(file, isPlaybackMode());
    const options: StoragePipelineOptions = {};
    if (!isLiveMode()) {
      options.httpClient = recorder;
    }
    const client = new QueueServiceClient(env.STORAGE_SAS_URL);

    // await client.createContainer("harshan-" + `${Math.ceil(Math.random() * 1000) + 1000}`);
    console.log(await client.createQueue("harshan-1067"));
    await recorder.stop();
  });
});
