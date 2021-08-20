import { isLiveMode, isPlaybackMode, env } from "@azure/test-utils-recorder";
import { QueueServiceClient, StoragePipelineOptions } from "@azure/storage-queue";
import { RecordingHttpClient } from "@azure/test-utils-recorder-new";
import { config } from "dotenv";
import { isNode } from "@azure/core-util";
config();

describe("Tests", () => {
  it("storage test", async function() {
    const file = (isNode ? "node_" : "browser_") + `file_path.json`;
    console.log(`env.TEST_MODE = ${env.TEST_MODE}`);
    const recorder = new RecordingHttpClient(file, isPlaybackMode());
    const options: StoragePipelineOptions = {};
    if (!isLiveMode()) {
      options.httpClient = recorder;
    }
    const client = new QueueServiceClient(env.STORAGE_SAS_URL, undefined, options);
    await client.createQueue((isNode ? "node_" : "browser_") + 1320);
    await recorder.stop();
  });
});
