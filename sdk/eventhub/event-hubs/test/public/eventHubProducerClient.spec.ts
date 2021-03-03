// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();

import { EventHubProducerClient } from "../../src/index";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";

describe("EventHubProducerClient", function() {
  const env = getEnvVars();
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const TEST_FAILURE = "test failure";

  before("validate environment", function(): void {
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

  afterEach("close existing producerClient", function() {
    return producerClient?.close();
  });

  describe("idempotent producer", function() {
    describe("does not allow partitionKey to be set", function() {
      it("createBatch", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        try {
          await producerClient.createBatch({ partitionKey: "foo" });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(
            err.message,
            `"partitionKey" cannot be set while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
          );
        }
      });

      it("sendBatch", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        try {
          await producerClient.sendBatch([{ body: "test" }], { partitionKey: "foo" });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(
            err.message,
            `"partitionId" must be supplied and "partitionKey" must not be provided while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
          );
        }
      });
    });

    describe("only allows sending directly to partitions", function() {
      it("supports partitionId set by createBatch", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        // Setting partitionId on the batch to send.
        const batch = await producerClient.createBatch({ partitionId: "0" });
        batch.tryAdd({ body: "test" });

        // Don't need to set partitionId on the producerClient.
        await producerClient.sendBatch(batch);
      });

      it("supports partitionId set by sendBatch", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        // Setting partitionId on the sendBatch call.
        await producerClient.sendBatch([{ body: "test" }], { partitionId: "0" });
      });

      it("throws an error if partitionId not set by createBatch nor sendBatch", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        // Don't set partitionId on the batch to send.
        const batch = await producerClient.createBatch();
        batch.tryAdd({
          body: "test"
        });

        try {
          // Don't set partitionId on the sendBatch call.
          await producerClient.sendBatch(batch);
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(
            err.message,
            `"partitionId" must be supplied and "partitionKey" must not be provided while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
          );
        }
      });

      it("throws an error if partitionId not set by sendBatch when passing EventData[]", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        try {
          // Don't set partitionId on the sendBatch call.
          await producerClient.sendBatch([{ body: "test" }]);
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(
            err.message,
            `"partitionId" must be supplied and "partitionKey" must not be provided while the EventHubProducerClient has "enableIdempotentPartitions" set to true.`
          );
        }
      });
    });

    describe("concurrent sends", function() {
      it("are limited to one per partition", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        try {
          const batch1 = await producerClient.createBatch({ partitionId: "0" });
          batch1.tryAdd({ body: "one" });

          await Promise.all([
            producerClient.sendBatch(batch1),
            producerClient.sendBatch([{ body: "two" }], { partitionId: "0" })
          ]);
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.not.equal(err.message, TEST_FAILURE);
        }
      });

      it("has no impact on serial sends", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        const batch1 = await producerClient.createBatch({ partitionId: "0" });
        batch1.tryAdd({ body: "one" });

        await producerClient.sendBatch(batch1);
        await producerClient.sendBatch([{ body: "two" }], { partitionId: "0" });
      });

      it("are isolated per partition", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        await Promise.all([
          producerClient.sendBatch([{ body: "one" }], { partitionId: "0" }),
          producerClient.sendBatch([{ body: "two" }], { partitionId: "1" })
        ]);
      });
    });

    describe("getPartitionPublishingProperties", function() {
      it("retrieves partition publishing properties", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        const partitionIds = await producerClient.getPartitionIds();

        for (const partitionId of partitionIds) {
          const props = await producerClient.getPartitionPublishingProperties(partitionId);
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

      it("throws an error if no partitionId is provided", async function() {
        producerClient = new EventHubProducerClient(service.connectionString, service.path, {
          enableIdempotentPartitions: true
        });

        try {
          await producerClient.getPartitionPublishingProperties(undefined as any);
          throw new Error(TEST_FAILURE);
        } catch (err) {
          should.equal(err.name, "TypeError");
          should.not.equal(err.message, TEST_FAILURE);
        }
      });
    });
  });
});
