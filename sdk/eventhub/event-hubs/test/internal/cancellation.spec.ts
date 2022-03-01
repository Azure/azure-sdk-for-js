// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnvVarKeys, getEnvVars } from "../public/utils/testUtils";
import { AbortController } from "@azure/abort-controller";
import { EventHubReceiver } from "../../src/eventHubReceiver";
import { EventHubSender } from "../../src/eventHubSender";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createConnectionContext } from "../../src/connectionContext";
import { createMockServer } from "../public/utils/mockService";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";

const should = chai.should();
chai.use(chaiAsPromised);

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
      path: env[EnvVarKeys.EVENTHUB_NAME],
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

    let context: ReturnType<typeof createConnectionContext>;
    beforeEach("create connection context", function () {
      context = createConnectionContext(service.connectionString, service.path);
    });

    afterEach("close connection context", function () {
      return context.close();
    });

    const TEST_FAILURE = "Test failure";

    const cancellationCases = [
      {
        type: "pre-aborted",
        getSignal() {
          const controller = new AbortController();
          controller.abort();
          return controller.signal;
        },
      },
      {
        type: "aborted after timeout",
        getSignal() {
          const controller = new AbortController();
          setTimeout(() => {
            controller.abort();
          }, 0);
          return controller.signal;
        },
      },
    ];

    describe("EventHubReceiver", () => {
      let client: EventHubReceiver;
      beforeEach("instantiate EventHubReceiver", () => {
        client = new EventHubReceiver(
          context,
          "$default", // consumer group
          "0", // partition id
          {
            enqueuedOn: Date.now(),
          }
        );
      });

      afterEach("close EventHubReceiver", () => {
        return client.close();
      });

      for (const { type: caseType, getSignal } of cancellationCases) {
        it(`initialize supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await client.initialize({ abortSignal, timeoutInMs: 60000 });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });

        it(`receiveBatch supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await client.receiveBatch(10, undefined, abortSignal);
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });

        it(`receiveBatch supports cancellation when connection already exists (${caseType})`, async () => {
          // Open the connection.
          await client.initialize({ abortSignal: undefined, timeoutInMs: 60000 });
          try {
            const abortSignal = getSignal();
            await client.receiveBatch(10, undefined, abortSignal);
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });
      }
    });

    describe("EventHubSender", () => {
      let client: EventHubSender;
      beforeEach("instantiate EventHubSender", () => {
        client = new EventHubSender(context, { enableIdempotentProducer: false });
      });

      afterEach("close EventHubSender", () => {
        return client.close();
      });

      for (const { type: caseType, getSignal } of cancellationCases) {
        it(`_getLink supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await client["_getLink"]({ abortSignal });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });

        it(`getMaxMessageSize supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await client.getMaxMessageSize({ abortSignal });
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.name, "AbortError");
            should.equal(err.message, "The operation was aborted.");
          }
        });

        it(`send supports cancellation (${caseType})`, async () => {
          const abortSignal = getSignal();
          try {
            await client.send([{ body: "unsung hero" }], { abortSignal });
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
