import { isLiveMode, isPlaybackMode, env } from "@azure/test-utils-recorder";
import { BlobServiceClient, StoragePipelineOptions } from "@azure/storage-blob";
import { RecordingHttpClient } from "../src";
import { config } from "dotenv";
config();

describe("Tests", () => {
  it.only("storage test", async function() {
    const file = `file_path.json`;
    // env.TEST_MODE = "record";
    env.TEST_MODE = "playback";
    // env.TEST_MODE = "playback";
    const recorder = new RecordingHttpClient(file, isPlaybackMode());
    const options: StoragePipelineOptions = {};
    if (!isLiveMode()) {
      options.httpClient = recorder;
    }

    const connString = env.STORAGE_CONNECTION_STRING || "";
    console.log(connString);
    const client = BlobServiceClient.fromConnectionString(connString, options);

    // await client.createContainer("harshan-" + `${Math.ceil(Math.random() * 1000) + 1000}`);
    await client.createContainer("harshan-1043");
    await recorder.stop();
  });
});
