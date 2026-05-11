// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueueServiceClient } from "../../src/QueueServiceClient.js";
import { getSASConnectionStringFromEnvironment, uriSanitizers } from "#test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { configureStorageClient, recorderEnvSetup } from "#test-utils";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("QueueServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can be created from a sas connection string", async () => {
    const newClient = QueueServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment(recorder),
    );
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
  });
});
