// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EventHubProducerClient,
  Subscription,
  SubscriptionEventHandlers,
  latestEventPosition,
  logger,
  CloseReason,
  EventHubConsumerClient,
  EventData,
  MessagingError,
  ReceivedEventData,
  earliestEventPosition
} from "../../src";
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:receiver-spec");
import { EnvVarKeys, loopUntil, getStartingPositionsForTests, getEnvVars } from "./utils/testUtils";
import chai from "chai";
import { ReceivedMessagesTester } from "./utils/receivedMessagesTester";
import { LogTester } from "./utils/logHelpers";
import { TestInMemoryCheckpointStore } from "./utils/testInMemoryCheckpointStore";
import { testWithServiceTypes } from "./utils/testWithServiceTypes";
import { createMockServer } from "./utils/mockService";

const should = chai.should();

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

  describe("EventHubConsumerClient", () => {
    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME]
    };

    let producerClient: EventHubProducerClient;
    let consumerClient: EventHubConsumerClient;
    let partitionIds: string[];

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

    beforeEach("Creating the clients", async () => {
      producerClient = new EventHubProducerClient(service.connectionString, service.path);
      consumerClient = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        service.connectionString,
        service.path
      );
      partitionIds = await producerClient.getPartitionIds({});
    });

    afterEach("Closing the clients", () => {
      return Promise.all([producerClient.close(), consumerClient.close()]);
    });

    describe("functional tests", () => {
      let clients: EventHubConsumerClient[];
      let subscriptions: Subscription[];

      beforeEach(() => {
        // ensure we have at least 2 partitions
        partitionIds.length.should.gte(2);

        clients = [];
        subscriptions = [];
      });

      afterEach(async () => {
        for (const subscription of subscriptions) {
          await subscription.close();
        }

        await Promise.all(clients.map((client) => client.close()));
        clients = [];
      });

      describe("#close()", function(): void {
        it("stops any actively running subscriptions", async function(): Promise<void> {
          const client = new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString,
            service.path
          );

          // Spin up multiple subscriptions.
          for (const partitionId of partitionIds) {
            subscriptions.push(
              client.subscribe(partitionId, {
                async processError() {
                  /* no-op for test */
                },
                async processEvents() {
                  /* no-op for test */
                }
              })
            );
          }

          // Assert that the subscriptions are all running.
          for (const subscription of subscriptions) {
            subscription.isRunning.should.equal(true, "The subscription should be running.");
          }

          // Stop the client, which should stop the subscriptions.
          await client.close();

          // Assert that the subscriptions are all not running.
          for (const subscription of subscriptions) {
            subscription.isRunning.should.equal(false, "The subscription should not be running.");
          }

          client["_subscriptions"].size.should.equal(
            0,
            "Some dangling subscriptions are still hanging around!"
          );
        });

        it("gracefully stops running subscriptions", async function(): Promise<void> {
          const client = new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString,
            service.path
          );

          const startingPositions = await getStartingPositionsForTests(client);

          let waitForInitializeResolver: () => void;
          const waitForInitialize = new Promise<void>(
            (resolve) => (waitForInitializeResolver = resolve)
          );
          let waitForCloseResolver: (reason: CloseReason) => void;
          const waitForClose = new Promise<CloseReason>(
            (resolve) => (waitForCloseResolver = resolve)
          );
          let unexpectedError: Error | undefined;
          let eventsWereReceived = false;

          const subscription = client.subscribe(
            partitionIds[0],
            {
              async processInitialize() {
                waitForInitializeResolver();
              },
              async processError(err) {
                unexpectedError = err;
              },
              async processEvents() {
                eventsWereReceived = true;
              },
              async processClose(reason) {
                waitForCloseResolver(reason);
              }
            },
            {
              startPosition: startingPositions
            }
          );

          // Assert that the subscription is running.
          subscription.isRunning.should.equal(true, "The subscription should be running.");

          // Wait until we see a `processInitialze` handler get invoked.
          // This lets us know that the subscription is starting to read from a partition.
          await waitForInitialize;

          // Stop the client, which should stop the subscriptions.
          await client.close();

          // Ensure that the `processClose` handler was invoked with the expected reason.
          const closeReason = await waitForClose;
          closeReason.should.equal(
            CloseReason.Shutdown,
            "Subscription closed for an unexpected reason."
          );

          // Ensure no errors were thrown.
          should.not.exist(unexpectedError, "Did not expect to observe an error.");

          // Ensure the event handler wasn't called.
          eventsWereReceived.should.equal(false, "Should not have received events.");

          // Assert that the subscription is not running.
          subscription.isRunning.should.equal(false, "The subscription should not be running.");

          client["_subscriptions"].size.should.equal(
            0,
            "Some dangling subscriptions are still hanging around!"
          );
        });
      });

      describe("Reinitialize partition processing after error", function(): void {
        it("when subscribed to single partition", async function(): Promise<void> {
          const partitionId = "0";
          const consumerClient1 = new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString,
            service.path
          );
          const consumerClient2 = new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString,
            service.path
          );

          clients.push(consumerClient1, consumerClient2);
          let subscription2: Subscription | undefined;
          const subscriptionHandlers2: SubscriptionEventHandlers = {
            async processError() {
              /* no-op */
            },
            async processEvents() {
              // stop this subscription since it already should have forced the 1st subscription to have an error.
              await subscription2!.close();
            }
          };

          // keep track of the handlers called on subscription 1
          const handlerCalls = {
            initialize: 0,
            close: 0
          };

          const subscription1 = consumerClient1.subscribe(
            partitionId,
            {
              async processError() {
                /* no-op */
              },
              async processEvents() {
                if (!handlerCalls.close) {
                  // start the 2nd subscription that will kick the 1st subscription off
                  subscription2 = consumerClient2.subscribe(partitionId, subscriptionHandlers2, {
                    ownerLevel: 1,
                    maxBatchSize: 1,
                    maxWaitTimeInSeconds: 1
                  });
                } else {
                  // stop this subscription, we know close was called so we've restarted
                  await subscription1.close();
                }
              },
              async processClose() {
                handlerCalls.close++;
              },
              async processInitialize() {
                handlerCalls.initialize++;
              }
            },
            {
              maxBatchSize: 1,
              maxWaitTimeInSeconds: 1
            }
          );

          await loopUntil({
            maxTimes: 10,
            name: "Wait for subscription1 to recover",
            timeBetweenRunsMs: 5000,
            async until() {
              return !subscription1.isRunning && !subscription2!.isRunning;
            }
          });

          // Initialize may be called multiple times while the 2nd subscription is running.
          // We want to make sure it has been called at least twice to verify that subscription1
          // attempts to recover.
          handlerCalls.initialize.should.be.greaterThan(1);
          handlerCalls.close.should.be.greaterThan(1);
        });

        it("when subscribed to multiple partitions", async function(): Promise<void> {
          const consumerClient1 = new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString,
            service.path,
            { loadBalancingOptions: { updateIntervalInMs: 1000 } }
          );
          const consumerClient2 = new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString,
            service.path,
            { loadBalancingOptions: { updateIntervalInMs: 1000 } }
          );

          clients.push(consumerClient1, consumerClient2);

          const partitionHandlerCalls: {
            [partitionId: string]: {
              initialize: number;
              processEvents: boolean;
              close: number;
            };
          } = {};

          // keep track of the handlers called on subscription 1
          for (const id of partitionIds) {
            partitionHandlerCalls[id] = { initialize: 0, processEvents: false, close: 0 };
          }

          const subscriptionHandlers1: SubscriptionEventHandlers = {
            async processError() {
              /* no-op */
            },
            async processEvents(_, context) {
              partitionHandlerCalls[context.partitionId].processEvents = true;
            },
            async processClose(_, context) {
              partitionHandlerCalls[context.partitionId].close++;
              // reset processEvents count
              partitionHandlerCalls[context.partitionId].processEvents = false;
            },
            async processInitialize(context) {
              partitionHandlerCalls[context.partitionId].initialize++;
            }
          };

          const subscription1 = consumerClient1.subscribe(subscriptionHandlers1, {
            maxBatchSize: 1,
            maxWaitTimeInSeconds: 1
          });

          await loopUntil({
            maxTimes: 10,
            name: "Wait for subscription1 to read from all partitions",
            timeBetweenRunsMs: 1000,
            async until() {
              // wait until we've seen processEvents invoked for each partition.
              return (
                partitionIds.filter((id) => {
                  return partitionHandlerCalls[id].processEvents;
                }).length === partitionIds.length
              );
            }
          });

          const partitionsReadFromSub2 = new Set<string>();
          const subscriptionHandlers2: SubscriptionEventHandlers = {
            async processError() {
              /* no-op */
            },
            async processEvents(_, context) {
              partitionsReadFromSub2.add(context.partitionId);
            }
          };

          // start 2nd subscription with an ownerLevel so it triggers the close handlers on the 1st subscription.
          const subscription2 = consumerClient2.subscribe(subscriptionHandlers2, {
            maxBatchSize: 1,
            maxWaitTimeInSeconds: 1,
            ownerLevel: 1
          });

          await loopUntil({
            maxTimes: 10,
            name:
              "Wait for subscription2 to read from all partitions and subscription1 to invoke close handlers",
            timeBetweenRunsMs: 1000,
            async until() {
              const sub1CloseHandlersCalled = Boolean(
                partitionIds.filter((id) => {
                  return partitionHandlerCalls[id].close > 0;
                }).length === partitionIds.length
              );
              return partitionsReadFromSub2.size === partitionIds.length && sub1CloseHandlersCalled;
            }
          });

          // close subscription2 so subscription1 can recover.
          await subscription2.close();

          await loopUntil({
            maxTimes: 10,
            name: "Wait for subscription1 to recover",
            timeBetweenRunsMs: 1000,
            async until() {
              // wait until we've seen an additional processEvent for each partition.
              return (
                partitionIds.filter((id) => {
                  return partitionHandlerCalls[id].processEvents;
                }).length === partitionIds.length
              );
            }
          });

          await subscription1.close();

          for (const id of partitionIds) {
            partitionHandlerCalls[id].initialize.should.be.greaterThan(
              1,
              `Initialize on partition ${id} was not called more than 1 time.`
            );
            partitionHandlerCalls[id].close.should.be.greaterThan(
              1,
              `Close on partition ${id} was not called more than 1 time.`
            );
          }
        });
      });

      it("Receive from specific partitions, no coordination", async function(): Promise<void> {
        const logTester = new LogTester(
          [
            "EventHubConsumerClient subscribing to specific partition (0), no checkpoint store.",
            "Single partition target: 0",
            "No partitions owned, skipping abandoning."
          ],
          [
            logger.verbose as debug.Debugger,
            logger.verbose as debug.Debugger,
            logger.verbose as debug.Debugger
          ]
        );

        const tester = new ReceivedMessagesTester(["0"], false);

        clients.push(
          new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString!,
            service.path
          )
        );

        const startPosition = await getStartingPositionsForTests(clients[0]);
        const subscription = clients[0].subscribe("0", tester, { startPosition });

        subscriptions.push(subscription);

        await tester.runTestAndPoll(producerClient);
        await subscription.close(); // or else we won't see the partition abandoning messages

        logTester.assert();
      });

      it("Receive from all partitions, no coordination", async function(): Promise<void> {
        const logTester = new LogTester(
          ["EventHubConsumerClient subscribing to all partitions, no checkpoint store."],
          [
            logger.verbose as debug.Debugger,
            logger.verbose as debug.Debugger,
            logger.verbose as debug.Debugger
          ]
        );

        const tester = new ReceivedMessagesTester(partitionIds, false);

        clients.push(
          new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString!,
            service.path
          )
        );

        const startPosition = await getStartingPositionsForTests(clients[0]);
        const subscription = clients[0].subscribe(tester, { startPosition });

        await tester.runTestAndPoll(producerClient);
        subscriptions.push(subscription);

        logTester.assert();
      });

      it("Receive from all partitions, no coordination but through multiple subscribe() calls", async function(): Promise<
        void
      > {
        const logTester = new LogTester(
          [
            ...partitionIds.map(
              (partitionId) =>
                `EventHubConsumerClient subscribing to specific partition (${partitionId}), no checkpoint store.`,
              `Abandoning owned partitions`
            ),
            ...partitionIds.map((partitionId) => `Single partition target: ${partitionId}`)
          ],
          [
            logger.verbose as debug.Debugger,
            logger.verbose as debug.Debugger,
            logger.verbose as debug.Debugger
          ]
        );

        const tester = new ReceivedMessagesTester(partitionIds, false);

        clients.push(
          new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString!,
            service.path
          )
        );

        const startPosition = await getStartingPositionsForTests(clients[0]);
        for (const partitionId of await partitionIds) {
          const subscription = clients[0].subscribe(partitionId, tester, { startPosition });
          subscriptions.push(subscription);
        }

        await tester.runTestAndPoll(producerClient);

        logTester.assert();
      });

      it("Receive from all partitions, coordinating with the same partition manager and using the default LoadBalancingStrategy", async function(): Promise<
        void
      > {
        // fast forward our partition manager so it starts reading from the latest offset
        // instead of the beginning of time.
        const logTester = new LogTester(
          [
            "EventHubConsumerClient subscribing to all partitions, using a checkpoint store.",
            /Starting event processor with ID /,
            "Abandoning owned partitions"
          ],
          [
            logger.verbose as debug.Debugger,
            logger.verbose as debug.Debugger,
            logger.verbose as debug.Debugger
          ]
        );

        const checkpointStore = new TestInMemoryCheckpointStore();

        clients.push(
          new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString!,
            service.path,
            // specifying your own checkpoint store activates the "production ready" code path that
            checkpointStore
            // also uses the BalancedLoadBalancingStrategy
          )
        );
        const startPosition = await getStartingPositionsForTests(clients[0]);

        const tester = new ReceivedMessagesTester(partitionIds, true);

        const subscriber1 = clients[0].subscribe(tester, { startPosition });
        subscriptions.push(subscriber1);

        clients.push(
          new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString!,
            service.path
            // specifying your own checkpoint store activates the "production ready" code path that
            // also uses the BalancedLoadBalancingStrategy
          )
        );

        const subscriber2 = clients[1].subscribe(tester, { startPosition });
        subscriptions.push(subscriber2);

        await tester.runTestAndPoll(producerClient);

        // or else we won't see the abandoning message
        for (const subscription of subscriptions) {
          await subscription.close();
        }
        logTester.assert();
      });

      it("Receive from all partitions, coordinating with the same partition manager and using the GreedyLoadBalancingStrategy", async function(): Promise<
        void
      > {
        // fast forward our partition manager so it starts reading from the latest offset
        // instead of the beginning of time.
        const logTester = new LogTester(
          [
            "EventHubConsumerClient subscribing to all partitions, using a checkpoint store.",
            /Starting event processor with ID /,
            "Abandoning owned partitions"
          ],
          [
            logger.verbose as debug.Debugger,
            logger.verbose as debug.Debugger,
            logger.verbose as debug.Debugger
          ]
        );

        const checkpointStore = new TestInMemoryCheckpointStore();

        clients.push(
          new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString!,
            service.path,
            // specifying your own checkpoint store activates the "production ready" code path that
            {
              loadBalancingOptions: {
                strategy: "greedy"
              }
            }
          )
        );

        const tester = new ReceivedMessagesTester(partitionIds, true);

        const startPosition = await getStartingPositionsForTests(clients[0]);
        const subscriber1 = clients[0].subscribe(tester, { startPosition });
        subscriptions.push(subscriber1);

        clients.push(
          new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString!,
            service.path,
            // specifying your own checkpoint store activates the "production ready" code path that
            checkpointStore,
            {
              loadBalancingOptions: {
                strategy: "greedy"
              }
            }
          )
        );

        const subscriber2 = clients[1].subscribe(tester, { startPosition });
        subscriptions.push(subscriber2);

        await tester.runTestAndPoll(producerClient);

        // or else we won't see the abandoning message
        for (const subscription of subscriptions) {
          await subscription.close();
        }
        logTester.assert();
      });

      it("Stops receiving events if close is immediately called, single partition.", async function(): Promise<
        void
      > {
        const partitionId = "0";
        const client = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString,
          service.path
        );

        clients.push(client);

        let initializeCalled = 0;
        let closeCalled = 0;

        const subscription = client.subscribe(partitionId, {
          async processError() {
            /* no-op */
          },
          async processEvents() {
            /* no-op */
          },
          async processClose() {
            closeCalled++;
          },
          async processInitialize() {
            initializeCalled++;
          }
        });

        await subscription.close();

        await loopUntil({
          maxTimes: 10,
          name: "Wait for the subscription to stop running.",
          timeBetweenRunsMs: 100,
          async until() {
            return !subscription.isRunning;
          }
        });

        // If `processInitialize` is called, then `processClose` should be called as well.
        // Otherwise, we shouldn't see either called.
        initializeCalled.should.equal(
          closeCalled,
          "processClose was not called the same number of times as processInitialize."
        );
      });

      it("Stops receiving events if close is immediately called, multiple partitions.", async function(): Promise<
        void
      > {
        const client = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString,
          service.path
        );

        clients.push(client);

        let initializeCalled = 0;
        let closeCalled = 0;

        const subscription = client.subscribe({
          async processError() {
            /* no-op */
          },
          async processEvents() {
            /* no-op */
          },
          async processClose() {
            closeCalled++;
          },
          async processInitialize() {
            initializeCalled++;
          }
        });

        await subscription.close();

        await loopUntil({
          maxTimes: 10,
          name: "Wait for the subscription to stop running.",
          timeBetweenRunsMs: 100,
          async until() {
            return !subscription.isRunning;
          }
        });

        // If `processInitialize` is called, then `processClose` should be called as well.
        // Otherwise, we shouldn't see either called.
        initializeCalled.should.equal(
          closeCalled,
          "processClose was not called the same number of times as processInitialize."
        );
      });

      describe("processError", function(): void {
        it("supports awaiting subscription.close on non partition-specific errors", async function(): Promise<
          void
        > {
          // Use an invalid Event Hub name to trigger a non partition-specific error.
          const client = new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString,
            "Fake-Hub"
          );

          let subscription: Subscription;
          const caughtErr: Error = await new Promise((resolve) => {
            subscription = client.subscribe({
              processEvents: async () => {
                /* no-op */
              },
              processError: async (err, context) => {
                if (!context.partitionId) {
                  await subscription.close();
                  resolve(err);
                }
              }
            });
          });

          should.exist(caughtErr);

          await client.close();
        });

        it("supports awaiting subscription.close on partition-specific errors", async function(): Promise<
          void
        > {
          // Use an invalid Event Hub name to trigger a non partition-specific error.
          const client = new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString,
            service.path
          );

          let subscription: Subscription;
          const caughtErr: Error = await new Promise((resolve) => {
            // Subscribe to an invalid partition id to trigger a partition-specific error.
            subscription = client.subscribe("-1", {
              processEvents: async () => {
                /* no-op */
              },
              processError: async (err, context) => {
                if (context.partitionId) {
                  await subscription.close();
                  resolve(err);
                }
              }
            });
          });

          should.exist(caughtErr);

          await client.close();
        });
      });
    });

    describe("subscribe() with partitionId 0 as number", function(): void {
      it("should not throw an error", async function(): Promise<void> {
        let subscription: Subscription | undefined;
        await new Promise<void>((resolve, reject) => {
          subscription = consumerClient.subscribe(
            // @ts-expect-error number for partitionId should work even if type is string
            0,
            {
              processEvents: async () => {
                resolve();
              },
              processError: async (err) => {
                reject(err);
              }
            },
            {
              startPosition: latestEventPosition,
              maxWaitTimeInSeconds: 0 // Set timeout of 0 to resolve the promise ASAP
            }
          );
        });
        await subscription!.close();
      });
    });

    describe("subscribe() with EventPosition specified as", function(): void {
      let partitionId: string;
      let eventSentBeforeSubscribe: EventData;
      let eventsSentAfterSubscribe: EventData[];

      beforeEach(async () => {
        partitionId = partitionIds[0];

        eventSentBeforeSubscribe = {
          body: "Hello awesome world " + Math.random()
        };
        await producerClient.sendBatch([eventSentBeforeSubscribe], { partitionId });

        eventsSentAfterSubscribe = [];
        for (let i = 0; i < 5; i++) {
          eventsSentAfterSubscribe.push({
            body: "Hello awesome world " + Math.random(),
            properties: {
              stamp: Math.random()
            }
          });
        }
      });

      it("'from end of stream' should receive messages correctly", async function(): Promise<void> {
        let subscription: Subscription | undefined;
        let processEventsCalled = false;
        const eventsReceived: ReceivedEventData[] = [];

        await new Promise<void>((resolve, reject) => {
          subscription = consumerClient.subscribe(
            partitionId,
            {
              processEvents: async (data) => {
                if (!processEventsCalled) {
                  processEventsCalled = true;
                  should.equal(data.length, 0, "Received events when none were sent yet.");
                  await producerClient.sendBatch(eventsSentAfterSubscribe, { partitionId });
                  return;
                }
                eventsReceived.push(...data);
                if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                  resolve();
                }
              },
              processError: async (err) => {
                reject(err);
              }
            },
            {
              startPosition: latestEventPosition,
              maxWaitTimeInSeconds: 30
            }
          );
        });
        await subscription!.close();

        if (eventsReceived.find((event) => event.body === eventSentBeforeSubscribe.body)) {
          should.fail("Received event sent before subscribe call with latestEventPosition.");
        }

        should.equal(
          eventsReceived.length,
          eventsSentAfterSubscribe.length,
          "Not received the same number of events that were sent."
        );
        for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
          eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
          eventsReceived[i].properties!.stamp.should.equal(
            eventsSentAfterSubscribe[i].properties!.stamp
          );
        }
      });

      it("'after a particular sequence number' should receive messages correctly", async function(): Promise<
        void
      > {
        const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
        let subscription: Subscription | undefined;
        let processEventsCalled = false;
        const eventsReceived: ReceivedEventData[] = [];

        await new Promise<void>((resolve, reject) => {
          subscription = consumerClient.subscribe(
            partitionId,
            {
              processEvents: async (data) => {
                if (!processEventsCalled) {
                  processEventsCalled = true;
                  should.equal(data.length, 0, "Received events when none were sent yet.");
                  await producerClient.sendBatch(eventsSentAfterSubscribe, { partitionId });
                  return;
                }
                eventsReceived.push(...data);
                if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                  resolve();
                }
              },
              processError: async (err) => {
                reject(err);
              }
            },
            {
              startPosition: { sequenceNumber: partitionInfo.lastEnqueuedSequenceNumber },
              maxWaitTimeInSeconds: 30
            }
          );
        });
        await subscription!.close();

        if (eventsReceived.find((event) => event.body === eventSentBeforeSubscribe.body)) {
          should.fail("Received event sent before subscribe call with last sequence number.");
        }

        should.equal(
          eventsReceived.length,
          eventsSentAfterSubscribe.length,
          "Not received the same number of events that were sent."
        );
        for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
          eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
          eventsReceived[i].properties!.stamp.should.equal(
            eventsSentAfterSubscribe[i].properties!.stamp
          );
        }
      });

      it("'after a particular sequence number' with isInclusive should receive messages correctly", async function(): Promise<
        void
      > {
        const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
        let subscription: Subscription | undefined;
        let processEventsCalled = false;
        const eventsReceived: ReceivedEventData[] = [];

        await new Promise<void>((resolve, reject) => {
          subscription = consumerClient.subscribe(
            partitionId,
            {
              processEvents: async (data) => {
                if (!processEventsCalled) {
                  processEventsCalled = true;
                  should.equal(
                    data.length,
                    1,
                    "Expected 1 event sent right before subscribe call."
                  );
                  should.equal(
                    data[0].body,
                    eventSentBeforeSubscribe.body,
                    "Should have received only the 1 event sent right before subscribe call."
                  );

                  await producerClient.sendBatch(eventsSentAfterSubscribe, { partitionId });
                  return;
                }

                eventsReceived.push(...data);
                if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                  resolve();
                }
              },
              processError: async (err) => {
                reject(err);
              }
            },
            {
              startPosition: {
                sequenceNumber: partitionInfo.lastEnqueuedSequenceNumber,
                isInclusive: true
              },
              maxWaitTimeInSeconds: 30
            }
          );
        });
        await subscription!.close();

        should.equal(
          eventsReceived.length,
          eventsSentAfterSubscribe.length,
          "Not received the same number of events that were sent."
        );

        for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
          eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
          eventsReceived[i].properties!.stamp.should.equal(
            eventsSentAfterSubscribe[i].properties!.stamp
          );
        }
      });

      it("'after a particular offset' should receive messages correctly", async function(): Promise<
        void
      > {
        const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
        let subscription: Subscription | undefined;
        let processEventsCalled = false;
        const eventsReceived: ReceivedEventData[] = [];

        await new Promise<void>((resolve, reject) => {
          subscription = consumerClient.subscribe(
            partitionId,
            {
              processEvents: async (data) => {
                if (!processEventsCalled) {
                  processEventsCalled = true;
                  should.equal(data.length, 0, "Received events when none were sent yet.");
                  await producerClient.sendBatch(eventsSentAfterSubscribe, { partitionId });
                  return;
                }
                eventsReceived.push(...data);
                if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                  resolve();
                }
              },
              processError: async (err) => {
                reject(err);
              }
            },
            {
              startPosition: { offset: partitionInfo.lastEnqueuedOffset },
              maxWaitTimeInSeconds: 30
            }
          );
        });
        await subscription!.close();

        if (eventsReceived.find((event) => event.body === eventSentBeforeSubscribe.body)) {
          should.fail("Received event sent before subscribe call with last offset.");
        }

        should.equal(
          eventsReceived.length,
          eventsSentAfterSubscribe.length,
          "Not received the same number of events that were sent."
        );
        for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
          eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
          eventsReceived[i].properties!.stamp.should.equal(
            eventsSentAfterSubscribe[i].properties!.stamp
          );
        }
      });

      it("'after a particular offset' with isInclusive should receive messages correctly", async function(): Promise<
        void
      > {
        const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
        let subscription: Subscription | undefined;
        let processEventsCalled = false;
        const eventsReceived: ReceivedEventData[] = [];

        await new Promise<void>((resolve, reject) => {
          subscription = consumerClient.subscribe(
            partitionId,
            {
              processEvents: async (data) => {
                if (!processEventsCalled) {
                  processEventsCalled = true;
                  should.equal(
                    data.length,
                    1,
                    "Expected 1 event sent right before subscribe call."
                  );
                  should.equal(
                    data[0].body,
                    eventSentBeforeSubscribe.body,
                    "Should have received only the 1 event sent right before subscribe call."
                  );

                  await producerClient.sendBatch(eventsSentAfterSubscribe, {
                    partitionId
                  });
                  return;
                }

                eventsReceived.push(...data);
                if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                  resolve();
                }
              },
              processError: async (err) => {
                reject(err);
              }
            },
            {
              startPosition: {
                offset: partitionInfo.lastEnqueuedOffset,
                isInclusive: true
              },
              maxWaitTimeInSeconds: 30
            }
          );
        });
        await subscription!.close();

        should.equal(
          eventsReceived.length,
          eventsSentAfterSubscribe.length,
          "Not received the same number of events that were sent."
        );

        for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
          eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
          eventsReceived[i].properties!.stamp.should.equal(
            eventsSentAfterSubscribe[i].properties!.stamp
          );
        }
      });

      it("'after a particular enqueued time' should receive messages correctly", async function(): Promise<
        void
      > {
        const partitionInfo = await consumerClient.getPartitionProperties(partitionId);
        let subscription: Subscription | undefined;
        let processEventsCalled = false;
        const eventsReceived: ReceivedEventData[] = [];

        await new Promise<void>((resolve, reject) => {
          subscription = consumerClient.subscribe(
            partitionId,
            {
              processEvents: async (data) => {
                if (!processEventsCalled) {
                  processEventsCalled = true;
                  should.equal(data.length, 0, "Received events when none were sent yet.");
                  await producerClient.sendBatch(eventsSentAfterSubscribe, {
                    partitionId
                  });
                  return;
                }

                eventsReceived.push(...data);
                if (eventsReceived.length === eventsSentAfterSubscribe.length) {
                  resolve();
                }
              },
              processError: async (err) => {
                reject(err);
              }
            },
            {
              startPosition: { enqueuedOn: partitionInfo.lastEnqueuedOnUtc },
              maxWaitTimeInSeconds: 30
            }
          );
        });
        await subscription!.close();

        if (eventsReceived.find((event) => event.body === eventSentBeforeSubscribe.body)) {
          should.fail("Received event sent before subscribe call with last offset.");
        }

        should.equal(
          eventsReceived.length,
          eventsSentAfterSubscribe.length,
          "Not received the same number of events that were sent."
        );
        for (let i = 0; i < eventsSentAfterSubscribe.length; i++) {
          eventsReceived[i].body.should.equal(eventsSentAfterSubscribe[i].body);
          eventsReceived[i].properties!.stamp.should.equal(
            eventsSentAfterSubscribe[i].properties!.stamp
          );
        }
      });
    });

    describe("subscribe() with trackLastEnqueuedEventProperties", function(): void {
      it("should have lastEnqueuedEventProperties populated", async function(): Promise<void> {
        const partitionId = partitionIds[0];

        const eventData = { body: "Hello awesome world " + Math.random() };
        await producerClient.sendBatch([eventData], { partitionId });
        debug("sent: ", eventData);

        const pInfo = await consumerClient.getPartitionProperties(partitionId);
        debug("partition info: ", pInfo);

        let subscription: Subscription | undefined;
        await new Promise<void>((resolve, reject) => {
          subscription = consumerClient.subscribe(
            partitionId,
            {
              processEvents: async (data, context) => {
                data.length.should.equal(1);
                should.exist(context.lastEnqueuedEventProperties);
                context.lastEnqueuedEventProperties!.offset!.should.equal(pInfo.lastEnqueuedOffset);
                context.lastEnqueuedEventProperties!.sequenceNumber!.should.equal(
                  pInfo.lastEnqueuedSequenceNumber
                );
                context
                  .lastEnqueuedEventProperties!.enqueuedOn!.getTime()
                  .should.equal(pInfo.lastEnqueuedOnUtc.getTime());
                context
                  .lastEnqueuedEventProperties!.retrievedOn!.getTime()
                  .should.be.greaterThan(Date.now() - 60000);

                resolve();
              },
              processError: async (err) => {
                reject(err);
              }
            },
            {
              startPosition: earliestEventPosition,
              maxBatchSize: 1,
              trackLastEnqueuedEventProperties: true
            }
          );
        });
        await subscription!.close();
      });
    });

    describe("Negative scenarios", function(): void {
      it("should throw MessagingEntityNotFoundError for non existing consumer group", async function(): Promise<
        void
      > {
        const badConsumerClient = new EventHubConsumerClient(
          "boo",
          service.connectionString,
          service.path
        );
        let subscription: Subscription | undefined;
        const caughtErr = await new Promise<Error | MessagingError>((resolve) => {
          subscription = badConsumerClient.subscribe({
            processEvents: async () => {
              /** Nothing to do here */
            },
            processError: async (err) => {
              resolve(err);
            }
          });
        });
        await subscription!.close();
        await badConsumerClient.close();

        should.exist(caughtErr);
        should.equal((caughtErr as MessagingError).code, "MessagingEntityNotFoundError");
      });

      it(`should throw an invalid EventHub address error for invalid partition`, async function(): Promise<
        void
      > {
        let subscription: Subscription | undefined;
        const caughtErr = await new Promise<Error | MessagingError>((resolve) => {
          subscription = consumerClient.subscribe("boo", {
            processEvents: async () => {
              /** Nothing to do here */
            },
            processError: async (err) => {
              resolve(err);
            }
          });
        });
        await subscription!.close();
        should.exist(caughtErr);
        should.equal((caughtErr as MessagingError).code, "ArgumentOutOfRangeError");
      });
    });
  }).timeout(120000);
});
