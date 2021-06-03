import { ServiceClient, WebResource } from "@azure/core-http";
import { isLiveMode, isPlaybackMode, env } from "@azure/test-utils-recorder";
import { RecordingHttpClient } from "../src";

describe("Tests", () => {
  it("Sample test", async function() {
    const file = `file_path.json`;
    env.TEST_MODE = "record";
    const recorder = new RecordingHttpClient(file, isPlaybackMode());
    const client = new ServiceClient(undefined, {
      httpClient: !isLiveMode() ? recorder : undefined
    });
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
      true // keepAlive
    );
    const response = await client.sendRequest(webResource);
    console.log(response.parsedBody);
    await recorder.stop();
  });
});
