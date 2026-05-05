// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  configureStorageClient,
  getSASConnectionStringFromEnvironment,
  recorderEnvSetup,
  uriSanitizers,
} from "#test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { ShareServiceClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("FileServiceClient", () => {
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
    const newClient = ShareServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment(recorder),
    );
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
  });

  it("can be created from a sas connection string and an option bag", async () => {
    const newClient = ShareServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment(recorder),
      {
        retryOptions: {
          maxTries: 5,
        },
      },
    );
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
  });
});
