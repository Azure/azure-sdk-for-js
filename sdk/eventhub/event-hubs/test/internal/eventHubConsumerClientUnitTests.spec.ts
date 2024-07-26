// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CheckpointStore, SubscriptionEventHandlers } from "../../src/index.js";
import { EventHubConsumerClient, isCheckpointStore } from "../../src/eventHubConsumerClient.js";
import { EventProcessor, FullEventProcessorOptions } from "../../src/eventProcessor.js";
import { BalancedLoadBalancingStrategy } from "../../src/loadBalancerStrategies/balancedStrategy.js";
import { ConnectionContext } from "../../src/connectionContext.js";
import { GreedyLoadBalancingStrategy } from "../../src/loadBalancerStrategies/greedyStrategy.js";
import { InMemoryCheckpointStore } from "../../src/inMemoryCheckpointStore.js";
import { should, expect } from "../utils/chai.js";
import { describe, it, beforeEach, vi, MockInstance, afterEach } from "vitest";
import { createConsumer } from "../utils/clients.js";
import { PartitionGate } from "../../src/impl/partitionGate.js";

function mockCreateEventProcessor(
  client: EventHubConsumerClient,
  mockImpl: (typeof client)["_createEventProcessor"],
): void {
  vi.spyOn(
    client as EventHubConsumerClient & {
      _createEventProcessor: (typeof client)["_createEventProcessor"];
    },
    "_createEventProcessor",
  ).mockImplementation(mockImpl as any);
}

