// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { Container, CosmosClient } from "../../../src";
import { addEntropy, removeAllDatabases } from "../common/TestHelpers";
import { endpoint } from "../common/_testConfig";
import { masterKey } from "../common/_fakeTestSecrets";

describe("Timeout", function() {
  beforeEach(async function() {
    await removeAllDatabases();
  });

  it("successfully exits queries after a timeout duration", async function() {
    const clientA = new CosmosClient({
      endpoint,
      key: masterKey,
      connectionPolicy: {
        enableBackgroundEndpointRefreshing: false,
        requestTimeout: 500,
        retryOptions: {
          maxRetryAttemptCount: 2,
          maxWaitTimeInSeconds: 5,
          fixedRetryIntervalInMilliseconds: 0
        }
      },
      plugins: [
        {
          on: "request",
          plugin: async (context, next) => {
            // Simulate a request longer than our timeout duration
            await new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1500);
            });
            const response = await next(context);
            return response;
          }
        }
      ]
    });

    const dbId = addEntropy("timeouttest");
    const containerId = addEntropy("timeouttest");

    // Create Database and Container
    try {
      const { database } = await clientA.databases.createIfNotExists({
        id: dbId
      });
      const { container } = await database.containers.createIfNotExists({
        id: containerId
      });

      // Create an item using client
      await createItem(container);
    } catch (e) {
      assert.equal(e.code, "TimeoutError");
    }
  });
});

async function createItem(container: Container) {
  const {
    resource: { id }
  } = await container.items.create({
    id: (Math.random() + 1).toString(36).substring(7)
  });
  return id;
}
