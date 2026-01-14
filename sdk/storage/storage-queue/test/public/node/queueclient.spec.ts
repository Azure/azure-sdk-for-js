// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type { QueueServiceClient, QueueClient } from "../../../src/index.js";
import { getQueueServiceAccountAudience, newPipeline } from "../../../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../../utils/assert.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createQueueClient, createQueueServiceClient } from "./utils/clients.js";
import { getUniqueName } from "../utils/utils.js";
import { SimpleTokenCredential } from "../utils/simpleToken.js";
import {
  getAccountKey,
  getStorageConnectionString,
  getStorageConnectionStringWithSas,
} from "../../utils/injectables.js";

describe("QueueClient Node.js only", () => {
  let queueName: string;
  let queueServiceClient: QueueServiceClient;
  let queueClient: QueueClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    queueServiceClient = await createQueueServiceClient("TokenCredential", { recorder });
    queueName = getUniqueName("queue", { recorder });
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async () => {
    await queueClient.delete();
    await recorder.stop();
  });

  it("QueueClient default audience should work", async () => {
    const queueClientWithOAuthToken = await createQueueClient("TokenCredential", {
      queueName,
      recorder,
    });
    const exist = await queueClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("QueueClient customized audience should work", async () => {
    const queueClientWithOAuthToken = await createQueueClient("TokenCredential", {
      queueName,
      recorder,
      options: {
        audience: getQueueServiceAccountAudience(queueServiceClient.accountName),
      },
    });
    const exist = await queueClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("QueueClient Bearer token challenge should work", async () => {
    // Validate that bad audience should fail first.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const queueClientWithPlainOAuthToken = await createQueueClient("Custom", {
      queueName,
      recorder,
      credential: new SimpleTokenCredential(authToken!.token),
    });

    try {
      await queueClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const queueClientWithOAuthToken = await createQueueClient("TokenCredential", {
      queueName,
      recorder,
      options: {
        audience: "https://badaudience.blob.core.windows.net/.default",
      },
    });
    const exist = await queueClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("getAccessPolicy", async () => {
    const result = await queueClient.getAccessPolicy();
    assert.isDefined(result.requestId);
    assert.isDefined(result.clientRequestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("setAccessPolicy", async () => {
    const queueAcl = [
      {
        accessPolicy: {
          expiresOn: new Date("2018-12-31T11:22:33.4567890Z"),
          permissions: "raup",
          startsOn: new Date("2017-12-31T11:22:33.4567890Z"),
        },
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];

    await queueClient.setAccessPolicy(queueAcl);
    const result = await queueClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, queueAcl);
  });

  it("setAccessPolicy with OAuth", async () => {
    const queueClientWithOAuthToken = await createQueueClient("TokenCredential", {
      queueName,
      recorder,
    });

    const queueAcl = [
      {
        accessPolicy: {
          expiresOn: new Date("2018-12-31T11:22:33.4567890Z"),
          permissions: "raup",
          startsOn: new Date("2017-12-31T11:22:33.4567890Z"),
        },
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];

    await queueClientWithOAuthToken.setAccessPolicy(queueAcl);
    const result = await queueClientWithOAuthToken.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, queueAcl);
  });

  it("setAccessPolicy should work when permissions, expiry and start undefined", async () => {
    const queueAcl = [
      {
        accessPolicy: {
          permissions: "raup",
        },
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];
    await queueClient.setAccessPolicy(queueAcl);
    const result = await queueClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, queueAcl);

    const queueAclEmpty = [
      {
        accessPolicy: {},
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];
    await queueClient.setAccessPolicy(queueAclEmpty);
    const resultEmpty = await queueClient.getAccessPolicy();
    assert.deepEqual(resultEmpty.signedIdentifiers[0].accessPolicy, undefined);
  });

  it.runIf(getAccountKey())("can be created with AccountKey mode", async () => {
    const newClient = await createQueueClient("AccountKey", { queueName, recorder });
    assert.isDefined(newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.approximateMessagesCount);
    assert.isAtLeast(result.approximateMessagesCount, 0);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it.runIf(getAccountKey())("can be created with AccountKey mode and options", async () => {
    const newClient = await createQueueClient("AccountKey", {
      queueName,
      recorder,
      options: {
        retryOptions: {
          maxTries: 5,
        },
      },
    });
    assert.isDefined(newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.approximateMessagesCount);
    assert.isAtLeast(result.approximateMessagesCount, 0);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("can be created with Pipeline mode", async () => {
    const credential = queueClient["credential"];
    const pipeline = newPipeline(credential);
    const newClient = await createQueueClient("Pipeline", {
      queueName,
      recorder,
      pipeline,
    });

    const result = await newClient.getProperties();

    assert.isDefined(result.approximateMessagesCount);
    assert.isAtLeast(result.approximateMessagesCount, 0);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it.runIf(getStorageConnectionString())(
    "can be created with AccountConnectionString mode",
    async () => {
      const newClient = await createQueueClient("AccountConnectionString", { queueName, recorder });
      assert.isDefined(newClient);

      const result = await newClient.getProperties();

      assert.isDefined(result.requestId);
      assert.isDefined(result.version);
      assert.isDefined(result.date);
    },
  );

  it.runIf(getStorageConnectionString())(
    "can be created with AccountConnectionString mode and options",
    async () => {
      const newClient = await createQueueClient("AccountConnectionString", {
        queueName,
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
      assert.isDefined(result.version);
      assert.isDefined(result.date);
    },
  );

  it.runIf(getStorageConnectionStringWithSas())(
    "can be created with SASConnectionString mode",
    async () => {
      const newClient = await createQueueClient("SASConnectionString", { queueName, recorder });
      assert.isDefined(newClient);

      const result = await newClient.getProperties();
      assert.isDefined(result.requestId);
      assert.isDefined(result.version);
      assert.isDefined(result.date);
    },
  );

  it("can be created with SASConnectionString mode and options", async () => {
    const newClient = await createQueueClient("SASConnectionString", {
      queueName,
      recorder,
      options: {
        retryOptions: {
          maxTries: 5,
        },
      },
    });
    assert.isDefined(newClient);

    const result = await newClient!.getProperties();

    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("can be created with SASToken mode", async () => {
    const newClient = await createQueueClient("SASToken", { queueName, recorder });
    assert.isDefined(newClient);

    const result = await newClient!.getProperties();

    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("can be created with Custom mode (TokenCredential)", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = await createQueueClient("Custom", {
      queueName,
      recorder,
      credential: tokenCredential,
    });
    assertClientUsesTokenCredential(newClient);
  });
});
