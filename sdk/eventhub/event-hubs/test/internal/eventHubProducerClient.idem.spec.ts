// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController } from "@azure/abort-controller";
import { EventData, EventHubProducerClient } from "../../src/index";
import { delay } from "@azure/core-amqp";
import chai from "chai";
const should = chai.should();

import { createMockServer } from "../public/utils/mockService";
import { EnvVarKeys, getEnvVars } from "../public/utils/testUtils";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";
import { EventDataInternal } from "../../src/eventData";
import { EventDataBatchImpl } from "../../src/eventDataBatch";

// _enableIdempotentRetries and _partitionOptions are private properties in
// EventHubProducerClient. They are intended to used internally by
// EventHubBufferedProducerClient. Thus, this test is kept as an internal one,
// where we would set these two properties via cast-to-any workaround.

testWithServiceTypes((serviceVersion, onVersions) => {
  const env = getEnvVars();
  if (serviceVersion === "mock") {
    let service: ReturnType<typeof createMockServer>;
    before("Starting mock service", () => {
      service = createMockServer();
      return service.start();
    });

    after("Stopping mock service", () => {
      return service?.stop();
    });
  }

  onVersions(["live"]).describe(
    "EventHubProducerClient internal idempotent publishing",
    function () {
      const service = {
        connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        path: env[EnvVarKeys.EVENTHUB_NAME],
      };
      const TEST_FAILURE = "test failure";

      before("validate environment", function (): void {
        should.exist(
          env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
          "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
        );
        should.exist(
          env[EnvVarKeys.EVENTHUB_NAME],
          "define EVENTHUB_NAME in your environment before running integration tests."
        );
      });

      let producerClient: EventHubProducerClient | undefined;

      afterEach("close existing producerClient", function () {
        return producerClient?.close();
      });

      describe("getPartitionPublishingProperties", function () {
        it("retrieves partition publishing properties", async function () {
          producerClient = new EventHubProducerClient(service.connectionString, service.path);

          const partitionIds = await producerClient.getPartitionIds();

          for (const partitionId of partitionIds) {
            const props = await (producerClient as any).getPartitionPublishingProperties(
              partitionId
            );
            should.equal(
              props.isIdempotentPublishingEnabled,
              false,
              "Unexpected value for isIdempotentPublishingEnabled"
            );
            should.equal(props.partitionId, partitionId, "Unexpected value for partitionId");
            should.not.exist(
              props.lastPublishedSequenceNumber,
              "Expected lastPublishedSequenceNumber to not exist"
            );
            should.not.exist(props.ownerLevel, "Expected ownerLevel to not exist");
            should.not.exist(props.producerGroupId, "Expected producerGroupId to not exist");
          }
        });

        it("retrieves partition publishing properties (enableIdempotentRetries)", async function () {
          producerClient = new EventHubProducerClient(service.connectionString, service.path);
          (producerClient as any)._enableIdempotentRetries = true;

          const partitionIds = await producerClient.getPartitionIds();

          for (const partitionId of partitionIds) {
            const props = await (producerClient as any).getPartitionPublishingProperties(
              partitionId
            );
            should.equal(
              props.isIdempotentPublishingEnabled,
              true,
              "Unexpected value for isIdempotentPublishingEnabled"
            );
            should.equal(props.partitionId, partitionId, "Unexpected value for partitionId");
            should.exist(
              props.lastPublishedSequenceNumber,
              "Expected lastPublishedSequenceNumber to exist"
            );
            should.exist(props.ownerLevel, "Expected ownerLevel to exist");
            should.exist(props.producerGroupId, "Expected producerGroupId to exist");
          }
        });

        it("throws an error if no partitionId is provided", async function () {
          producerClient = new EventHubProducerClient(service.connectionString, service.path);

          try {
            await (producerClient as any).getPartitionPublishingProperties(undefined as any);
            throw new Error(TEST_FAILURE);
          } catch (err: any) {
            should.equal(err.name, "TypeError");
            should.equal(
              err.message,
              `getPartitionPublishingProperties called without required argument "partitionId"`
            );
          }
        });
      });

      describe("idempotent producer", function () {
        describe("does not allow partitionKey to be set", function () {
          it("createBatch", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            try {
              await producerClient.createBatch({ partitionKey: "foo" });
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.equal(
                err.message,
                `The "partitionId" must be supplied and "partitionKey" must not be provided when the EventHubProducerClient has "enableIdempotentRetries" set to true.`
              );
            }
          });

          it("sendBatch", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            try {
              await producerClient.sendBatch([{ body: "test" }], { partitionKey: "foo" });
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.equal(
                err.message,
                `The "partitionId" must be supplied and "partitionKey" must not be provided when the EventHubProducerClient has "enableIdempotentRetries" set to true.`
              );
            }
          });
        });

        describe("only allows sending directly to partitions", function () {
          it("supports partitionId set by createBatch", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            // Setting partitionId on the batch to send.
            const batch = await producerClient.createBatch({ partitionId: "0" });
            batch.tryAdd({ body: "test" });

            // Don't need to set partitionId on the producerClient.
            await producerClient.sendBatch(batch);
          });

          it("supports partitionId set by sendBatch", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            // Setting partitionId on the sendBatch call.
            await producerClient.sendBatch([{ body: "test" }], { partitionId: "0" });
          });

          it("throws an error if partitionId not set by createBatch", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            try {
              // Don't set partitionId, this should trigger the error.
              await producerClient.createBatch();
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.equal(
                err.message,
                `The "partitionId" must be supplied and "partitionKey" must not be provided when the EventHubProducerClient has "enableIdempotentRetries" set to true.`
              );
            }
          });

          it("throws an error if partitionId not set by sendBatch when passing EventData[]", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            try {
              // Don't set partitionId on the sendBatch call.
              await producerClient.sendBatch([{ body: "test" }]);
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.equal(
                err.message,
                `The "partitionId" must be supplied and "partitionKey" must not be provided when the EventHubProducerClient has "enableIdempotentRetries" set to true.`
              );
            }
          });
        });

        describe("concurrent sends", function () {
          it("are limited to one per partition", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            try {
              const batch1 = await producerClient.createBatch({ partitionId: "0" });
              batch1.tryAdd({
                body: "one",
              });

              await Promise.all([
                producerClient.sendBatch(batch1),
                producerClient.sendBatch([{ body: "two" }], { partitionId: "0" }),
              ]);
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.equal(
                err.message,
                `There can only be 1 "sendBatch" call in-flight per partition while "enableIdempotentRetries" is set to true.`
              );
            }

            // TODO: Remove delay once https://github.com/Azure/azure-sdk-for-js/issues/4422 is completed.
            // This delay gives initialization a change to complete so producer.close() does proper cleanup.
            await delay(1000);
          });

          it("has no impact on serial sends", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            const batch1 = await producerClient.createBatch({ partitionId: "0" });
            batch1.tryAdd({ body: "one" });

            await producerClient.sendBatch(batch1);
            await producerClient.sendBatch([{ body: "two" }], { partitionId: "0" });
          });

          it("are isolated per partition", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            await Promise.all([
              producerClient.sendBatch([{ body: "one" }], { partitionId: "0" }),
              producerClient.sendBatch([{ body: "two" }], { partitionId: "1" }),
            ]);
          });
        });

        describe("with user-provided partitionOptions", function () {
          it("can use state from previous producerClient", async function () {
            const producerClient1 = new EventHubProducerClient(
              service.connectionString,
              service.path
            );
            (producerClient1 as any)._enableIdempotentRetries = true;

            // Send an item so we have some state to carry over to the next producerClient
            await producerClient1.sendBatch([{ body: "one" }], { partitionId: "0" });
            const partitionPublishingProps1 = await (
              producerClient1 as any
            ).getPartitionPublishingProperties("0");

            // Create the 2nd producer
            const producerClient2 = new EventHubProducerClient(
              service.connectionString,
              service.path
            );
            (producerClient2 as any)._enableIdempotentRetries = true;
            (producerClient2 as any)._partitionOptions = {
              "0": {
                ownerLevel: partitionPublishingProps1.ownerLevel! + 1,
                producerGroupId: partitionPublishingProps1.producerGroupId,
                startingSequenceNumber: partitionPublishingProps1.lastPublishedSequenceNumber,
              },
            };

            await producerClient2.sendBatch([{ body: "two" }], { partitionId: "0" });
            const partitionPublishingProps2 = await (
              producerClient2 as any
            ).getPartitionPublishingProperties("0");

            should.equal(
              partitionPublishingProps2.producerGroupId,
              partitionPublishingProps1.producerGroupId,
              "ProducerGroupId should match."
            );
            should.equal(
              partitionPublishingProps2.ownerLevel! > partitionPublishingProps1.ownerLevel!,
              true,
              "producer2 ownerLevel should be higher than producer1 ownerLevel."
            );
            should.equal(
              partitionPublishingProps2.lastPublishedSequenceNumber,
              partitionPublishingProps1.lastPublishedSequenceNumber! + 1,
              "producer2 lastPublishedSequenceNumber should be 1 higher than producer1 lastPublishedSequenceNumber."
            );

            return Promise.all([producerClient1.close(), producerClient2.close()]);
          });

          it("can use partial state", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;
            (producerClient as any)._partitionOptions = {
              "0": {
                ownerLevel: 1,
              },
            };

            const partitionPublishingProps = await (
              producerClient as any
            ).getPartitionPublishingProperties("0");

            should.exist(partitionPublishingProps.producerGroupId, "ProducerGroupId should exist.");
            should.equal(
              partitionPublishingProps.ownerLevel,
              1,
              "ownerLevel should match what the EventHubProducerClient was configured with."
            );
            should.exist(
              partitionPublishingProps.lastPublishedSequenceNumber,
              "lastPublishedSequenceNumber should exist."
            );
          });

          it("can use ownerLevel to kick off other producers", async function () {
            const producerClient1 = new EventHubProducerClient(
              service.connectionString,
              service.path
            );
            (producerClient1 as any)._enableIdempotentRetries = true;

            // Send an item so we have some state to carry over to the next producerClient
            await producerClient1.sendBatch([{ body: "one" }], { partitionId: "0" });
            const partitionPublishingProps1 = await (
              producerClient1 as any
            ).getPartitionPublishingProperties("0");

            // Create the 2nd producer
            const producerClient2 = new EventHubProducerClient(
              service.connectionString,
              service.path
            );
            (producerClient2 as any)._enableIdempotentRetries = true;
            (producerClient2 as any)._partitionOptions = {
              "0": {
                ownerLevel: partitionPublishingProps1.ownerLevel! + 1,
                producerGroupId: partitionPublishingProps1.producerGroupId,
                startingSequenceNumber: partitionPublishingProps1.lastPublishedSequenceNumber,
              },
            };

            // Send an event!
            await producerClient2.sendBatch([{ body: "two" }], { partitionId: "0" });

            try {
              // Calling sendBatch with producerClient1 (lower ownerLevel) should fail.
              await producerClient1.sendBatch([{ body: "should fail" }], { partitionId: "0" });
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.equal(err.name, "MessagingError");
              should.equal(err.code, "ProducerDisconnectedError");
              should.not.equal(err.message, TEST_FAILURE);
            }
            return Promise.all([producerClient1.close(), producerClient2.close()]);
          });

          it("fails with invalid state", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;
            (producerClient as any)._partitionOptions = {
              "0": {
                ownerLevel: -1,
              },
            };

            // Trigger an error by calling sendBatch.
            try {
              await producerClient.sendBatch([{ body: "one" }], { partitionId: "0" });
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.equal(err.name, "MessagingError");
              should.equal(err.code, "ArgumentOutOfRangeError");
              should.not.equal(err.message, TEST_FAILURE);
            }
          });

          it("fails with invalid sequence number", async function () {
            const producerClient1 = new EventHubProducerClient(
              service.connectionString,
              service.path
            );
            (producerClient1 as any)._enableIdempotentRetries = true;

            // Send an item so we have some state to carry over to the next producerClient
            await producerClient1.sendBatch(
              [
                { body: "one" },
                { body: "two" },
                { body: "three" },
                { body: "four" },
                { body: "five" },
              ],
              {
                partitionId: "0",
              }
            );
            const partitionPublishingProps1 = await (
              producerClient1 as any
            ).getPartitionPublishingProperties("0");

            should.equal(partitionPublishingProps1.lastPublishedSequenceNumber, 5);

            // Create the 2nd producer
            const producerClient2 = new EventHubProducerClient(
              service.connectionString,
              service.path
            );
            (producerClient2 as any)._enableIdempotentRetries = true;
            (producerClient2 as any)._partitionOptions = {
              "0": {
                producerGroupId: partitionPublishingProps1.producerGroupId,
                startingSequenceNumber: partitionPublishingProps1.lastPublishedSequenceNumber! - 4,
              },
            };

            // Send an event! This should end up using an invalid sequence number.
            try {
              // Calling sendBatch with producerClient1 (lower ownerLevel) should fail.
              await producerClient2.sendBatch([{ body: "six as two" }], { partitionId: "0" });
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.equal(err.name, "MessagingError");
              should.equal(err.code, "SequenceOutOfOrderError");
              should.not.equal(err.message, TEST_FAILURE);
            }

            return Promise.all([producerClient1.close(), producerClient2.close()]);
          });
        });

        it("recovers from disconnects", async function () {
          producerClient = new EventHubProducerClient(service.connectionString, service.path, {
            retryOptions: {
              timeoutInMs: 5000,
              retryDelayInMs: 100,
            },
          });
          (producerClient as any)._enableIdempotentRetries = true;

          const beforePublishingProps = await (
            producerClient as any
          ).getPartitionPublishingProperties("0");
          const clientConnectionContext = producerClient["_context"];
          const originalConnectionId = clientConnectionContext.connectionId;

          // Using setTimeout so we can trigger the disconnect
          // right after sendBatch is called.
          setTimeout(() => {
            // Trigger a disconnect on the underlying connection.
            clientConnectionContext.connection["_connection"].idle();
          }, 0);

          await producerClient.sendBatch([{ body: "disconnect" }], { partitionId: "0" });
          const newConnectionId = clientConnectionContext.connectionId;
          should.not.equal(originalConnectionId, newConnectionId);

          const afterPublishingProps = await (
            producerClient as any
          ).getPartitionPublishingProperties("0");

          should.equal(
            afterPublishingProps.ownerLevel,
            beforePublishingProps.ownerLevel,
            "ownerLevel should match."
          );
          should.equal(
            afterPublishingProps.producerGroupId,
            beforePublishingProps.producerGroupId,
            "producerGroupId should match."
          );
          should.equal(
            afterPublishingProps.lastPublishedSequenceNumber,
            beforePublishingProps.lastPublishedSequenceNumber! + 1,
            "afterPublishingProps.lastPublishedSequenceNumber should be 1 higher than beforePublishingProps"
          );
        });

        describe("sendBatch", function () {
          it("commits published sequence number on sent EventDataBatch", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            const batch = await producerClient.createBatch({ partitionId: "0" });
            batch.tryAdd({ body: 1 });
            batch.tryAdd({ body: 2 });
            should.not.exist(
              (batch as EventDataBatchImpl).startingPublishedSequenceNumber,
              "startingPublishedSequenceNumber should not exist before batch is successfully sent."
            );

            const publishingProps = await (producerClient as any).getPartitionPublishingProperties(
              "0"
            );

            await producerClient.sendBatch(batch);
            should.equal(
              (batch as EventDataBatchImpl).startingPublishedSequenceNumber,
              publishingProps.lastPublishedSequenceNumber! + 1,
              "startingPublishedSequenceNumber should be 1 higher than the lastPublishedSequenceNumber."
            );
          });

          it("does not commit published sequence number on failed EventDataBatch send", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            const batch = await producerClient.createBatch({
              partitionId: "0",
            });
            batch.tryAdd({
              body: 1,
            });
            batch.tryAdd({
              body: 2,
            });
            should.not.exist(
              (batch as EventDataBatchImpl).startingPublishedSequenceNumber,
              "startingPublishedSequenceNumber should not exist before batch is successfully sent."
            );

            const abortController = new AbortController();
            // Trigger abort while sendBatch is in progress
            setTimeout(() => {
              abortController.abort();
            }, 0);

            try {
              await producerClient.sendBatch(batch, { abortSignal: abortController.signal });
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.not.equal(err.message, TEST_FAILURE);
              should.not.exist(
                (batch as EventDataBatchImpl).startingPublishedSequenceNumber,
                "startingPublishedSequenceNumber should not exist if batch failed to send."
              );
            }
          });

          it("commits published sequence number on sent EventData", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            const events: EventData[] = [{ body: 1 }, { body: 2 }];
            for (const event of events) {
              should.not.exist(
                (event as EventDataInternal)._publishedSequenceNumber,
                "publishedSequenceNumber should not exist before event is successfully sent."
              );
            }

            const publishingProps = await (producerClient as any).getPartitionPublishingProperties(
              "0"
            );

            await producerClient.sendBatch(events, { partitionId: "0" });

            for (let i = 0; i < events.length; i++) {
              const event = events[i];
              should.exist(
                (event as EventDataInternal)._publishedSequenceNumber,
                "publishedSequenceNumber should exist after event is successfully sent."
              );
              should.equal(
                (event as EventDataInternal)._publishedSequenceNumber,
                publishingProps.lastPublishedSequenceNumber! + (i + 1),
                "publishedSequenceNumber was not the expected result."
              );
            }
          });

          it("does not commit published sequence number on failed EventData send", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            const events: EventData[] = [
              {
                body: 1,
              },
              {
                body: 2,
              },
            ];
            for (const event of events) {
              should.not.exist(
                (event as EventDataInternal)._publishedSequenceNumber,
                "publishedSequenceNumber should not exist before event is successfully sent."
              );
            }

            const abortController = new AbortController();
            // Trigger abort while sendBatch is in progress
            setTimeout(() => {
              abortController.abort();
            }, 0);

            try {
              await producerClient.sendBatch(events, {
                partitionId: "0",
                abortSignal: abortController.signal,
              });
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.not.equal(err.message, TEST_FAILURE);
              for (const event of events) {
                should.not.exist(
                  (event as EventDataInternal)._publishedSequenceNumber,
                  "publishedSequenceNumber should not exist before event is successfully sent."
                );
              }
            }

            // TODO: Remove delay once https://github.com/Azure/azure-sdk-for-js/issues/4422 is completed.
            // This delay gives initialization a change to complete so producer.close() does proper cleanup.
            await delay(1000);
          });

          it("does not allow sending already published EventData", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            const events: EventData[] = [{ body: 1 }, { body: 2 }];
            // Send the events. Afterwards they should be considered 'published.'
            await producerClient.sendBatch(events, { partitionId: "0" });

            try {
              await producerClient.sendBatch(events, { partitionId: "0" });
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.equal(
                err.message,
                "1 or more of these events have already been successfully published. When idempotent publishing is enabled, events that were acknowledged by the Event Hubs service may not be published again."
              );
            }
          });

          it("does not allow sending already published EventDataBatch", async function () {
            producerClient = new EventHubProducerClient(service.connectionString, service.path);
            (producerClient as any)._enableIdempotentRetries = true;

            const batch = await producerClient.createBatch({ partitionId: "0" });
            batch.tryAdd({ body: 1 });
            batch.tryAdd({ body: 2 });
            // Send the events. Afterwards they should be considered 'published.'
            await producerClient.sendBatch(batch);

            try {
              await producerClient.sendBatch(batch);
              throw new Error(TEST_FAILURE);
            } catch (err: any) {
              should.equal(
                err.message,
                "These events have already been successfully published. When idempotent publishing is enabled, events that were acknowledged by the Event Hubs service may not be published again."
              );
            }
          });
        });
      });
    }
  );
});
