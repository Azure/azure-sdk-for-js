// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container } from "@azure/cosmos";
import { CosmosClient } from "@azure/cosmos";
import { addEntropy, removeAllDatabases } from "../common/TestHelpers.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { describe, it, assert, beforeEach } from "vitest";

describe("Timeout", () => {
  beforeEach(async () => {
    await removeAllDatabases();
  });

  it("successfully exits queries after a timeout duration", async () => {
    const clientA = new CosmosClient({
      endpoint,
      key: masterKey,
      connectionPolicy: {
        enableBackgroundEndpointRefreshing: false,
        requestTimeout: 500,
        retryOptions: {
          maxRetryAttemptCount: 2,
          maxWaitTimeInSeconds: 5,
          fixedRetryIntervalInMilliseconds: 0,
        },
      },
      plugins: [
        {
          on: "request",
          plugin: async (context, diagNode, next) => {
            assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
            // Simulate a request longer than our timeout duration
            await new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1500);
            });
            const response = await next(context);
            return response;
          },
        },
      ],
    });

    const dbId = addEntropy("timeouttest");
    const containerId = addEntropy("timeouttest");

    // Create Database and Container
    try {
      const { database } = await clientA.databases.createIfNotExists({
        id: dbId,
      });
      const { container } = await database.containers.createIfNotExists({
        id: containerId,
      });

      // Create an item using client
      await createItem(container);
    } catch (e: any) {
      assert.equal(e.code, "TimeoutError");
    }
  });
});

async function createItem(container: Container): Promise<string> {
  const {
    resource: { id },
  } = await container.items.create({
    id: (Math.random() + 1).toString(36).substring(7),
  });
  return id;
}
