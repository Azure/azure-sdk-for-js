// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { EventProcessor } from "./eventProcessor.js";
import { createConnectionContext } from "./connectionContext.js";
import { BalancedLoadBalancingStrategy } from "./loadBalancerStrategies/balancedStrategy.js";
import { Constants } from "@azure/core-amqp";
import { GreedyLoadBalancingStrategy } from "./loadBalancerStrategies/greedyStrategy.js";
import { InMemoryCheckpointStore } from "./inMemoryCheckpointStore.js";
import { PartitionGate } from "./impl/partitionGate.js";
import { UnbalancedLoadBalancingStrategy } from "./loadBalancerStrategies/unbalancedStrategy.js";
import { isCredential } from "./util/typeGuards.js";
import { logger } from "./logger.js";
import { validateEventPositions } from "./eventPosition.js";
import { getRandomName } from "./util/utils.js";
const defaultConsumerClientOptions = {
    // to support our current "process single event only" workflow we'll also purposefully
    // only request a single event at a time.
    maxBatchSize: 1,
    maxWaitTimeInSeconds: 60,
};
/**
 * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
 *
 * There are multiple ways to create an `EventHubConsumerClient`
 * - Use the connection string from the SAS policy created for your Event Hub instance.
 * - Use the connection string from the SAS policy created for your Event Hub namespace,
 * and the name of the Event Hub instance
 * - Use the full namespace like `<yournamespace>.servicebus.windows.net`, and a credentials object.
 *
 * Optionally, you can also pass:
 * - An options bag to configure the retry policy or proxy settings.
 * - A checkpoint store that is used by the client to read checkpoints to determine the position from where it should
 * resume receiving events when your application gets restarted. The checkpoint store is also used by the client
 * to load balance multiple instances of your application.
 */
