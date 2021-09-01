import { ArtifactsClient } from "../../src/artifactsClient";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("Library", () => {
  let recorder: Recorder;
  let client: ArtifactsClient;

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  const testLibraryName = "testLibraryName.jar";
  it("should create library", async () => {
    const poller = await client.library.beginCreate(testLibraryName);
    await poller.pollUntilDone();
    assert.isTrue(poller.isDone());
  }).timeout(30000);

  it("should list library", async () => {
    const libraries = client.library.list();

    let count = 0;
    for await (const _library of libraries) {
      count++;
    }

    assert.ok(count > 0);
  });

  it("should get library", async () => {
    const result = await client.library.get(testLibraryName);
    assert.equal(result.name, testLibraryName);
  });

  it("should delete library", async () => {
    const poller = await client.library.beginDelete(testLibraryName);
    await poller.pollUntilDone();
    assert.isTrue(poller.isDone());
  }).timeout(30000);
});
