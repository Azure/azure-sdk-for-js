import { ArtifactsClientRestClient } from "../../src/artifactsClient";
import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { paginate } from "../../src/pagination";
import { getLongRunningPoller } from "../../src/longRunningHelper";

describe("Library", () => {
  let recorder: Recorder;
  let client: ArtifactsClientRestClient;

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  const testLibraryName = "testLibraryName3.jar";

  it("should create library", async () => {
    const testLibraryName = "testLibraryName3.jar";
    const operationResult = await client.path("/libraries/{libraryName}", testLibraryName).put();
    const poller = getLongRunningPoller(client, operationResult);
    const result = await poller.pollUntilDone();

    assert.equal(result.status, "200");
  }).timeout(30000);

  it("should list library", async () => {
    const result = await client.path("/libraries").get();

    if (result.status !== "200") {
      throw new Error(`Unexpected status: ${result.status}`);
    }

    const libraries = paginate(client, result);

    let count = 0;
    for await (const library of libraries) {
      console.log(library.name);
      count++;
    }

    assert.equal(count, 2);
  });

  it("should get library", async () => {
    const result = await client.path("/libraries/{libraryName}", testLibraryName).get();

    if (result.status === "500") {
      throw result.body.error;
    }

    if (result.status === "200") {
      assert.equal(result.body.name, testLibraryName);
    } else {
      throw new Error(`Unexpected status: ${result.status}`);
    }
  });

  it("should delete library", async () => {
    const initialResponse = await client.path("/libraries/{libraryName}", testLibraryName).delete();
    const poller = getLongRunningPoller(client, initialResponse);
    const result = await poller.pollUntilDone();
    assert.equal(result.status, "200");
  }).timeout(30000);
});