export class EventHubConsumerClient {
    /**
     * @readonly
     * The name of the Event Hub instance for which this client is created.
     */
    get eventHubName() {
        return this._context.config.entityPath;
    }
    /**
     * @readonly
     * The fully qualified namespace of the Event Hub instance for which this client is created.
     * This is likely to be similar to <yournamespace>.servicebus.windows.net.
     */
    get fullyQualifiedNamespace() {
        return this._context.config.host;
    }
    constructor(_consumerGroup, connectionStringOrFullyQualifiedNamespace2, checkpointStoreOrEventHubNameOrOptions3, checkpointStoreOrCredentialOrOptions4, checkpointStoreOrOptions5, options6) {
        var _a, _b;
        this._consumerGroup = _consumerGroup;
        this._partitionGate = new PartitionGate();
        /**
         * The Subscriptions that were spawned by calling `subscribe()`.
         * Subscriptions that have been stopped by the user will not
         * be present in this set.
         */
        this._subscriptions = new Set();
        if (isCredential(checkpointStoreOrCredentialOrOptions4)) {
            // #3 or 3.1
            logger.info("Creating EventHubConsumerClient with TokenCredential.");
            if (isCheckpointStore(checkpointStoreOrOptions5)) {
                // 3.1
                this._checkpointStore = checkpointStoreOrOptions5;
                this._userChoseCheckpointStore = true;
                this._clientOptions = options6 || {};
            }
            else {
                this._checkpointStore = new InMemoryCheckpointStore();
                this._userChoseCheckpointStore = false;
                this._clientOptions = checkpointStoreOrOptions5 || {};
            }
            this._context = createConnectionContext(connectionStringOrFullyQualifiedNamespace2, checkpointStoreOrEventHubNameOrOptions3, checkpointStoreOrCredentialOrOptions4, this._clientOptions);
        }
        else if (typeof checkpointStoreOrEventHubNameOrOptions3 === "string") {
            // #2 or 2.1
            logger.info("Creating EventHubConsumerClient with connection string and event hub name.");
            if (isCheckpointStore(checkpointStoreOrCredentialOrOptions4)) {
                // 2.1
                this._checkpointStore = checkpointStoreOrCredentialOrOptions4;
                this._userChoseCheckpointStore = true;
                this._clientOptions = checkpointStoreOrOptions5 || {};
            }
            else {
                // 2
                this._checkpointStore = new InMemoryCheckpointStore();
                this._userChoseCheckpointStore = false;
                this._clientOptions = checkpointStoreOrCredentialOrOptions4 || {};
            }
            this._context = createConnectionContext(connectionStringOrFullyQualifiedNamespace2, checkpointStoreOrEventHubNameOrOptions3, this._clientOptions);
        }
        else {
            // #1 or 1.1
            logger.info("Creating EventHubConsumerClient with connection string.");
            if (isCheckpointStore(checkpointStoreOrEventHubNameOrOptions3)) {
                // 1.1
                this._checkpointStore = checkpointStoreOrEventHubNameOrOptions3;
                this._userChoseCheckpointStore = true;
                this._clientOptions =
                    checkpointStoreOrCredentialOrOptions4 || {};
            }
            else {
                // 1
                this._checkpointStore = new InMemoryCheckpointStore();
                this._userChoseCheckpointStore = false;
                this._clientOptions =
                    checkpointStoreOrEventHubNameOrOptions3 || {};
            }
            this._context = createConnectionContext(connectionStringOrFullyQualifiedNamespace2, this._clientOptions);
        }
        this.identifier = (_a = this._clientOptions.identifier) !== null && _a !== void 0 ? _a : getRandomName();
        this._loadBalancingOptions = Object.assign({ 
            // default options
            strategy: "balanced", updateIntervalInMs: 10000, partitionOwnershipExpirationIntervalInMs: 60000 }, (_b = this._clientOptions) === null || _b === void 0 ? void 0 : _b.loadBalancingOptions);
    }
    /**
     * Closes the AMQP connection to the Event Hub instance,
     * returning a promise that will be resolved when disconnection is completed.
     * @returns Promise<void>
     * @throws Error if the underlying connection encounters an error while closing.
     */
    async close() {
        // Stop all the actively running subscriptions.
        const activeSubscriptions = Array.from(this._subscriptions);
        await Promise.all(activeSubscriptions.map((subscription) => {
            return subscription.close();
        }));
        // Close the connection via the connection context.
        return this._context.close();
    }
    /**
     * Provides the id for each partition associated with the Event Hub.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with an Array of strings representing the id for
     * each partition associated with the Event Hub.
     * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getPartitionIds(options = {}) {
        return this._context
            .managementSession.getEventHubProperties(Object.assign(Object.assign({}, options), { retryOptions: this._clientOptions.retryOptions }))
            .then((eventHubProperties) => {
            return eventHubProperties.partitionIds;
        });
    }
    /**
     * Provides information about the state of the specified partition.
     * @param partitionId - The id of the partition for which information is required.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with information about the state of the partition .
     * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getPartitionProperties(partitionId, options = {}) {
        return this._context.managementSession.getPartitionProperties(partitionId, Object.assign(Object.assign({}, options), { retryOptions: this._clientOptions.retryOptions }));
    }
    /**
     * Provides the Event Hub runtime information.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with information about the Event Hub instance.
     * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getEventHubProperties(options = {}) {
        return this._context.managementSession.getEventHubProperties(Object.assign(Object.assign({}, options), { retryOptions: this._clientOptions.retryOptions }));
    }
    subscribe(handlersOrPartitionId1, optionsOrHandlers2, possibleOptions3) {
        let eventProcessor;
        let targetedPartitionId;
        if (isSubscriptionEventHandlers(handlersOrPartitionId1)) {
            // #1: subscribe overload - read from all partitions
            const options = optionsOrHandlers2;
            if (options && options.startPosition) {
                validateEventPositions(options.startPosition);
            }
            ({ targetedPartitionId, eventProcessor } = this.createEventProcessorForAllPartitions(handlersOrPartitionId1, options));
        }
        else if (isSubscriptionEventHandlers(optionsOrHandlers2)) {
            // #2: subscribe overload (read from specific partition IDs), don't coordinate
            const options = possibleOptions3;
            if (options && options.startPosition) {
                validateEventPositions(options.startPosition);
            }
            ({ targetedPartitionId, eventProcessor } = this.createEventProcessorForSinglePartition(
            // cast to string as downstream code expects partitionId to be string, but JS users could have given us anything.
            // we don't validate the user input and instead rely on service throwing errors if any
            String(handlersOrPartitionId1), optionsOrHandlers2, possibleOptions3));
        }
        else {
            throw new TypeError("Unhandled subscribe() overload");
        }
        eventProcessor.start();
        const subscription = {
            get isRunning() {
                return eventProcessor.isRunning();
            },
            close: () => {
                this._partitionGate.remove(targetedPartitionId);
                this._subscriptions.delete(subscription);
                return eventProcessor.stop();
            },
        };
        this._subscriptions.add(subscription);
        return subscription;
    }
    /**
     * Gets the LoadBalancing strategy that should be used based on what the user provided.
     */
    _getLoadBalancingStrategy() {
        var _a;
        if (!this._userChoseCheckpointStore) {
            // The default behavior when a checkpointstore isn't provided
            // is to always grab all the partitions.
            return new UnbalancedLoadBalancingStrategy();
        }
        const partitionOwnershipExpirationIntervalInMs = this._loadBalancingOptions.partitionOwnershipExpirationIntervalInMs;
        if (((_a = this._loadBalancingOptions) === null || _a === void 0 ? void 0 : _a.strategy) === "greedy") {
            return new GreedyLoadBalancingStrategy(partitionOwnershipExpirationIntervalInMs);
        }
        // The default behavior when a checkpointstore is provided is
        // to grab one partition at a time.
        return new BalancedLoadBalancingStrategy(partitionOwnershipExpirationIntervalInMs);
    }
    createEventProcessorForAllPartitions(subscriptionEventHandlers, options) {
        this._partitionGate.add("all");
        if (this._userChoseCheckpointStore) {
            logger.verbose("EventHubConsumerClient subscribing to all partitions, using a checkpoint store.");
        }
        else {
            logger.verbose("EventHubConsumerClient subscribing to all partitions, no checkpoint store.");
        }
        const loadBalancingStrategy = this._getLoadBalancingStrategy();
        const eventProcessor = this._createEventProcessor(this._context, subscriptionEventHandlers, this._checkpointStore, Object.assign(Object.assign(Object.assign({}, defaultConsumerClientOptions), options), { ownerLevel: getOwnerLevel(options, this._userChoseCheckpointStore), 
            // make it so all the event processors process work with the same overarching owner ID
            // this allows the EventHubConsumer to unify all the work for any processors that it spawns
            ownerId: this.identifier, retryOptions: this._clientOptions.retryOptions, loadBalancingStrategy, loopIntervalInMs: this._loadBalancingOptions.updateIntervalInMs }));
        return { targetedPartitionId: "all", eventProcessor };
    }
    createEventProcessorForSinglePartition(partitionId, eventHandlers, options) {
        var _a;
        this._partitionGate.add(partitionId);
        const subscribeOptions = options;
        if (this._userChoseCheckpointStore) {
            logger.verbose(`EventHubConsumerClient subscribing to specific partition (${partitionId}), using a checkpoint store.`);
        }
        else {
            logger.verbose(`EventHubConsumerClient subscribing to specific partition (${partitionId}), no checkpoint store.`);
        }
        const eventProcessor = this._createEventProcessor(this._context, eventHandlers, this._checkpointStore, Object.assign(Object.assign(Object.assign({}, defaultConsumerClientOptions), options), { processingTarget: partitionId, ownerLevel: getOwnerLevel(subscribeOptions, this._userChoseCheckpointStore), retryOptions: this._clientOptions.retryOptions, loadBalancingStrategy: new UnbalancedLoadBalancingStrategy(), loopIntervalInMs: (_a = this._loadBalancingOptions.updateIntervalInMs) !== null && _a !== void 0 ? _a : 10000 }));
        return { targetedPartitionId: partitionId, eventProcessor };
    }
    _createEventProcessor(connectionContext, subscriptionEventHandlers, checkpointStore, options) {
        return new EventProcessor(this._consumerGroup, connectionContext, subscriptionEventHandlers, checkpointStore, options);
    }
}
/**
 * The name of the default consumer group in the Event Hubs service.
 */
EventHubConsumerClient.defaultConsumerGroupName = Constants.defaultConsumerGroup;
/**
 * @internal
 */
export function isCheckpointStore(possible) {
    if (!possible) {
        return false;
    }
    const checkpointStore = possible;
    return (typeof checkpointStore.claimOwnership === "function" &&
        typeof checkpointStore.listCheckpoints === "function" &&
        typeof checkpointStore.listOwnership === "function" &&
        typeof checkpointStore.updateCheckpoint === "function");
}
/**
 * @internal
 */
function isSubscriptionEventHandlers(possible) {
    return typeof possible.processEvents === "function";
}
function getOwnerLevel(options, userChoseCheckpointStore) {
    if (options && options.ownerLevel) {
        return options.ownerLevel;
    }
    if (userChoseCheckpointStore) {
        return 0;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=eventHubConsumerClient.js.map