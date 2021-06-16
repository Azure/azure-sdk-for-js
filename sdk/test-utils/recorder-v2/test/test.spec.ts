import { ServiceClient, ServiceClientOptions, WebResource } from "@azure/core-http";
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

  it("Sample test", async function() {
    const file = `file_path.json`;
    // env.TEST_MODE = "record";
    env.TEST_MODE = "playback";
    // env.TEST_MODE = "playback";
    const recorder = new RecordingHttpClient(file, isPlaybackMode());
    const options: ServiceClientOptions = {};
    if (!isLiveMode()) {
      options.httpClient = recorder;
    }

    const client = new ServiceClient(undefined, options);
    const url = "https://randomuser.me/api/";
    const webResource = new WebResource(
      url,
      undefined,
      undefined,
      undefined,
      undefined,
      false, // streamResponseBody
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true, // keepAlive
      true // decompress response
    );
    await client.sendRequest(webResource);
    // console.log(response.parsedBody);
    await recorder.stop();
  });

  // it("Sample test 2 ", async function() {
  //   const file = `file_path_2.json`;
  //   env.TEST_MODE = "record";
  //   // env.TEST_MODE = "playback";
  //   // env.TEST_MODE = "playback";
  //   const recorder = new RecordingHttpClient(file, isPlaybackMode());
  //   // const client = new ServiceClient(undefined, {
  //   //   httpClient: !isLiveMode() ? recorder : undefined
  //   // });
  //   const url = "https://randomuser.me/api/";

  //   const client = createDefaultHttpClient();
  //   client.request = createPipelineRequest({
  //     url,
  //     streamResponseStatusCodes: new Set([200, 206])
  //   });
  //   const response = await client.sendRequest(this.request);
  //   console.log(response.parsedBody);

  //   const webResource = new WebResource(
  //     url,
  //     undefined,
  //     undefined,
  //     undefined,
  //     undefined,
  //     false, // streamResponseBody
  //     undefined,
  //     undefined,
  //     undefined,
  //     undefined,
  //     undefined,
  //     undefined,
  //     true, // keepAlive
  //     true // decompress response
  //   );
  //   const response = await client.sendRequest(webResource);
  //   console.log(response.parsedBody);
  //   await recorder.stop();
  // });
});
