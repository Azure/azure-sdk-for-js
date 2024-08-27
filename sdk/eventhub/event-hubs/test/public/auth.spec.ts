// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { parseEventHubConnectionString } from "../../src/index.js";
import { should, assert } from "../utils/chai.js";
import { afterAll, beforeAll, beforeEach, describe, it, vi } from "vitest";
import { createConsumer, createProducer } from "../utils/clients.js";
import {
  getConnectionStringWithSAS,
  getSasTokenFromConnectionStringWithKey,
} from "../utils/sas.js";
import { getConnectionStringWithKey, isMock } from "../utils/vars.js";

const TEST_FAILURE = "test failure";

describe.skipIf(isMock())("Authentication via", function () {
  let connectionString: string;

  beforeAll(async function () {
    vi.useFakeTimers({ now: new Date(), shouldAdvanceTime: true });
  });

  afterAll(async function () {
    vi.useRealTimers();
  });

  describe("AzureNamedKeyCredential", function () {
    let sharedAccessKeyName: string;
    let sharedAccessKey: string;

    beforeAll(async function () {
      connectionString = getConnectionStringWithKey();
      const { sharedAccessKeyName: t1, sharedAccessKey: t2 } =
        parseEventHubConnectionString(connectionString);
      if (!t1 || !t2) {
        assert.fail("Failed to parse connection string.");
      }
      sharedAccessKeyName = t1;
      sharedAccessKey = t2;
    });

    describe("supports key rotation", function () {
      it("EventHubConsumerClient $management calls", async function () {
        const namedKeyCredential = new AzureNamedKeyCredential(
          sharedAccessKeyName,
          sharedAccessKey,
        );

        const consumerClient = createConsumer({ credential: namedKeyCredential }).consumer;

        const properties = await consumerClient.getEventHubProperties();
        should.exist(properties);

        // Rotate credential to invalid value.
        namedKeyCredential.update("foo", "bar");
        try {
          await consumerClient.getEventHubProperties();
          throw new Error(TEST_FAILURE);
        } catch (err: any) {
          should.equal(err.code, "UnauthorizedError");
        }

        // Rotate credential to valid value.
        namedKeyCredential.update(sharedAccessKeyName, sharedAccessKey);
        await consumerClient.getEventHubProperties();
        should.exist(properties);

        await consumerClient.close();
      });

      it("EventHubConsumerClient receive calls", async function () {
        const namedKeyCredential = new AzureNamedKeyCredential(
          sharedAccessKeyName,
          sharedAccessKey,
        );

        const consumerClient = createConsumer({
          credential: namedKeyCredential,
          options: {
            retryOptions: {
              maxRetries: 0,
            },
          },
        }).consumer;

        await new Promise<void>((resolve, reject) => {
          // My attempt at defining the order of operations I expect to see.
          const steps: Array<(...args: any[]) => void> = [
            // 1: wait for a `processEvents` to be called, then rotate the credentials to an invalid value and fast forward the clock!
            (events: []) => {
              if (!Array.isArray(events)) {
                reject(new Error("Step 1 failed. Expected to see a list of events."));
              }
              // Rotate credentials to invalid values and fast forward past the token refresh.
              namedKeyCredential.update("foo", "bar");
              vi.advanceTimersByTime(1000 * 60 * 45);
            },
            // 2: Since the token renewal has occurred, we should start seeing `UnauthorizedError` being thrown from our `processError` handler.
            // Rotate the credentials back to valid values.
            (err: any) => {
              if (err.code !== "UnauthorizedError") {
                reject(
                  new Error(`Step 2 failed. Expected ${err.code} to equal "UnauthorizedError".`),
                );
              }
              // Rotate the credentials back to valid values.
              namedKeyCredential.update(sharedAccessKeyName!, sharedAccessKey!);
            },
            // 3: observe another `processEvents` call.
            // If the credentials were still invalid, we'd expect to see `processError` thrown instead.
            (events: []) => {
              if (!Array.isArray(events)) {
                reject(new Error("Step 3 failed. Expected to see a list of events."));
              }
              resolve();
            },
          ];

          consumerClient.subscribe(
            "0",
            {
              async processError(err) {
                const step = steps.shift();
                if (step) step(err);
              },
              async processEvents(events) {
                const step = steps.shift();
                if (step) step(events);
              },
            },
            {
              maxWaitTimeInSeconds: 5,
            },
          );
        });

        await consumerClient.close();
      });

      it("EventHubProducerClient send calls", async function () {
        const namedKeyCredential = new AzureNamedKeyCredential(
          sharedAccessKeyName!,
          sharedAccessKey!,
        );

        const producerClient = createProducer({
          credential: namedKeyCredential,
          options: {
            retryOptions: {
              maxRetries: 0,
            },
          },
        }).producer;

        // The 1st sendBatch is called with valid credentials, so it should succeed.
        await producerClient.sendBatch([{ body: "test" }]);

        // Rotate credential to invalid value.
        namedKeyCredential.update("foo", "bar");
        // Fast forward through time to after the token refresh.
        vi.advanceTimersByTime(1000 * 60 * 45);

        try {
          // This sendBatch should fail because we've updated the credential to invalid values and allowed the cbs link to refresh.
          await producerClient.sendBatch([{ body: "I don't have access." }]);
          throw new Error(TEST_FAILURE);
        } catch (err: any) {
          should.equal(err.code, "UnauthorizedError");
        }

        // Rotate credential to valid value.
        namedKeyCredential.update(sharedAccessKeyName!, sharedAccessKey!);

        // This last sendBatch should succeed because we've updated our credentials again.
        // Notice that we didn't have to fast forward through time to move past a token refresh!
        await producerClient.sendBatch([{ body: "test2" }]);

        await producerClient.close();
      });
    });
  });

  describe("AzureSASCredential", function () {
    let sharedAccessSignature: string;

    beforeEach(async function () {
      connectionString = await getConnectionStringWithSAS();
      const { sharedAccessSignature: t } = parseEventHubConnectionString(connectionString);
      if (!t) {
        assert.fail("Failed to parse connection string.");
      }
      sharedAccessSignature = t;
    });

    describe("supports key rotation", function () {
      it("EventHubConsumerClient $management calls", async function () {
        const sasCredential = new AzureSASCredential(sharedAccessSignature);

        const consumerClient = createConsumer({
          credential: sasCredential,
          options: {
            retryOptions: {
              maxRetries: 0,
            },
          },
        }).consumer;

        const properties = await consumerClient.getEventHubProperties();
        should.exist(properties);

        // Rotate credential to invalid value.
        sasCredential.update(
          `SharedAccessSignature sr=fake&sig=foo&se=${Date.now() / 1000}&skn=FakeKey`,
        );
        try {
          await consumerClient.getEventHubProperties();
          throw new Error(TEST_FAILURE);
        } catch (err: any) {
          should.equal(err.code, "UnauthorizedError");
        }

        // Rotate credential to valid value.
        sasCredential.update(await getSasTokenFromConnectionStringWithKey(connectionString));
        await consumerClient.getEventHubProperties();
        should.exist(properties);

        await consumerClient.close();
      });

      it("EventHubConsumerClient receive calls", async function () {
        const sasCredential = new AzureSASCredential(sharedAccessSignature);

        const consumerClient = createConsumer({
          credential: sasCredential,
          options: {
            retryOptions: {
              maxRetries: 0,
            },
          },
        }).consumer;

        await new Promise<void>((resolve, reject) => {
          // My attempt at defining the order of operations I expect to see.
          const steps: Array<(...args: any[]) => Promise<void>> = [
            // 1: wait for a `processEvents` to be called, then rotate the credentials to an invalid value and fast forward the clock!
            async (events: []) => {
              if (!Array.isArray(events)) {
                reject(new Error("Step 1 failed. Expected to see a list of events."));
              }
              // Rotate credentials to invalid values and fast forward past the token refresh.
              sasCredential.update(
                `SharedAccessSignature sr=fake&sig=foo&se=${Date.now() / 1000}&skn=FakeKey`,
              );
              vi.advanceTimersByTime(1000 * 60 * 45);
            },
            // 2: Since the token renewal has occurred, we should start seeing `UnauthorizedError` being thrown from our `processError` handler.
            // Rotate the credentials back to valid values.
            async (err: any) => {
              if (err.code !== "UnauthorizedError") {
                reject(
                  new Error(`Step 2 failed. Expected ${err.code} to equal "UnauthorizedError".`),
                );
              }
              // Rotate the credentials back to valid values.
              sasCredential.update(await getSasTokenFromConnectionStringWithKey(connectionString));
            },
            // 3: observe another `processEvents` call.
            // If the credentials were still invalid, we'd expect to see `processError` thrown instead.
            async (events: []) => {
              if (!Array.isArray(events)) {
                reject(new Error("Step 3 failed. Expected to see a list of events."));
              }
              resolve();
            },
          ];

          consumerClient.subscribe(
            "0",
            {
              async processError(err) {
                await steps.shift()?.(err);
              },
              async processEvents(events) {
                await steps.shift()?.(events);
              },
            },
            {
              maxWaitTimeInSeconds: 5,
            },
          );
        });

        await consumerClient.close();
      });

      it("EventHubProducerClient send calls", async function () {
        const sasCredential = new AzureSASCredential(sharedAccessSignature);

        const producerClient = createProducer({
          credential: sasCredential,
          options: {
            retryOptions: {
              maxRetries: 0,
            },
          },
        }).producer;

        // The 1st sendBatch is called with valid credentials, so it should succeed.
        await producerClient.sendBatch([{ body: "test" }]);

        // Rotate credential to invalid value.
        sasCredential.update(
          `SharedAccessSignature sr=fake&sig=foo&se=${Date.now() / 1000}&skn=FakeKey`,
        );
        // Fast forward through time to after the token refresh.
        vi.advanceTimersByTime(1000 * 60 * 45);

        try {
          // This sendBatch should fail because we've updated the credential to invalid values and allowed the cbs link to refresh.
          await producerClient.sendBatch([{ body: "I don't have access." }]);
          throw new Error(TEST_FAILURE);
        } catch (err: any) {
          should.equal(err.code, "UnauthorizedError");
        }

        // Rotate credential to valid value.
        sasCredential.update(await getSasTokenFromConnectionStringWithKey(connectionString));

        // This last sendBatch should succeed because we've updated our credentials again.
        // Notice that we didn't have to fast forward through time to move past a token refresh!
        await producerClient.sendBatch([{ body: "test2" }]);

        await producerClient.close();
      });
    });
  });
});
