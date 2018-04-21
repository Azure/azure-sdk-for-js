"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugModule = require("debug");
const rhea_promise_1 = require("./rhea-promise");
const ms_rest_azure_1 = require("ms-rest-azure");
const _1 = require(".");
const rpc = require("./rpc");
const connectionContext_1 = require("./connectionContext");
const aad_1 = require("./auth/aad");
const eventHubSender_1 = require("./eventHubSender");
const streamingReceiver_1 = require("./streamingReceiver");
const batchingReceiver_1 = require("./batchingReceiver");
const debug = debugModule("azure:event-hubs:client");
/**
 * @class EventHubClient
 * Describes the EventHub client.
 */
class EventHubClient {
    /**
     * Instantiate a client pointing to the Event Hub given by this configuration.
     *
     * @constructor
     * @param {ConnectionConfig} config - The connection configuration to create the EventHub Client.
     * @param {TokenProvider} [tokenProvider] - The token provider that provides the token for authentication.
     * Default value: SasTokenProvider.
     */
    constructor(config, tokenProvider) {
        this._context = connectionContext_1.ConnectionContext.create(config, tokenProvider);
    }
    /**
     * Closes the AMQP connection to the Event Hub for this client,
     * returning a promise that will be resolved when disconnection is completed.
     * @method close
     * @returns {Promise<any>}
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._context.connection) {
                    // Close all the senders.
                    for (const sender of Object.values(this._context.senders)) {
                        yield sender.close();
                    }
                    // Close all the receivers.
                    for (const receiver of Object.values(this._context.receivers)) {
                        yield receiver.close();
                    }
                    // Close the cbs session;
                    yield this._context.cbsSession.close();
                    // Close the management session
                    yield this._context.managementSession.close();
                    yield rhea_promise_1.closeConnection(this._context.connection);
                    debug("Closed the amqp connection '%s' on the client.", this._context.connectionId);
                    this._context.connection = undefined;
                }
            }
            catch (err) {
                const msg = `An error occurred while closing the connection "${this._context.connectionId}": ${JSON.stringify(err)}`;
                debug(msg);
                throw new Error(msg);
            }
        });
    }
    /**
     * Sends the given message to the EventHub.
     *
     * @method send
     * @param {any} data                    Message to send.  Will be sent as UTF8-encoded JSON string.
     * @param {string|number} [partitionId] Partition ID to which the event data needs to be sent. This should only be specified
     * if you intend to send the event to a specific partition. When not specified EventHub will store the messages in a round-robin
     * fashion amongst the different partitions in the EventHub.
     *
     * @returns {Promise<Delivery>} Promise<rheaPromise.Delivery>
     */
    send(data, partitionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sender = eventHubSender_1.EventHubSender.create(this._context, partitionId);
            return yield sender.send(data);
        });
    }
    /**
     * Send a batch of EventData to the EventHub. The "message_annotations", "application_properties" and "properties"
     * of the first message will be set as that of the envelope (batch message).
     *
     * @method sendBatch
     * @param {Array<EventData>} datas  An array of EventData objects to be sent in a Batch message.
     * @param {string|number} [partitionId] Partition ID to which the event data needs to be sent. This should only be specified
     * if you intend to send the event to a specific partition. When not specified EventHub will store the messages in a round-robin
     * fashion amongst the different partitions in the EventHub.
     *
     * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    sendBatch(datas, partitionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sender = eventHubSender_1.EventHubSender.create(this._context, partitionId);
            return yield sender.sendBatch(datas);
        });
    }
    /**
     * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session. Messages will be passed to
     * the provided onMessage handler and error will be passes to the provided onError handler.
     *
     * @param {string|number} partitionId                        Partition ID from which to receive.
     * @param {OnMessage} onMessage                              The message handler to receive event data objects.
     * @param {OnError} onError                                  The error handler to receive an error that occurs
     * while receiving messages.
     * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
     * @param {string} [name]                                    The name of the receiver. If not provided
     * then we will set a GUID by default.
     * @param {string} [options.consumerGroup]                   Consumer group from which to receive.
     * @param {number} [options.prefetchCount]                   The upper limit of events this receiver will
     * actively receive regardless of whether a receive operation is pending.
     * @param {boolean} [options.enableReceiverRuntimeMetric]    Provides the approximate receiver runtime information
     * for a logical partition of an Event Hub if the value is true. Default false.
     * @param {number} [options.epoch]                           The epoch value that this receiver is currently
     * using for partition ownership. A value of undefined means this receiver is not an epoch-based receiver.
     * @param {EventPosition} [options.eventPosition]            The position of EventData in the EventHub parition from
     * where the receiver should start receiving. Only one of offset, sequenceNumber, enqueuedTime, customFilter can be specified.
     * `EventPosition.withCustomFilter()` should be used if you want more fine-grained control of the filtering.
     * See https://github.com/Azure/amqpnetlite/wiki/Azure%20Service%20Bus%20Event%20Hubs for details.
     *
     * @returns {ReceiveHandler} ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
     */
    receiveOnMessage(partitionId, onMessage, onError, options) {
        if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
            throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
        }
        const sReceiver = streamingReceiver_1.StreamingReceiver.create(this._context, partitionId, options);
        this._context.receivers[sReceiver.name] = sReceiver;
        sReceiver.receiveOnMessage(onMessage, onError);
        return new streamingReceiver_1.ReceiveHandler(sReceiver);
    }
    /**
     * Receives a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
     * happens first. This method can be used directly after creating the receiver object and **MUST NOT** be used along with the `start()` method.
     *
     * @param {string|number} partitionId                        Partition ID from which to receive.
     * @param {number} maxMessageCount                           The maximum message count. Must be a value greater than 0.
     * @param {number} [maxWaitTimeInSeconds]                    The maximum wait time in seconds for which the Receiver should wait
     * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
     * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
     * @param {string} [name]                                    The name of the receiver. If not provided
     * then we will set a GUID by default.
     * @param {string} [options.consumerGroup]                   Consumer group from which to receive.
     * @param {number} [options.prefetchCount]                   The upper limit of events this receiver will
     * actively receive regardless of whether a receive operation is pending.
     * @param {boolean} [options.enableReceiverRuntimeMetric]    Provides the approximate receiver runtime information
     * for a logical partition of an Event Hub if the value is true. Default false.
     * @param {number} [options.epoch]                           The epoch value that this receiver is currently
     * using for partition ownership. A value of undefined means this receiver is not an epoch-based receiver.
     * @param {EventPosition} [options.eventPosition]            The position of EventData in the EventHub parition from
     * where the receiver should start receiving. Only one of offset, sequenceNumber, enqueuedTime, customFilter can be specified.
     * `EventPosition.withCustomFilter()` should be used if you want more fine-grained control of the filtering.
     * See https://github.com/Azure/amqpnetlite/wiki/Azure%20Service%20Bus%20Event%20Hubs for details.
     *
     * @returns {Promise<EventData[]>} A promise that resolves with an array of EventData objects.
     */
    receiveBatch(partitionId, maxMessageCount, maxWaitTimeInSeconds, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
                throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
            }
            const bReceiver = batchingReceiver_1.BatchingReceiver.create(this._context, partitionId, options);
            let error;
            let result = [];
            try {
                result = yield bReceiver.receive(maxMessageCount, maxWaitTimeInSeconds);
            }
            catch (err) {
                error = err;
                debug("[%s] Receiver '%s', an error occurred while receiving %d messages for %d max time:\n %O", this._context.connectionId, bReceiver.name, maxMessageCount, maxWaitTimeInSeconds, err);
            }
            try {
                yield bReceiver.close();
            }
            catch (err) {
                // do nothing about it.
            }
            if (error) {
                throw error;
            }
            return result;
        });
    }
    /**
     * Provides the eventhub runtime information.
     * @method getHubRuntimeInformation
     * @returns {Promise<EventHubRuntimeInformation>}
     */
    getHubRuntimeInformation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield rpc.open(this._context);
                return yield this._context.managementSession.getHubRuntimeInformation(this._context.connection);
            }
            catch (err) {
                debug("An error occurred while getting the hub runtime information: %O", err);
                throw err;
            }
        });
    }
    /**
     * Provides an array of partitionIds.
     * @method getPartitionIds
     * @returns {Promise<Array<string>>}
     */
    getPartitionIds() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const runtimeInfo = yield this.getHubRuntimeInformation();
                return runtimeInfo.partitionIds;
            }
            catch (err) {
                debug("An error occurred while getting the partition ids: %O", err);
                throw err;
            }
        });
    }
    /**
     * Provides information about the specified partition.
     * @method getPartitionInformation
     * @param {(string|number)} partitionId Partition ID for which partition information is required.
     */
    getPartitionInformation(partitionId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
                throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
            }
            try {
                yield rpc.open(this._context);
                return yield this._context.managementSession.getPartitionInformation(this._context.connection, partitionId);
            }
            catch (err) {
                debug("An error occurred while getting the partition information: %O", err);
                throw err;
            }
        });
    }
    /**
     * Creates an EventHub Client from connection string.
     * @method createFromConnectionString
     * @param {string} connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
     * @param {string} [path] - EventHub path of the form 'my-event-hub-name'
     * @param {TokenProvider} [tokenProvider] - An instance of the token provider that provides the token for authentication. Default value: SasTokenProvider.
     * @returns {EventHubClient} - An instance of the eventhub client.
     */
    static createFromConnectionString(connectionString, path, tokenProvider) {
        if (!connectionString || (connectionString && typeof connectionString !== "string")) {
            throw new Error("'connectionString' is a required parameter and must be of type: 'string'.");
        }
        const config = _1.ConnectionConfig.create(connectionString, path);
        if (!config.entityPath) {
            throw new Error(`Either the connectionString must have "EntityPath=<path-to-entity>" or you must provide "path", while creating the client`);
        }
        return new EventHubClient(config, tokenProvider);
    }
    /**
     * Creates an EventHub Client from AADTokenCredentials.
     * @method
     * @param {string} host - Fully qualified domain name for Event Hubs. Most likely, {yournamespace}.servicebus.windows.net
     * @param {string} entityPath - EventHub path of the form 'my-event-hub-name'
     * @param {TokenCredentials} credentials - The AAD Token credentials. It can be one of the following: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials.
     */
    static createFromAadTokenCredentials(host, entityPath, credentials) {
        if (!host || (host && typeof host !== "string")) {
            throw new Error("'host' is a required parameter and must be of type: 'string'.");
        }
        if (!entityPath || (entityPath && typeof entityPath !== "string")) {
            throw new Error("'entityPath' is a required parameter and must be of type: 'string'.");
        }
        if (!credentials ||
            !(credentials instanceof ms_rest_azure_1.ApplicationTokenCredentials ||
                credentials instanceof ms_rest_azure_1.UserTokenCredentials ||
                credentials instanceof ms_rest_azure_1.DeviceTokenCredentials ||
                credentials instanceof ms_rest_azure_1.MSITokenCredentials)) {
            throw new Error("'credentials' is a required parameter and must be an instance of ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials.");
        }
        if (!host.endsWith("/"))
            host += "/";
        const connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue`;
        const tokenProvider = new aad_1.AadTokenProvider(credentials);
        return EventHubClient.createFromConnectionString(connectionString, entityPath, tokenProvider);
    }
}
exports.EventHubClient = EventHubClient;
//# sourceMappingURL=eventHubClient.js.map