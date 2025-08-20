// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Agent } from "node:http";
import { CosmosClient } from "@azure/cosmos";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import {
  getTestDatabase,
  getTestContainer,
  generateDocuments,
  bulkInsertItems,
} from "../common/TestHelpers.js";
import { UsernamePasswordCredential } from "@azure/identity";
import { defaultConnectionPolicy } from "$internal/documents/index.js";
import { describe, it, assert } from "vitest";

describe("Client Tests", { timeout: 200000 }, () => {
  describe("Validate client request timeout", () => {
    it.skip("timeout occurs within expected timeframe", async () => {
      // making timeout 1 ms to make sure it will throw
      // (create database request takes 10ms-15ms to finish on emulator)
      const client = new CosmosClient({
        endpoint,
        key: masterKey,
        connectionPolicy: { requestTimeout: 1, enableBackgroundEndpointRefreshing: false },
      });
      // create database
      try {
        await getTestDatabase("request timeout", client);
        assert.fail("Must throw when trying to connect to database");
      } catch (err: any) {
        assert.equal(err.name, "TimeoutError", "client should throw exception");
        assert.equal(
          err.message,
          "Timeout Error! Request took more than 1 ms",
          "client should throw exception",
        );
      }
    });
  });

  describe("Constructor", () => {
    it("Accepts node Agent", () => {
      const client = new CosmosClient({
        endpoint: "https://faaaaaake.com",
        agent: new Agent(),
        connectionPolicy: { enableBackgroundEndpointRefreshing: false },
      });
      assert.ok(client !== undefined, "client shouldn't be undefined if it succeeded");
    });
    it("Accepts a connection string", () => {
      const client = new CosmosClient(`AccountEndpoint=${endpoint};AccountKey=${masterKey};`);
      assert.ok(client !== undefined, "client shouldn't be undefined if it succeeded");
      client.dispose();
    });
    it("throws on a bad connection string", () => {
      assert.throws(() => new CosmosClient(`bad;Connection=string;`));
    });
    it("throws on a bad endpoint", () => {
      assert.throws(() => new CosmosClient({ endpoint: "asda=asda;asada;" }));
    });
    it("fails to read databases with bad AAD authentication", async () => {
      try {
        const credentials = new UsernamePasswordCredential(
          "fake-tenant-id",
          "fake-client-id",
          "fakeUsername",
          "fakePassword",
        );
        const client = new CosmosClient({
          endpoint,
          aadCredentials: credentials,
          connectionPolicy: { enableBackgroundEndpointRefreshing: false },
        });
        await client.databases.readAll().fetchAll();
      } catch (e: any) {
        assert.equal(e.name, "AuthenticationRequiredError");
      }
    });
  });
  describe.skip("Validate user passed AbortController.signal", () => {
    it("should throw exception if aborted during the request", async () => {
      const client = new CosmosClient({ endpoint, key: masterKey });
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => controller.abort(), 1);
        await client.getDatabaseAccount({ abortSignal: signal });
        assert.fail("Must throw when trying to connect to database");
      } catch (err: any) {
        assert.equal(err.name, "AbortError", "client should throw exception");
      }
      client.dispose();
    });
    it("should throw exception if passed an already aborted signal", async () => {
      const client = new CosmosClient({ endpoint, key: masterKey });
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        controller.abort();
        await client.getDatabaseAccount({ abortSignal: signal });
        assert.fail("Must throw when trying to connect to database");
      } catch (err: any) {
        assert.equal(err.name, "AbortError", "client should throw exception");
      }
      client.dispose();
    });
    it("should abort a query", async () => {
      const container = await getTestContainer("abort query");
      await bulkInsertItems(container, generateDocuments(20));
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => controller.abort(), 50);
        // Setting maxItemCount = 1 to ensure this query take a long time
        await container.items
          .query("SELECT * from c", { abortSignal: signal, maxItemCount: 1 })
          .fetchAll();
        assert.fail("Must throw");
      } catch (err: any) {
        assert.equal(err.name, "AbortError", "client should throw exception");
      }
    });
    it("should not abort if abort signal is never called", async () => {
      // Testing the happy path to prevent this bug https://github.com/Azure/azure-sdk-for-js/issues/9510
      const client = new CosmosClient({ endpoint, key: masterKey });
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        await client.getDatabaseAccount({ abortSignal: signal });
      } catch (err: any) {
        assert.fail(err);
      }
      client.dispose();
    });
  });
  describe("Background refresher", async () => {
    // not async to leverage done() callback inside setTimeout
    it("should fetch new endpoints", async () => {
      // set refresh rate to 700ms
      const client = new CosmosClient({
        endpoint,
        key: masterKey,
        connectionPolicy: {
          ...defaultConnectionPolicy,
          endpointRefreshRateInMs: 700,
          enableBackgroundEndpointRefreshing: true,
        },
      });

      // then timeout 1.2s so that we first fetch no endpoints, then after it refreshes we see them
      const firstEndpoints = await client.getReadEndpoints();
      assert.equal(firstEndpoints.length, 0);

      const sleep = (ms: number): Promise<void> =>
        new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(1200);

      const endpoints = await client.getReadEndpoints();
      assert.notEqual(firstEndpoints, endpoints);
    });
  });
});
