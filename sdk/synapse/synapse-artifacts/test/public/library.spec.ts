// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ArtifactsClient } from "../../src/artifactsClient.js";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient } from "./utils/recordedClient.js";

describe("Library", () => {
  let recorder: Recorder;
  let client: ArtifactsClient;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
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
