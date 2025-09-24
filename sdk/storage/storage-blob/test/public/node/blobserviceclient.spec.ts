// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "./utils/clients.js";
import { getStorageConnectionStringWithSas } from "../../utils/injectables.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { SimpleTokenCredential } from "../utils/simpleToken.js";
import { isRestError } from "@azure/core-rest-pipeline";

describe("BlobServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can be created from a connection string", async () => {
    const newClient = await createBlobServiceClient("AccountConnectionString", { recorder });
    if (!newClient) {
      assert.fail("Failed to create BlobServiceClient from connection string");
    }
    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("can be created from a connection string and an option bag", async () => {
    const newClient = await createBlobServiceClient("AccountConnectionString", {
      recorder,
      options: {
        retryOptions: { maxTries: 5 },
      },
    });
    if (!newClient) {
      assert.fail("Failed to create BlobServiceClient from connection string");
    }

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it.runIf(getStorageConnectionStringWithSas())(
    "can be created from a sas connection string",
    async () => {
      const newClient = await createBlobServiceClient("SASConnectionString", { recorder });
      assert.isDefined(newClient);
      const result = await newClient.getProperties();

      assert.ok(typeof result.requestId);
      assert.ok(result.requestId!.length > 0);
    },
  );

  it("Bearer token challenge should work", async () => {
    // To validate that bad audience should fail.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const blobServiceClientWithPlainOAuthToken = await createBlobServiceClient("Custom", {
      recorder,
      credential: new SimpleTokenCredential(authToken.token),
    });

    try {
      await blobServiceClientWithPlainOAuthToken.getProperties();
      assert.fail("Should fail with 401");
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.strictEqual(err.statusCode, 401);
    }
    const blobServiceClientWithOAuthToken = await createBlobServiceClient("TokenCredential", {
      recorder,
      options: {
        audience: ["https://badaudience.blob.core.windows.net/.default"],
      },
    });
    await blobServiceClientWithOAuthToken.getProperties();
  });
});
