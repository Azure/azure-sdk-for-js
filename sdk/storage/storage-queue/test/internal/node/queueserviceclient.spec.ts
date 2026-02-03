// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { newPipeline } from "../../../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../../utils/assert.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createQueueServiceClient } from "../../utils/node/clients.js";
import {
  getAccountKey,
  getStorageConnectionString,
  getStorageConnectionStringWithSas,
} from "../../utils/injectables.js";

describe("QueueServiceClient Node.js only", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it.runIf(getAccountKey())("can be created with AccountKey mode", async () => {
    const newClient = await createQueueServiceClient("AccountKey", { recorder });
    assert.isDefined(newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);
  });

  it.runIf(getAccountKey())("can be created with AccountKey mode and options", async () => {
    const newClient = await createQueueServiceClient("AccountKey", {
      recorder,
      options: {
        retryOptions: {
          maxTries: 5,
        },
      },
    });
    assert.isDefined(newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);
  });

  it("can be created with Pipeline mode", async () => {
    const queueServiceClient = await createQueueServiceClient("TokenCredential", { recorder });
    const credential = queueServiceClient["credential"];
    const pipeline = newPipeline(credential);
    const newClient = await createQueueServiceClient("Pipeline", { recorder, pipeline });

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);
  });

  it.runIf(getStorageConnectionString())(
    "can be created with AccountConnectionString mode",
    async () => {
      const newClient = await createQueueServiceClient("AccountConnectionString", { recorder });
      assert.isDefined(newClient);

      const result = await newClient.getProperties();

      assert.isDefined(result.requestId);
      assert.isAbove(result.requestId!.length, 0);
    },
  );

  it("can be created with Custom mode (TokenCredential)", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = await createQueueServiceClient("Custom", {
      recorder,
      credential: tokenCredential,
    });
    assertClientUsesTokenCredential(newClient);
  });

  it.runIf(getStorageConnectionStringWithSas())(
    "can be created with SASConnectionString mode",
    async () => {
      const newClient = await createQueueServiceClient("SASConnectionString", { recorder });
      assert.isDefined(newClient);
      const result = await newClient.getProperties();

      assert.isDefined(result.requestId);
      assert.isAbove(result.requestId!.length, 0);
    },
  );
});
