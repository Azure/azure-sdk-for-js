import { ServiceClient, ServiceClientOptions, WebResource } from "@azure/core-http";
import { isLiveMode, isPlaybackMode, env } from "@azure/test-utils-recorder";
import { RecordingHttpClient } from "../src";
// import { createDefaultHttpClient, createPipelineRequest } from "@azure/core-rest-pipeline";

describe("Tests", () => {
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
