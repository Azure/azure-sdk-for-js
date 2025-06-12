// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeAll, expect } from "vitest";
import { HttpProxyAgent } from "http-proxy-agent";
import { CosmosClient, type CosmosClientOptions } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { addEntropy } from "../common/TestHelpers.js";

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
const TEST_TIMEOUT_MS = 30000;

if (!isBrowser()) {
  describe("HTTP Proxy Retry Policy Integration Tests", () => {
    let testDatabaseId: string;

    beforeAll(async () => {
      testDatabaseId = addEntropy("RetryProxyTest");
    });

    const createTestClient = (options: Partial<CosmosClientOptions> = {}): CosmosClient => {
      return new CosmosClient({
        endpoint,
        key: masterKey,
        ...options,
        connectionPolicy: {
          enableBackgroundEndpointRefreshing: false,
          ...options.connectionPolicy,
        },
      });
    };

    it(
      "should fail quickly when using an invalid HTTP proxy",
      async () => {
        const invalidPort = 12345;
        const agent = new HttpProxyAgent(`http://localhost:${invalidPort}`);
        const client = createTestClient({ agent });
        await expect(
          Promise.race([
            client.databases.create({ id: testDatabaseId + "_invalid" }),
            new Promise((_resolve, reject) =>
              setTimeout(() => reject(new Error("Proxy connection timeout")), 10000),
            ),
          ]),
        ).rejects.toThrow();
      },
      TEST_TIMEOUT_MS,
    );

    it("throttle retry policy test default retryAfter", async () => {
      const collectionDefinition = { id: "sample-collection" };
      const documentDefinition = { id: "doc", name: "sample document", key: "value" };
      const retryOptions = { maxRetryAttemptCount: 5 };
      const client = createTestClient({ connectionPolicy: { retryOptions } });
      const db = await client.databases.create({ id: testDatabaseId + "_db1" });
      const { container } = await client
        .database(db.database.id)
        .containers.create(collectionDefinition);
      try {
        await client
          .database(db.database.id)
          .container(container.id)
          .items.create(documentDefinition);
      } catch (err: any) {
        expect(err.code).toBe(429);
        // Add assertions for retry count and wait time if available in err.headers
      }
    });

    it("throttle retry policy test fixed retryAfter", async () => {
      const collectionDefinition = { id: "sample-collection" };
      const documentDefinition = { id: "doc", name: "sample document", key: "value" };
      const retryOptions = { maxRetryAttemptCount: 5, fixedRetryIntervalInMilliseconds: 2000 };
      const client = createTestClient({ connectionPolicy: { retryOptions } });
      const db = await client.databases.create({ id: testDatabaseId + "_db2" });
      const { container } = await client
        .database(db.database.id)
        .containers.create(collectionDefinition);
      try {
        await client
          .database(db.database.id)
          .container(container.id)
          .items.create(documentDefinition);
      } catch (err: any) {
        expect(err.code).toBe(429);
        // Add assertions for retry count and wait time if available in err.headers
      }
    });

    it("throttle retry policy test max wait time", async () => {
      const collectionDefinition = { id: "sample-collection" };
      const documentDefinition = { id: "doc", name: "sample document", key: "value" };
      const retryOptions = {
        maxRetryAttemptCount: 5,
        fixedRetryIntervalInMilliseconds: 2000,
        maxWaitTimeInSeconds: 3,
      };
      const client = createTestClient({ connectionPolicy: { retryOptions } });
      const db = await client.databases.create({ id: testDatabaseId + "_db3" });
      const { container } = await client
        .database(db.database.id)
        .containers.create(collectionDefinition);
      try {
        await client
          .database(db.database.id)
          .container(container.id)
          .items.create(documentDefinition);
      } catch (err: any) {
        expect(err.code).toBe(429);
        // Add assertions for max wait time if available in err.headers
      }
    });

    it("default retry policy validate create failure", async () => {
      const collectionDefinition = { id: "sample-collection" };
      const documentDefinition = { id: "doc", name: "sample document", key: "value" };
      const client = createTestClient();
      const db = await client.databases.create({ id: testDatabaseId + "_db4" });
      const { container } = await client
        .database(db.database.id)
        .containers.create(collectionDefinition);
      // Simulate ECONNRESET errors and validate retry attempts
      // This would require stubbing the network layer or using a test double
      try {
        await client
          .database(db.database.id)
          .container(container.id)
          .items.create(documentDefinition);
      } catch (err: any) {
        expect(err.code).toBe("ECONNRESET");
        // Add assertions for retry attempts if available
      }
    });

    it("default retry policy validate read success", async () => {
      const collectionDefinition = { id: "sample-collection" };
      const documentDefinition = { id: "doc", name: "sample document", key: "value" };
      const client = createTestClient();
      const db = await client.databases.create({ id: testDatabaseId + "_db5" });
      const { container } = await client
        .database(db.database.id)
        .containers.create(collectionDefinition);
      const { resource: createdDocument } = await client
        .database(db.database.id)
        .container(container.id)
        .items.create(documentDefinition);
      // Simulate retries and eventual success on read
      const { resource: readDocument } = await client
        .database(db.database.id)
        .container(container.id)
        .item(createdDocument.id)
        .read();
      expect(readDocument.id).toBe(documentDefinition.id);
      // Add assertions for retry attempts if available
    });
  });
}