describe("EventHubConsumerClient", function () {
  describe("unit tests", function () {
    it("isCheckpointStore", async function () {
      isCheckpointStore({
        processEvents: async () => {
          /* no-op */
        },
        processClose: async () => {
          /* no-op */
        },
      }).should.not.equal(true);

      isCheckpointStore("hello").should.not.equal(true);

      isCheckpointStore(new InMemoryCheckpointStore()).should.equal(true);
    });

    describe("subscribe() overloads route properly", function () {
      let client: EventHubConsumerClient;
      let clientWithCheckpointStore: EventHubConsumerClient;
      let subscriptionHandlers: SubscriptionEventHandlers;
      let validateOptions: (options: FullEventProcessorOptions) => void;
      let stopSpy: MockInstance<[], Promise<void>>;
      let stubEventProcessor: EventProcessor;
      const fakeEventProcessorConstructor = (
        connectionContext: ConnectionContext,
        subscriptionEventHandlers: SubscriptionEventHandlers,
        checkpointStore: CheckpointStore,
        options: FullEventProcessorOptions,
      ): EventProcessor => {
        subscriptionEventHandlers.should.equal(subscriptionHandlers);
        should.exist(connectionContext.managementSession);
        isCheckpointStore(checkpointStore).should.equal(true);
        validateOptions(options);
        return stubEventProcessor;
      };

      beforeEach(async function () {
        client = createConsumer().consumer;
        stubEventProcessor =
          client["createEventProcessorForAllPartitions"](subscriptionHandlers).eventProcessor;
        client["_partitionGate"] = new PartitionGate();
        // it doesn't actually matter _what_ checkpoint store gets passed in
        clientWithCheckpointStore = createConsumer({
          checkPointStore: new InMemoryCheckpointStore(),
        }).consumer;
        stopSpy = vi.spyOn(stubEventProcessor, "stop");
        subscriptionHandlers = {
          processEvents: async () => {
            /* no-op */
          },
          processError: async () => {
            /* no-op */
          },
        };
        mockCreateEventProcessor(client, fakeEventProcessorConstructor);
        mockCreateEventProcessor(clientWithCheckpointStore, fakeEventProcessorConstructor);
      });

      afterEach(async function () {
        await client.close();
        await clientWithCheckpointStore.close();
        vi.restoreAllMocks();
      });

      it("conflicting subscribes", async function () {
        validateOptions = () => {
          /* no-op */
        };

        client.subscribe(subscriptionHandlers);
        // invalid - we're already subscribed to a conflicting partition
        should.throw(
          () => client.subscribe("0", subscriptionHandlers),
          /Partition already has a subscriber/,
        );

        clientWithCheckpointStore.subscribe("0", subscriptionHandlers);
        // invalid - we're already subscribed to a conflicting partition
        should.throw(
          () => clientWithCheckpointStore.subscribe(subscriptionHandlers),
          /Partition already has a subscriber/,
        );
      });

      it("subscribe to single partition, no checkpoint store, no loadBalancingOptions", async function () {
        validateOptions = (options) => {
          // when the user doesn't pass a checkpoint store we give them a really simple set of
          // defaults:
          //   - InMemoryCheckpointStore
          //   - UnbalancedLoadBalancingStrategy
          //   - loopIntervalInMs: 10000

          // So we don't set an ownerlevel here - it's all in-memory and you can have as many
          // as you want (the user still has the option to pass their own via SubscribeOptions).
          should.not.exist(options.ownerLevel);

          // and if you don't specify a CheckpointStore we also assume you just want to read all partitions
          // immediately so we use the UnbalancedLoadBalancingStrategy.
          options.loadBalancingStrategy.constructor.name.should.equal(
            "UnbalancedLoadBalancingStrategy",
          );

          options.loopIntervalInMs.should.equal(10000);
          options.processingTarget!.should.equal("0");
        };

        const subscription = client.subscribe("0", subscriptionHandlers);

        await subscription.close();
        expect(stopSpy).toHaveBeenCalledOnce();
      });

      it("subscribe to single partition, no checkpoint store, WITH loadBalancingOptions", async function () {
        validateOptions = (options) => {
          // When the user subscribes to a single partition, we always use the UnbalancedLoadBalancingStrategy.
          // The loadBalancingOptions `strategy` and `partitionOwnershipExpirationIntervalInMs` fields are ignored.
          //   - InMemoryCheckpointStore
          //   - UnbalancedLoadBalancingStrategy
          //   - loopIntervalInMs: 10000

          // So we don't set an ownerlevel here - it's all in-memory and you can have as many
          // as you want (the user still has the option to pass their own via SubscribeOptions).
          should.not.exist(options.ownerLevel);

          // and if you don't specify a CheckpointStore we also assume you just want to read all partitions
          // immediately so we use the UnbalancedLoadBalancingStrategy.
          options.loadBalancingStrategy.constructor.name.should.equal(
            "UnbalancedLoadBalancingStrategy",
          );

          options.loopIntervalInMs.should.equal(20);
          options.processingTarget!.should.equal("0");
        };

        client = createConsumer({
          options: {
            loadBalancingOptions: {
              strategy: "greedy", // ignored
              partitionOwnershipExpirationIntervalInMs: 100, // ignored
              updateIntervalInMs: 20,
            },
          },
        }).consumer;
        mockCreateEventProcessor(client, fakeEventProcessorConstructor);

        const subscription = client.subscribe("0", subscriptionHandlers);

        await subscription.close();
        expect(stopSpy).toHaveBeenCalledOnce();
      });

      it("subscribe to single partition, WITH checkpoint store, no loadBalancingOptions", async function () {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store but subscribes to a single partition,
          // - they use their checkpoint store and the following defaults:
          //   - UnbalancedLoadBalancingStrategy
          //   - loopIntervalInMs: 10000

          // To coordinate properly we set an owner level - this lets us
          // cooperate properly with other consumers within this group.
          options.ownerLevel!.should.equal(0);

          options.processingTarget!.should.equal("0");
          options.loadBalancingStrategy.constructor.name.should.equal(
            "UnbalancedLoadBalancingStrategy",
          );
          options.loopIntervalInMs.should.equal(10000);
        };

        clientWithCheckpointStore.subscribe("0", subscriptionHandlers);
      });

      it("subscribe to single partition, WITH checkpoint store, WITH loadBalancingOptions", async function () {
        validateOptions = (options) => {
          // When the user subscribes to a single partition, we always use the UnbalancedLoadBalancingStrategy.
          // The loadBalancingOptions `strategy` and `partitionOwnershipExpirationIntervalInMs` fields are ignored.
          //   - UnbalancedLoadBalancingStrategy
          //   - loopIntervalInMs: 10000

          // To coordinate properly we set an owner level - this lets us
          // cooperate properly with other consumers within this group.
          options.ownerLevel!.should.equal(0);

          options.processingTarget!.should.equal("0");
          options.loadBalancingStrategy.constructor.name.should.equal(
            "UnbalancedLoadBalancingStrategy",
          );
          options.loopIntervalInMs.should.equal(20);
        };

        clientWithCheckpointStore = createConsumer({
          checkPointStore: new InMemoryCheckpointStore(),
          options: {
            loadBalancingOptions: {
              strategy: "greedy", // ignored
              partitionOwnershipExpirationIntervalInMs: 100, // ignored
              updateIntervalInMs: 20,
            },
          },
        }).consumer;
        mockCreateEventProcessor(clientWithCheckpointStore, fakeEventProcessorConstructor);

        clientWithCheckpointStore.subscribe("0", subscriptionHandlers);
      });

      it("subscribe to all partitions, no checkpoint store, no loadBalancingOptions", async function () {
        validateOptions = (options) => {
          // when the user doesn't pass a checkpoint store we give them a really simple set of
          // defaults:
          //   - InMemoryCheckpointStore
          //   - UnbalancedLoadBalancingStrategy
          //   - loopIntervalInMs: 10000
          should.not.exist(options.ownerLevel);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "UnbalancedLoadBalancingStrategy",
          );
          options.loopIntervalInMs.should.equal(10000);
        };

        client.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, no checkpoint store, WITH loadBalancingOptions", async function () {
        validateOptions = (options) => {
          // When the user doesn't provide a checkpoint store, we always use the UnbalancedLoadBalancingStrategy.
          // The loadBalancingOptions `strategy` and `partitionOwnershipExpirationIntervalInMs` fields are ignored.
          //   - InMemoryCheckpointStore
          //   - UnbalancedLoadBalancingStrategy
          should.not.exist(options.ownerLevel);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "UnbalancedLoadBalancingStrategy",
          );
          options.loopIntervalInMs.should.equal(20);
        };

        client = createConsumer({
          options: {
            loadBalancingOptions: {
              strategy: "greedy", // ignored
              partitionOwnershipExpirationIntervalInMs: 100, // ignored
              updateIntervalInMs: 20,
            },
          },
        }).consumer;
        mockCreateEventProcessor(client, fakeEventProcessorConstructor);

        client.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store, no loadBalancingOptions", async function () {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store we treat their consumer client as
          // a "production" ready client - they use their checkpoint store and the following
          // defaults:
          //   - BalancedLoadBalancingStrategy
          //   - loopIntervalInMs: 10000
          //   - partitionOwnershipExpirationIntervalInMs: 60000
          options.ownerLevel!.should.equal(0);
          should.not.exist(options.processingTarget);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "BalancedLoadBalancingStrategy",
          );
          (options.loadBalancingStrategy as BalancedLoadBalancingStrategy)[
            "_partitionOwnershipExpirationIntervalInMs"
          ].should.equal(60000);
          options.loopIntervalInMs.should.equal(10000);
        };

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store, WITH loadBalancingOptions (greedy, updateInterval, expirationInterval)", async function () {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store and subscribes to all partitions,
          // we use their loadBalancingOptions when provided.
          options.ownerLevel!.should.equal(0);
          should.not.exist(options.processingTarget);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "GreedyLoadBalancingStrategy",
          );
          (options.loadBalancingStrategy as GreedyLoadBalancingStrategy)[
            "_partitionOwnershipExpirationIntervalInMs"
          ].should.equal(100);
          options.loopIntervalInMs.should.equal(20);
        };

        clientWithCheckpointStore = createConsumer({
          checkPointStore: new InMemoryCheckpointStore(),
          options: {
            loadBalancingOptions: {
              strategy: "greedy",
              partitionOwnershipExpirationIntervalInMs: 100,
              updateIntervalInMs: 20,
            },
          },
        }).consumer;
        mockCreateEventProcessor(clientWithCheckpointStore, fakeEventProcessorConstructor);

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store, WITH loadBalancingOptions (balanced, updateInterval, expirationInterval)", async function () {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store and subscribes to all partitions,
          // we use their loadBalancingOptions when provided.
          options.ownerLevel!.should.equal(0);
          should.not.exist(options.processingTarget);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "BalancedLoadBalancingStrategy",
          );
          (options.loadBalancingStrategy as BalancedLoadBalancingStrategy)[
            "_partitionOwnershipExpirationIntervalInMs"
          ].should.equal(100);
          options.loopIntervalInMs.should.equal(20);
        };

        clientWithCheckpointStore = createConsumer({
          checkPointStore: new InMemoryCheckpointStore(),
          options: {
            loadBalancingOptions: {
              strategy: "balanced",
              partitionOwnershipExpirationIntervalInMs: 100,
              updateIntervalInMs: 20,
            },
          },
        }).consumer;
        mockCreateEventProcessor(clientWithCheckpointStore, fakeEventProcessorConstructor);

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store, WITH loadBalancingOptions (updateInterval, expirationInterval)", async function () {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store and subscribes to all partitions,
          // we use their loadBalancingOptions when provided.
          options.ownerLevel!.should.equal(0);
          should.not.exist(options.processingTarget);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "BalancedLoadBalancingStrategy",
          );
          (options.loadBalancingStrategy as BalancedLoadBalancingStrategy)[
            "_partitionOwnershipExpirationIntervalInMs"
          ].should.equal(100);
          options.loopIntervalInMs.should.equal(20);
        };

        clientWithCheckpointStore = createConsumer({
          checkPointStore: new InMemoryCheckpointStore(),
          options: {
            loadBalancingOptions: {
              // default 'strategy' is 'balanced'
              partitionOwnershipExpirationIntervalInMs: 100,
              updateIntervalInMs: 20,
            },
          },
        }).consumer;
        mockCreateEventProcessor(clientWithCheckpointStore, fakeEventProcessorConstructor);

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store, WITH loadBalancingOptions (strategy)", async function () {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store and subscribes to all partitions,
          // we use their loadBalancingOptions when provided.
          options.ownerLevel!.should.equal(0);
          should.not.exist(options.processingTarget);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "GreedyLoadBalancingStrategy",
          );
          (options.loadBalancingStrategy as GreedyLoadBalancingStrategy)[
            "_partitionOwnershipExpirationIntervalInMs"
          ].should.equal(60000);
          options.loopIntervalInMs.should.equal(10000);
        };

        clientWithCheckpointStore = createConsumer({
          checkPointStore: new InMemoryCheckpointStore(),
          options: {
            loadBalancingOptions: {
              strategy: "greedy",
              // defaults are used for the rest of the parameters.
            },
          },
        }).consumer;
        mockCreateEventProcessor(clientWithCheckpointStore, fakeEventProcessorConstructor);

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("multiple subscribe calls from the same eventhubconsumerclient use the same owner ID", async function () {
        let ownerId: string | undefined = undefined;

        validateOptions = (options) => {
          should.exist(options.ownerId);

          if (ownerId) {
            options.ownerId!.should.equal(ownerId);
            ownerId = options.ownerId;
          } else {
            ownerId = options.ownerId;
          }
        };

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });
    });
  });
});
