"use strict";
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const debugModule = require("debug");
const blobLeaseManager_1 = require("./blobLeaseManager");
const blobLease_1 = require("./blobLease");
const partitionContext_1 = require("./partitionContext");
const eventHubClient_1 = require("../eventHubClient");
const events_1 = require("events");
const errors_1 = require("../errors");
const __1 = require("..");
const debug = debugModule("azure:event-hubs:processor:host");
/**
 * Describes the Event Processor Host to process events from an EventHub.
 * @class EventProcessorHost
 */
class EventProcessorHost extends events_1.EventEmitter {
    /**
     * Creates a new host to process events from an Event Hub.
     * @param {string} hostName Name of the processor host. MUST BE UNIQUE. Strongly recommend including a Guid to ensure uniqueness.
     * @param {string} consumerGroup The name of the consumer group within the Event Hub.
     * @param {string} storageConnectionString Connection string to Azure Storage account used for leases and checkpointing. Example DefaultEndpointsProtocol=https;AccountName=<account-name>;AccountKey=<account-key>;EndpointSuffix=core.windows.net
     * @param {EventHubClient} eventHubClient The EventHub client
     * @param {LeaseManager} [LeaseManager] A manager to manage leases. Default: BlobLeaseManager.
     */
    constructor(hostName, consumerGroup, storageConnectionString, eventHubClient, leaseManager) {
        super();
        function ensure(paramName, param, type) {
            if (!param)
                throw new errors_1.ArgumentError(`${paramName} cannot be null or undefined.`);
            if (param) {
                if (typeof param !== type) {
                    throw new errors_1.ArgumentError(`${paramName} must be of type ${type}.`);
                }
            }
        }
        ensure("name", hostName, "string");
        ensure("consumerGroup", consumerGroup, "string");
        ensure("storageConnectionString", storageConnectionString, "string");
        ensure("eventHubClient", eventHubClient, "object");
        this._hostName = hostName;
        this._consumerGroup = consumerGroup;
        this._eventHubClient = eventHubClient;
        this._storageConnectionString = storageConnectionString;
        this._leaseManager = leaseManager || new blobLeaseManager_1.default();
        this._contextByPartition = {};
        this._receiverByPartition = {};
    }
    /**
     * Provides the host name for the Event processor host.
     */
    get hostName() {
        return this._hostName;
    }
    /**
     * Provides the consumer group name for the Event processor host.
     */
    get consumerGroup() {
        return this._consumerGroup;
    }
    /**
     * Provides the eventhub runtime information.
     * @method getHubRuntimeInformation
     * @returns {Promise<EventHubRuntimeInformation>}
     */
    async getHubRuntimeInformation() {
        try {
            return await this._eventHubClient.getHubRuntimeInformation();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Provides information about the specified partition.
     * @method getPartitionInformation
     * @param {(string|number)} partitionId Partition ID for which partition information is required.
     */
    async getPartitionInformation(partitionId) {
        try {
            return await this._eventHubClient.getPartitionInformation(partitionId);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Provides an array of partitionIds.
     * @method getPartitionIds
     * @returns {Promise<string[]>}
     */
    async getPartitionIds() {
        try {
            return this._eventHubClient.getPartitionIds();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Starts the event processor host, fetching the list of partitions, (optionally) filtering them, and attempting
     * to grab leases on the (filtered) set. For each successful lease, will get the details from the blob and start
     * a receiver at the point where it left off previously.
     *
     * @method start
     * @param {function} [partitionFilter]  Predicate that takes a partition ID and return true/false for whether we should
     *  attempt to grab the lease and watch it. If not provided, all partitions will be tried.
     *
     * @return {Promise<EventProcessorHost>}
     */
    async start(partitionFilter) {
        try {
            this._contextByPartition = {};
            this._receiverByPartition = {};
            this._leaseManager.reset();
            this._leaseManager.on(blobLeaseManager_1.default.acquired, (lease) => {
                debug("Acquired lease on " + lease.partitionId);
                this._attachReceiver(lease.partitionId);
            });
            this._leaseManager.on(blobLeaseManager_1.default.lost, (lease) => {
                debug("Lost lease on " + lease.partitionId);
                this._detachReceiver(lease.partitionId, "Lease lost");
            });
            this._leaseManager.on(blobLeaseManager_1.default.released, (lease) => {
                debug("Released lease on " + lease.partitionId);
                this._detachReceiver(lease.partitionId, "Lease released");
            });
            const ids = await this._eventHubClient.getPartitionIds();
            for (let i = 0; i < ids.length; i++) {
                let id = ids[i];
                if (partitionFilter && !partitionFilter(id)) {
                    debug("Skipping partition " + id);
                    continue;
                }
                debug("Managing lease for partition " + id);
                const blobPath = this._consumerGroup + "/" + id;
                const lease = new blobLease_1.default(this._storageConnectionString, this._hostName, blobPath);
                lease.partitionId = id;
                this._contextByPartition[id] = new partitionContext_1.default(id, this._hostName, lease);
                this._leaseManager.manageLease(lease);
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
        return this;
    }
    /**
     * Stops the EventProcessorHost from processing messages.
     * @return {Promise<void>}
     */
    async stop() {
        const unmanage = (l) => { return this._leaseManager.unmanageLease(l); };
        let releases = [];
        for (const partitionId in this._contextByPartition) {
            if (!this._contextByPartition.hasOwnProperty(partitionId))
                continue;
            const id = partitionId;
            const context = this._contextByPartition[id];
            releases.push(this._detachReceiver(id).then(unmanage.bind(undefined, context.lease)));
        }
        return Promise.all(releases).then(() => {
            this._leaseManager.reset();
            this._contextByPartition = {};
        });
    }
    async _attachReceiver(partitionId) {
        const context = this._contextByPartition[partitionId];
        if (!context)
            return Promise.reject(new Error("Invalid state - missing context for partition " + partitionId));
        const checkpoint = await context.updateCheckpointDataFromLease();
        let eventPosition = undefined;
        if (checkpoint && checkpoint.offset) {
            eventPosition = __1.EventPosition.fromOffset(checkpoint.offset);
        }
        const rcvrOptions = { consumerGroup: this._consumerGroup, eventPosition: eventPosition };
        const receiver = await this._eventHubClient.createReceiver(partitionId, rcvrOptions);
        debug(`[${this._eventHubClient.connectionId}] Attaching receiver "${receiver.name}" ` +
            `for partition "${partitionId}" with offset: ${(checkpoint ? checkpoint.offset : "None")}`);
        this.emit(EventProcessorHost.opened, context);
        this._receiverByPartition[partitionId] = receiver;
        receiver.on("message", (eventData) => {
            context.updateCheckpointDataFromEventData(eventData);
            this.emit(EventProcessorHost.message, context, eventData);
        });
        return receiver;
    }
    async _detachReceiver(partitionId, reason) {
        const context = this._contextByPartition[partitionId];
        const receiver = this._receiverByPartition[partitionId];
        if (receiver) {
            delete this._receiverByPartition[partitionId];
            await receiver.close();
            debug(`[${this._eventHubClient.connectionId}] Closed the receiver "${receiver.name}".`);
            this.emit(EventProcessorHost.closed, context, reason);
        }
    }
    /**
     * Convenience method for generating unique host name.
     * @param {string} [prefix] String to use as the beginning of the name. Default value: "js-host".
     * @return {string} A unique host name
     */
    static createHostName(prefix) {
        if (!prefix)
            prefix = "js-host";
        return `${prefix}-${uuid()}`;
    }
    /**
     * Creates a new host to process events from an Event Hub.
     * @param {string} hostName Name of the processor host. MUST BE UNIQUE. Strongly recommend including a Guid to ensure uniqueness.
     * @param {string} consumerGroup The name of the consumer group within the Event Hub.
     * @param {string} storageConnectionString Connection string to Azure Storage account used for leases and checkpointing.
     * Example DefaultEndpointsProtocol=https;AccountName=<account-name>;AccountKey=<account-key>;EndpointSuffix=core.windows.net
     * @param {string} eventHubConnectionString Connection string for the Event Hub to receive from.
     * Example: 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
     * @param {string} [eventHubPath] The name of the EventHub. This is optional if the eventHubConnectionString contains ENTITY_PATH=hub-name.
     * @param {TokenProvider} [tokenProvider] An instance of the token provider that provides the token for authentication.
     * Default value: SasTokenProvider.
     * @param {LeaseManager} [LeaseManager] A manager to manage leases. Default: BlobLeaseManager.
     */
    static createFromConnectionString(hostName, consumerGroup, storageConnectionString, eventHubConnectionString, eventHubPath, tokenProvider, leaseManager) {
        return new EventProcessorHost(hostName, consumerGroup, storageConnectionString, eventHubClient_1.EventHubClient.createFromConnectionString(eventHubConnectionString, eventHubPath, tokenProvider), leaseManager);
    }
    /**
     * Creates a new host to process events from an Event Hub.
     * @method
     * @param {string} hostName Name of the processor host. MUST BE UNIQUE. Strongly recommend including a Guid to ensure uniqueness.
     * @param {string} consumerGroup The name of the consumer group within the Event Hub.
     * @param {string} storageConnectionString Connection string to Azure Storage account used for leases and checkpointing.
     * Example DefaultEndpointsProtocol=https;AccountName=<account-name>;AccountKey=<account-key>;EndpointSuffix=core.windows.net
     * @param {string} namespace Fully qualified domain name for Event Hubs. Example: "{your-sb-namespace}.servicebus.windows.net"
     * @param {string} eventHubPath The name of the EventHub. This is optional if the eventHubConnectionString contains ENTITY_PATH=hub-name.
     * @param {TokenCredentials} credentials - The AAD Token credentials. It can be one of the following:
     * ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials.
     * @param {LeaseManager} [LeaseManager] A manager to manage leases. Default: BlobLeaseManager.
     */
    static createFromAadTokenCredentials(hostName, consumerGroup, storageConnectionString, namespace, eventHubPath, credentials, leaseManager) {
        return new EventProcessorHost(hostName, consumerGroup, storageConnectionString, eventHubClient_1.EventHubClient.createFromAadTokenCredentials(namespace, eventHubPath, credentials), leaseManager);
    }
}
/**
 * Opened: Triggered whenever a partition obtains its lease. Passed the PartitionContext.
 */
EventProcessorHost.opened = "ephost:opened";
/**
 * Triggered whenever a partition loses its lease and has to stop receiving,
 * or when the host is shut down. Passed the PartitionContext and the closing reason.
 */
EventProcessorHost.closed = "ephost:closed";
/**
 * Message: Triggered whenever a message comes in on a given partition.
 * Passed the PartitionContext and EventData.
 */
EventProcessorHost.message = "ephost:message";
exports.default = EventProcessorHost;
