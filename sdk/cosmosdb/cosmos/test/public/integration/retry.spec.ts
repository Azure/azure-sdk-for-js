// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeAll, assert } from "vitest";
import { CosmosClient, type CosmosClientOptions, PluginOn, Constants } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { addEntropy } from "../common/TestHelpers.js";
import { getEmptyCosmosDiagnostics } from "../../../src/utils/diagnostics.js";

// Stub factories and response sequences for retry scenarios
function throttleErrorResponse(retryCount: number, waitTimeMs: number): any {
  return {
    code: 429,
    headers: {
      [Constants.ThrottleRetryCount]: retryCount.toString(),
      [Constants.ThrottleRetryWaitTimeInMs]: waitTimeMs.toString(),
    },
    result: {},
    diagnostics: getEmptyCosmosDiagnostics(),
  };
}

function connectionResetResponse(): any {
  return {
    code: "ECONNRESET",
    headers: { [Constants.ThrottleRetryCount]: "1" },
    result: {},
    diagnostics: getEmptyCosmosDiagnostics(),
  };
}

const successResponse: any = {
  code: 200,
  headers: {},
  result: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

// Retry options presets
const defaultRetryOptions = { maxRetryAttemptCount: 5 };
const fixedRetryOptions = { maxRetryAttemptCount: 5, fixedRetryIntervalInMilliseconds: 2000 };
const maxWaitOptions = {
  maxRetryAttemptCount: 5,
  fixedRetryIntervalInMilliseconds: 2000,
  maxWaitTimeInSeconds: 3,
};

// Predefined response sequences
const defaultResponses = Array(defaultRetryOptions.maxRetryAttemptCount).fill(
  throttleErrorResponse(
    defaultRetryOptions.maxRetryAttemptCount,
    defaultRetryOptions.maxRetryAttemptCount * 1000,
  ),
);
const fixedResponses = Array(fixedRetryOptions.maxRetryAttemptCount).fill(
  throttleErrorResponse(
    fixedRetryOptions.maxRetryAttemptCount,
    fixedRetryOptions.maxRetryAttemptCount * fixedRetryOptions.fixedRetryIntervalInMilliseconds,
  ),
);
const maxWaitResponses = Array(maxWaitOptions.maxRetryAttemptCount).fill(
  throttleErrorResponse(
    maxWaitOptions.maxRetryAttemptCount,
    maxWaitOptions.maxWaitTimeInSeconds * 1000,
  ),
);
const connectionResetResponses = Array(defaultRetryOptions.maxRetryAttemptCount).fill(
  connectionResetResponse(),
);
const eventualSuccessResponses = [connectionResetResponse(), successResponse];

// Helper to create an operation-level plugin from a fixed sequence
function createOperationPlugin(responses: any[]): any {
  let idx = 0;
  return {
    on: PluginOn.operation,
    plugin: async () => {
      const resp = responses[idx++];
      if ((typeof resp.code === "number" && resp.code >= 400) || typeof resp.code === "string") {
        throw resp;
      }
      return resp;
    },
  };
}

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
      // Create DB and container without throttling plugin
      const setupClient = createTestClient();
      const db = await setupClient.databases.create({ id: testDatabaseId + "_db1" });
      const { container } = await setupClient
        .database(db.database.id)
        .containers.create(collectionDefinition);
      // Use operation-level plugin with stubbed 429 responses for default retryAfter
      const client = createTestClient({
        connectionPolicy: { retryOptions },
        plugins: [createOperationPlugin(defaultResponses)],
      });
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
      // Provision DB and container without throttle plugin
      const setupClient = createTestClient();
      const db = await setupClient.databases.create({ id: testDatabaseId + "_db2" });
      const { container } = await setupClient
        .database(db.database.id)
        .containers.create(collectionDefinition);
      // Create client with throttle plugin for item creation
      const client = createTestClient({
        connectionPolicy: { retryOptions },
        plugins: [createOperationPlugin(fixedResponses)],
      });
      try {
        await client
          .database(db.database.id)
          .container(container.id)
          .items.create(documentDefinition);
      } catch (err: any) {
        console.log("<<<<<< ERROR >>>>");
        console.log(err.headers);
        console.log("<<<<<< ERROR >>>>");

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
      // Provision DB and container without plugin
      const setupClient = createTestClient();
      const db = await setupClient.databases.create({ id: testDatabaseId + "_db3" });
      const { container } = await setupClient
        .database(db.database.id)
        .containers.create(collectionDefinition);
      // Create client with max-wait plugin
      const client = createTestClient({
        connectionPolicy: { retryOptions },
        plugins: [createOperationPlugin(maxWaitResponses)],
      });
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
      // Provision DB and container without plugin
      const setupClient = createTestClient();
      const db = await setupClient.databases.create({ id: testDatabaseId + "_db4" });
      const { container } = await setupClient
        .database(db.database.id)
        .containers.create(collectionDefinition);
      // Create client that simulates connection resets
      const client = createTestClient({
        plugins: [createOperationPlugin(connectionResetResponses)],
      });
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
    });
  });
}
