import { isLiveMode, isPlaybackMode, env } from "@azure/test-utils-recorder";
import { QueueServiceClient, StoragePipelineOptions } from "@azure/storage-queue";
import { TestProxyHttpClientCoreV1 } from "@azure/test-utils-recorder-new";
import { config } from "dotenv";
import { isNode } from "@azure/core-util";
config();

describe("Tests", () => {
  it("storage test", async function() {
    const file = (isNode ? "node_" : "browser_") + `core_v1_file_path.json`;
    const recorder = new TestProxyHttpClientCoreV1(file, isPlaybackMode());
    const options: StoragePipelineOptions = {};
    if (!isLiveMode()) {
      options.httpClient = recorder;
    }
    const client = new QueueServiceClient(env.STORAGE_SAS_URL, undefined, options);
    if (!isLiveMode()) await recorder.start();

    await client.createQueue((isNode ? "node-" : "browser-") + "1320");

    if (!isLiveMode()) await recorder.stop();
  });
});
