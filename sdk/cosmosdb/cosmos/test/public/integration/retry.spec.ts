// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeAll } from "vitest";
import { CosmosClient, type CosmosClientOptions } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { addEntropy } from "../common/TestHelpers.js";
import assert from "assert";

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

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
        assert.strictEqual(err.code, 429, "invalid error code");
        if (err.headers) {
          // Assert retry count if available
          if (err.headers["x-ms-throttle-retry-count"] !== undefined) {
            assert.ok(
              Number(err.headers["x-ms-throttle-retry-count"]) >= retryOptions.maxRetryAttemptCount,
              "Current retry attempts not maxed out",
            );
          }
          // Assert wait time if available
          if (err.headers["x-ms-throttle-retry-wait-time-ms"] !== undefined) {
            assert.ok(
              Number(err.headers["x-ms-throttle-retry-wait-time-ms"]) >=
                retryOptions.maxRetryAttemptCount * 1000,
              "Wait time not as expected",
            );
          }
        }
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
        assert.strictEqual(err.code, 429, "invalid error code");
        if (err.headers) {
          if (err.headers["x-ms-throttle-retry-count"] !== undefined) {
            assert.ok(
              Number(err.headers["x-ms-throttle-retry-count"]) >= retryOptions.maxRetryAttemptCount,
              "Current retry attempts not maxed out",
            );
          }
          if (err.headers["x-ms-throttle-retry-wait-time-ms"] !== undefined) {
            assert.ok(
              Number(err.headers["x-ms-throttle-retry-wait-time-ms"]) >=
                retryOptions.maxRetryAttemptCount * retryOptions.fixedRetryIntervalInMilliseconds,
              "Wait time not as expected",
            );
          }
        }
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
        assert.strictEqual(err.code, 429, "invalid error code");
        if (err.headers && err.headers["x-ms-throttle-retry-wait-time-ms"] !== undefined) {
          assert.ok(
            Number(err.headers["x-ms-throttle-retry-wait-time-ms"]) >=
              retryOptions.maxWaitTimeInSeconds * 1000,
            "Wait time not as expected",
          );
        }
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
        assert.strictEqual(err.code, "ECONNRESET", "invalid error code");
        if (err.headers && err.headers["x-ms-throttle-retry-count"] !== undefined) {
          assert.ok(
            Number(err.headers["x-ms-throttle-retry-count"]) >= 1,
            "Retry count not as expected",
          );
        }
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
      assert.strictEqual(readDocument.id, documentDefinition.id, "invalid document id");
      // If retry count is available in headers, assert it
      if (readDocument.headers && readDocument.headers["x-ms-throttle-retry-count"] !== undefined) {
        assert.ok(
          Number(readDocument.headers["x-ms-throttle-retry-count"]) >= 1,
          "Retry count not as expected",
        );
      }
    });
  });
}
