// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
CheckpointStore,
SubscriptionEventHandlers
} from "../../src";
import { EventHubConsumerClient, isCheckpointStore } from "../../src/eventHubConsumerClient";
import { InMemoryCheckpointStore } from "../../src/inMemoryCheckpointStore";
import { EventProcessor, FullEventProcessorOptions } from "../../src/eventProcessor";
import { SinonStubbedInstance, createStubInstance } from "sinon";
import { ConnectionContext } from "../../src/connectionContext";
import { BalancedLoadBalancingStrategy } from "../../src/loadBalancerStrategies/balancedStrategy";
import { GreedyLoadBalancingStrategy } from "../../src/loadBalancerStrategies/greedyStrategy";
import chai from "chai";


const should = chai.should();

describe("unit tests", () => {
    it("isCheckpointStore", () => {
      isCheckpointStore({
        processEvents: async () => {},
        processClose: async () => {}
      }).should.not.ok;

      isCheckpointStore("hello").should.not.ok;

      isCheckpointStore(new InMemoryCheckpointStore()).should.ok;
    });

    describe("subscribe() overloads route properly", () => {
      let client: EventHubConsumerClient;
      let clientWithCheckpointStore: EventHubConsumerClient;
      let subscriptionHandlers: SubscriptionEventHandlers;
      let fakeEventProcessor: SinonStubbedInstance<EventProcessor>;
      const fakeEventProcessorConstructor = (
        connectionContext: ConnectionContext,
        subscriptionEventHandlers: SubscriptionEventHandlers,
        checkpointStore: CheckpointStore,
        options: FullEventProcessorOptions
      ) => {
        subscriptionEventHandlers.should.equal(subscriptionHandlers);
        should.exist(connectionContext.managementSession);
        isCheckpointStore(checkpointStore).should.be.ok;

        validateOptions(options);

        return fakeEventProcessor;
      };

      let validateOptions: (options: FullEventProcessorOptions) => void;

      beforeEach(() => {
        fakeEventProcessor = createStubInstance(EventProcessor);

        client = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path
        );

        clientWithCheckpointStore = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // it doesn't actually matter _what_ checkpoint store gets passed in
          new InMemoryCheckpointStore()
        );

        subscriptionHandlers = {
          processEvents: async () => {},
          processError: async () => {}
        };

        (client as any)["_createEventProcessor"] = fakeEventProcessorConstructor;
        (clientWithCheckpointStore as any)["_createEventProcessor"] = fakeEventProcessorConstructor;
      });

      it("conflicting subscribes", () => {
        validateOptions = () => {};

        client.subscribe(subscriptionHandlers);
        // invalid - we're already subscribed to a conflicting partition
        should.throw(
          () => client.subscribe("0", subscriptionHandlers),
          /Partition already has a subscriber/
        );

        clientWithCheckpointStore.subscribe("0", subscriptionHandlers);
        // invalid - we're already subscribed to a conflicting partition
        should.throw(
          () => clientWithCheckpointStore.subscribe(subscriptionHandlers),
          /Partition already has a subscriber/
        );
      });

      it("subscribe to single partition, no checkpoint store, no loadBalancingOptions", () => {
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
            "UnbalancedLoadBalancingStrategy"
          );

          options.loopIntervalInMs.should.equal(10000);
          options.processingTarget!.should.equal("0");
        };

        const subscription = client.subscribe("0", subscriptionHandlers);

        subscription.close();
        fakeEventProcessor.stop.callCount.should.equal(1);
      });

      it("subscribe to single partition, no checkpoint store, WITH loadBalancingOptions", () => {
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
            "UnbalancedLoadBalancingStrategy"
          );

          options.loopIntervalInMs.should.equal(20);
          options.processingTarget!.should.equal("0");
        };

        client = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          {
            loadBalancingOptions: {
              strategy: "greedy", // ignored
              partitionOwnershipExpirationIntervalInMs: 100, // ignored
              updateIntervalInMs: 20
            }
          }
        );
        (client as any)["_createEventProcessor"] = fakeEventProcessorConstructor;

        const subscription = client.subscribe("0", subscriptionHandlers);

        subscription.close();
        fakeEventProcessor.stop.callCount.should.equal(1);
      });

      it("subscribe to single partition, WITH checkpoint store, no loadBalancingOptions", () => {
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
            "UnbalancedLoadBalancingStrategy"
          );
          options.loopIntervalInMs.should.equal(10000);
        };

        clientWithCheckpointStore.subscribe("0", subscriptionHandlers);
      });

      it("subscribe to single partition, WITH checkpoint store, WITH loadBalancingOptions", () => {
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
            "UnbalancedLoadBalancingStrategy"
          );
          options.loopIntervalInMs.should.equal(20);
        };

        clientWithCheckpointStore = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // it doesn't actually matter _what_ checkpoint store gets passed in
          new InMemoryCheckpointStore(),
          {
            loadBalancingOptions: {
              strategy: "greedy", // ignored
              partitionOwnershipExpirationIntervalInMs: 100, // ignored
              updateIntervalInMs: 20
            }
          }
        );
        (clientWithCheckpointStore as any)["_createEventProcessor"] = fakeEventProcessorConstructor;

        clientWithCheckpointStore.subscribe("0", subscriptionHandlers);
      });

      it("subscribe to all partitions, no checkpoint store, no loadBalancingOptions", () => {
        validateOptions = (options) => {
          // when the user doesn't pass a checkpoint store we give them a really simple set of
          // defaults:
          //   - InMemoryCheckpointStore
          //   - UnbalancedLoadBalancingStrategy
          //   - loopIntervalInMs: 10000
          should.not.exist(options.ownerLevel);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "UnbalancedLoadBalancingStrategy"
          );
          options.loopIntervalInMs.should.equal(10000);
        };

        client.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, no checkpoint store, WITH loadBalancingOptions", () => {
        validateOptions = (options) => {
          // When the user doesn't provide a checkpoint store, we always use the UnbalancedLoadBalancingStrategy.
          // The loadBalancingOptions `strategy` and `partitionOwnershipExpirationIntervalInMs` fields are ignored.
          //   - InMemoryCheckpointStore
          //   - UnbalancedLoadBalancingStrategy
          should.not.exist(options.ownerLevel);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "UnbalancedLoadBalancingStrategy"
          );
          options.loopIntervalInMs.should.equal(20);
        };

        client = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          {
            loadBalancingOptions: {
              strategy: "greedy", // ignored
              partitionOwnershipExpirationIntervalInMs: 100, // ignored
              updateIntervalInMs: 20
            }
          }
        );
        (client as any)["_createEventProcessor"] = fakeEventProcessorConstructor;

        client.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store, no loadBalancingOptions", () => {
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
            "BalancedLoadBalancingStrategy"
          );
          (options.loadBalancingStrategy as BalancedLoadBalancingStrategy)[
            "_partitionOwnershipExpirationIntervalInMs"
          ].should.equal(60000);
          options.loopIntervalInMs.should.equal(10000);
        };

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store, WITH loadBalancingOptions (greedy, updateInterval, expirationInterval)", () => {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store and subscribes to all partitions,
          // we use their loadBalancingOptions when provided.
          options.ownerLevel!.should.equal(0);
          should.not.exist(options.processingTarget);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "GreedyLoadBalancingStrategy"
          );
          (options.loadBalancingStrategy as GreedyLoadBalancingStrategy)[
            "_partitionOwnershipExpirationIntervalInMs"
          ].should.equal(100);
          options.loopIntervalInMs.should.equal(20);
        };

        clientWithCheckpointStore = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // it doesn't actually matter _what_ checkpoint store gets passed in
          new InMemoryCheckpointStore(),
          {
            loadBalancingOptions: {
              strategy: "greedy",
              partitionOwnershipExpirationIntervalInMs: 100,
              updateIntervalInMs: 20
            }
          }
        );
        (clientWithCheckpointStore as any)["_createEventProcessor"] = fakeEventProcessorConstructor;

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store, WITH loadBalancingOptions (balanced, updateInterval, expirationInterval)", () => {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store and subscribes to all partitions,
          // we use their loadBalancingOptions when provided.
          options.ownerLevel!.should.equal(0);
          should.not.exist(options.processingTarget);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "BalancedLoadBalancingStrategy"
          );
          (options.loadBalancingStrategy as BalancedLoadBalancingStrategy)[
            "_partitionOwnershipExpirationIntervalInMs"
          ].should.equal(100);
          options.loopIntervalInMs.should.equal(20);
        };

        clientWithCheckpointStore = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // it doesn't actually matter _what_ checkpoint store gets passed in
          new InMemoryCheckpointStore(),
          {
            loadBalancingOptions: {
              strategy: "balanced",
              partitionOwnershipExpirationIntervalInMs: 100,
              updateIntervalInMs: 20
            }
          }
        );
        (clientWithCheckpointStore as any)["_createEventProcessor"] = fakeEventProcessorConstructor;

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store, WITH loadBalancingOptions (updateInterval, expirationInterval)", () => {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store and subscribes to all partitions,
          // we use their loadBalancingOptions when provided.
          options.ownerLevel!.should.equal(0);
          should.not.exist(options.processingTarget);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "BalancedLoadBalancingStrategy"
          );
          (options.loadBalancingStrategy as BalancedLoadBalancingStrategy)[
            "_partitionOwnershipExpirationIntervalInMs"
          ].should.equal(100);
          options.loopIntervalInMs.should.equal(20);
        };

        clientWithCheckpointStore = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // it doesn't actually matter _what_ checkpoint store gets passed in
          new InMemoryCheckpointStore(),
          {
            loadBalancingOptions: {
              // default 'strategy' is 'balanced'
              partitionOwnershipExpirationIntervalInMs: 100,
              updateIntervalInMs: 20
            }
          }
        );
        (clientWithCheckpointStore as any)["_createEventProcessor"] = fakeEventProcessorConstructor;

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store, WITH loadBalancingOptions (strategy)", () => {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store and subscribes to all partitions,
          // we use their loadBalancingOptions when provided.
          options.ownerLevel!.should.equal(0);
          should.not.exist(options.processingTarget);
          options.loadBalancingStrategy.constructor.name.should.equal(
            "GreedyLoadBalancingStrategy"
          );
          (options.loadBalancingStrategy as GreedyLoadBalancingStrategy)[
            "_partitionOwnershipExpirationIntervalInMs"
          ].should.equal(60000);
          options.loopIntervalInMs.should.equal(10000);
        };

        clientWithCheckpointStore = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // it doesn't actually matter _what_ checkpoint store gets passed in
          new InMemoryCheckpointStore(),
          {
            loadBalancingOptions: {
              strategy: "greedy"
              // defaults are used for the rest of the parameters.
            }
          }
        );
        (clientWithCheckpointStore as any)["_createEventProcessor"] = fakeEventProcessorConstructor;

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("multiple subscribe calls from the same eventhubconsumerclient use the same owner ID", async () => {
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
