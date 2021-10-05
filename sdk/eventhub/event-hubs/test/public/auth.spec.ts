// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EventHubConsumerClient,
  EventHubProducerClient,
  parseEventHubConnectionString
} from "../../src/index";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import chai from "chai";
import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { createSasTokenProvider } from "@azure/core-amqp";
import { SinonFakeTimers, useFakeTimers } from "sinon";
import { testWithServiceTypes } from "./utils/testWithServiceTypes";
import { createMockServer } from "./utils/mockService";

const should = chai.should();

const TEST_FAILURE = "test failure";

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

  onVersions(["live"]).describe("Authentication via", () => {
    const {
      endpoint,
      fullyQualifiedNamespace,
      sharedAccessKey,
      sharedAccessKeyName
    } = parseEventHubConnectionString(env[EnvVarKeys.EVENTHUB_CONNECTION_STRING]);
    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME],
      endpoint: endpoint.replace(/\/+$/, "")
    };

    before(() => {
      should.exist(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.EVENTHUB_NAME],
        "define EVENTHUB_NAME in your environment before running integration tests."
      );
    });

    let clock: SinonFakeTimers;
    beforeEach("setup new space-time continuum", () => {
      clock = useFakeTimers({
        now: new Date(),
        shouldAdvanceTime: true
      });
    });

    afterEach("returning back to current space-time variant", () => {
      clock.restore();
    });

    describe("AzureNamedKeyCredential", () => {
      describe("supports key rotation", () => {
        it("EventHubConsumerClient $management calls", async () => {
          const namedKeyCredential = new AzureNamedKeyCredential(
            sharedAccessKeyName!,
            sharedAccessKey!
          );

          const consumerClient = new EventHubConsumerClient(
            "$Default",
            fullyQualifiedNamespace,
            service.path,
            namedKeyCredential
          );

          const properties = await consumerClient.getEventHubProperties();
          should.exist(properties);

          // Rotate credential to invalid value.
          namedKeyCredential.update("foo", "bar");
          try {
            await consumerClient.getEventHubProperties();
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.code, "UnauthorizedError");
          }

          // Rotate credential to valid value.
          namedKeyCredential.update(sharedAccessKeyName!, sharedAccessKey!);
          await consumerClient.getEventHubProperties();
          should.exist(properties);

          return consumerClient.close();
        });

        it("EventHubConsumerClient receive calls", async () => {
          const namedKeyCredential = new AzureNamedKeyCredential(
            sharedAccessKeyName!,
            sharedAccessKey!
          );

          const consumerClient = new EventHubConsumerClient(
            "$Default",
            fullyQualifiedNamespace,
            service.path,
            namedKeyCredential,
            {
              retryOptions: {
                maxRetries: 0
              }
            }
          );

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
                clock.tick(1000 * 60 * 45);
              },
              // 2: observe another `processEvents` call. We should see this because the maxWaitTimeInSeconds is set to 5 seconds, and we fast forwarded the clock 45 minutes.
              (events: []) => {
                if (!Array.isArray(events)) {
                  reject(new Error("Step 2 failed. Expected to see a list of events."));
                }
              },
              // 3: Since the token renewal has occurred, we should start seeing `UnauthorizedError` being thrown from our `processError` handler.
              // Rotate the credentials back to valid values.
              (err: any) => {
                if (err.code !== "UnauthorizedError") {
                  reject(
                    new Error(`Step 3 failed. Expected ${err.code} to equal "UnauthorizedError".`)
                  );
                }
                // Rotate the credentials back to valid values.
                namedKeyCredential.update(sharedAccessKeyName!, sharedAccessKey!);
              },
              // 4: observe another `processEvents` call.
              // If the credentials were still invalid, we'd expect to see `processError` thrown instead.
              (events: []) => {
                if (!Array.isArray(events)) {
                  reject(new Error("Step 4 failed. Expected to see a list of events."));
                }
                resolve();
              }
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
                }
              },
              {
                maxWaitTimeInSeconds: 5
              }
            );
          });

          return consumerClient.close();
        });

        it("EventHubProducerClient send calls", async () => {
          const namedKeyCredential = new AzureNamedKeyCredential(
            sharedAccessKeyName!,
            sharedAccessKey!
          );

          const producerClient = new EventHubProducerClient(
            fullyQualifiedNamespace,
            service.path,
            namedKeyCredential,
            {
              retryOptions: {
                maxRetries: 0
              }
            }
          );

          // The 1st sendBatch is called with valid credentials, so it should succeed.
          await producerClient.sendBatch([{ body: "test" }]);

          // Rotate credential to invalid value.
          namedKeyCredential.update("foo", "bar");
          // Fast forward through time to after the token refresh.
          clock.tick(1000 * 60 * 45);

          try {
            // This sendBatch should fail because we've updated the credential to invalid values and allowed the cbs link to refresh.
            await producerClient.sendBatch([{ body: "I don't have access." }]);
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.code, "UnauthorizedError");
          }

          // Rotate credential to valid value.
          namedKeyCredential.update(sharedAccessKeyName!, sharedAccessKey!);

          // This last sendBatch should succeed because we've updated our credentials again.
          // Notice that we didn't have to fast forward through time to move past a token refresh!
          await producerClient.sendBatch([{ body: "test2" }]);

          return producerClient.close();
        });
      });
    });

    describe("AzureSASCredential", () => {
      function getSas(): string {
        return createSasTokenProvider({
          sharedAccessKeyName: sharedAccessKeyName!,
          sharedAccessKey: sharedAccessKey!
        }).getToken(`${service.endpoint}/${service.path}`).token;
      }

      describe("supports key rotation", () => {
        it("EventHubConsumerClient $management calls", async () => {
          const sasCredential = new AzureSASCredential(getSas());

          const consumerClient = new EventHubConsumerClient(
            "$Default",
            fullyQualifiedNamespace,
            service.path,
            sasCredential,
            {
              retryOptions: {
                maxRetries: 0
              }
            }
          );

          const properties = await consumerClient.getEventHubProperties();
          should.exist(properties);

          // Rotate credential to invalid value.
          sasCredential.update(
            `SharedAccessSignature sr=fake&sig=foo&se=${Date.now() / 1000}&skn=FakeKey`
          );
          try {
            await consumerClient.getEventHubProperties();
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.code, "UnauthorizedError");
          }

          // Rotate credential to valid value.
          sasCredential.update(getSas());
          await consumerClient.getEventHubProperties();
          should.exist(properties);

          return consumerClient.close();
        });

        it("EventHubConsumerClient receive calls", async () => {
          const sasCredential = new AzureSASCredential(getSas());

          const consumerClient = new EventHubConsumerClient(
            "$Default",
            fullyQualifiedNamespace,
            service.path,
            sasCredential,
            {
              retryOptions: {
                maxRetries: 0
              }
            }
          );

          await new Promise<void>((resolve, reject) => {
            // My attempt at defining the order of operations I expect to see.
            const steps: Array<(...args: any[]) => void> = [
              // 1: wait for a `processEvents` to be called, then rotate the credentials to an invalid value and fast forward the clock!
              (events: []) => {
                if (!Array.isArray(events)) {
                  reject(new Error("Step 1 failed. Expected to see a list of events."));
                }
                // Rotate credentials to invalid values and fast forward past the token refresh.
                sasCredential.update(
                  `SharedAccessSignature sr=fake&sig=foo&se=${Date.now() / 1000}&skn=FakeKey`
                );
                clock.tick(1000 * 60 * 45);
              },
              // 2: observe another `processEvents` call. We should see this because the maxWaitTimeInSeconds is set to 5 seconds, and we fast forwarded the clock 45 minutes.
              (events: []) => {
                if (!Array.isArray(events)) {
                  reject(new Error("Step 2 failed. Expected to see a list of events."));
                }
              },
              // 3: Since the token renewal has occurred, we should start seeing `UnauthorizedError` being thrown from our `processError` handler.
              // Rotate the credentials back to valid values.
              (err: any) => {
                if (err.code !== "UnauthorizedError") {
                  reject(
                    new Error(`Step 3 failed. Expected ${err.code} to equal "UnauthorizedError".`)
                  );
                }
                // Rotate the credentials back to valid values.
                sasCredential.update(getSas());
              },
              // 4: observe another `processEvents` call.
              // If the credentials were still invalid, we'd expect to see `processError` thrown instead.
              (events: []) => {
                if (!Array.isArray(events)) {
                  reject(new Error("Step 4 failed. Expected to see a list of events."));
                }
                resolve();
              }
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
                }
              },
              {
                maxWaitTimeInSeconds: 5
              }
            );
          });

          return consumerClient.close();
        });

        it("EventHubProducerClient send calls", async () => {
          const sasCredential = new AzureSASCredential(getSas());

          const producerClient = new EventHubProducerClient(
            fullyQualifiedNamespace,
            service.path,
            sasCredential,
            {
              retryOptions: {
                maxRetries: 0
              }
            }
          );

          // The 1st sendBatch is called with valid credentials, so it should succeed.
          await producerClient.sendBatch([{ body: "test" }]);

          // Rotate credential to invalid value.
          sasCredential.update(
            `SharedAccessSignature sr=fake&sig=foo&se=${Date.now() / 1000}&skn=FakeKey`
          );
          // Fast forward through time to after the token refresh.
          clock.tick(1000 * 60 * 45);

          try {
            // This sendBatch should fail because we've updated the credential to invalid values and allowed the cbs link to refresh.
            await producerClient.sendBatch([{ body: "I don't have access." }]);
            throw new Error(TEST_FAILURE);
          } catch (err) {
            should.equal(err.code, "UnauthorizedError");
          }

          // Rotate credential to valid value.
          sasCredential.update(getSas());

          // This last sendBatch should succeed because we've updated our credentials again.
          // Notice that we didn't have to fast forward through time to move past a token refresh!
          await producerClient.sendBatch([{ body: "test2" }]);

          return producerClient.close();
        });
      });
    });
  });
});
