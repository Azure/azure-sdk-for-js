// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { DataLakeServiceClient } from "../../src/index.js";
import {
  getSASConnectionStringFromEnvironment,
  recorderEnvSetup,
  configureStorageClient,
  uriSanitizers,
} from "#test-utils";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("DataLakeServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can be created from SASConnString", async () => {
    const newClient = DataLakeServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment(),
      {
        retryOptions: {
          maxTries: 1,
        },
      },
    );
    configureStorageClient(recorder, newClient);

    const listIter = newClient.listFileSystems();
    await listIter.next();
    assert.include(newClient.url, "dfs");
  });
});
