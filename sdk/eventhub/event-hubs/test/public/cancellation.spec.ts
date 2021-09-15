// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController } from "@azure/abort-controller";
import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import { EventHubConsumerClient, EventHubProducerClient } from "../../src";
import { createMockServer } from "./utils/mockService";
chai.use(chaiAsPromised);

import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { testWithServiceTypes } from "./utils/testWithServiceTypes";

testWithServiceTypes((serviceVersion) => {
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

  describe("Cancellation via AbortSignal", () => {
    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME]
    };
    before("validate environment", () => {
      should.exist(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.EVENTHUB_NAME],
        "define EVENTHUB_NAME in your environment before running integration tests."
      );
    });

    const TEST_FAILURE = "Test failure";

    const cancellationCases = [
      {
        type: "pre-aborted",
        getSignal() {
          const controller = new AbortController();
          controller.abort();
          return controller.signal;
        }
      },
      {
        type: "aborted after timeout",
        getSignal() {
          const controller = new AbortController();
          setTimeout(() => {
            controller.abort();
          }, 0);
          return controller.signal;
        }
      }
    ];

    describe("EventHubConsumerClient", () => {
      let consumerClient: EventHubConsumerClient;
      beforeEach("instantiate EventHubConsumerClient", () => {
        consumerClient = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString,
          service.path
        );
      });

      afterEach("close EventHubConsumerClient", () => {
        return consumerClient.close();
      });

      for (const { type: caseType, getSignal } of cancellationCases) {
        it(`getEventHubProperties supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await consumerClient.getEventHubProperties({ abortSignal });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });

        it(`getPartitionIds supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await consumerClient.getPartitionIds({ abortSignal });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });

        it(`getPartitionProperties supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await consumerClient.getPartitionProperties("0", { abortSignal });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });
      }
    });

    describe("EventHubProducerClient", () => {
      let producerClient: EventHubProducerClient;
      beforeEach("instantiate EventHubProducerClient", () => {
        producerClient = new EventHubProducerClient(service.connectionString, service.path);
      });

      afterEach("close EventHubProducerClient", () => {
        return producerClient.close();
      });

      for (const { type: caseType, getSignal } of cancellationCases) {
        it(`getEventHubProperties supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await producerClient.getEventHubProperties({ abortSignal });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });

        it(`getPartitionIds supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await producerClient.getPartitionIds({ abortSignal });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });

        it(`getPartitionProperties supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await producerClient.getPartitionProperties("0", { abortSignal });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });

        it(`createBatch supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await producerClient.createBatch({ abortSignal });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });

        it(`sendBatch supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await producerClient.sendBatch([{ body: "unsung hero" }], { abortSignal });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });
      }
    });
  });
});
