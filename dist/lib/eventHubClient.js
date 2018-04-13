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
const os = require("os");
const process = require("process");
const debugModule = require("debug");
const rheaPromise = require("./rhea-promise");
const Constants = require("./util/constants");
const ms_rest_azure_1 = require("ms-rest-azure");
const _1 = require(".");
const sas_1 = require("./auth/sas");
const aad_1 = require("./auth/aad");
const managementClient_1 = require("./managementClient");
const cbs_1 = require("./cbs");
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
        this.userAgent = "/js-event-hubs";
        _1.ConnectionConfig.validate(config);
        if (!tokenProvider) {
            tokenProvider = new sas_1.SasTokenProvider(config.endpoint, config.sharedAccessKeyName, config.sharedAccessKey);
        }
        this._context = {
            config: config,
            tokenProvider: tokenProvider,
            cbsSession: new cbs_1.CbsClient(),
            managementSession: new managementClient_1.ManagementClient(config.entityPath),
            senders: {},
            receivers: {}
        };
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
                    yield rheaPromise.closeConnection(this._context.connection);
                    debug(`Closed the amqp connection "${this._context.connectionId}" on the client.`);
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
     * Creates a sender to the given event hub, and optionally to a given partition.
     * @method createSender
     * @param {(string|number)} [partitionId] Partition ID to which it will send event data.
     * @returns {Promise<EventHubSender>}
     */
    createSender(partitionId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number") {
                throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
            }
            try {
                // Establish the amqp connection if it does not exist.
                yield this._open();
                const ehSender = new _1.EventHubSender(this._context, partitionId);
                // Initialize the sender.
                yield ehSender.init();
                this._context.senders[ehSender.name] = ehSender;
                return ehSender;
            }
            catch (err) {
                debug("An error occurred while creating the sender: %O", err);
                throw (err);
            }
        });
    }
    /**
     * Creates a new receiver that will receive event data from the EventHub.
     * @method createReceiver
     * @param {string|number} partitionId                        Partition ID from which to receive.
     * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
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
     */
    createReceiver(partitionId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
                throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
            }
            try {
                // Establish the amqp connection if it does not exist.
                yield this._open();
                const ehReceiver = new _1.EventHubReceiver(this._context, partitionId, options);
                // Initialize the receiver.
                yield ehReceiver.init();
                this._context.receivers[ehReceiver.name] = ehReceiver;
                return ehReceiver;
            }
            catch (err) {
                debug("An error occurred while creating the receiver: %O", err);
                throw (err);
            }
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
                yield this._open();
                return yield this._context.managementSession.getHubRuntimeInformation(this._context.connection);
            }
            catch (err) {
                debug("An error occurred while getting the hub runtime information: %O", err);
                throw (err);
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
                throw (err);
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
                yield this._open();
                return yield this._context.managementSession.getPartitionInformation(this._context.connection, partitionId);
            }
            catch (err) {
                debug("An error occurred while getting the partition information: %O", err);
                throw (err);
            }
        });
    }
    /**
     * Opens the AMQP connection to the Event Hub for this client, returning a promise
     * that will be resolved when the connection is completed.
     * @method open
     *
     * @param {boolean} [useSaslPlain] - True for using sasl plain mode for authentication, false otherwise.
     * @returns {Promise<void>}
     */
    _open(useSaslPlain) {
        return __awaiter(this, void 0, void 0, function* () {
            if (useSaslPlain && typeof useSaslPlain !== "boolean") {
                throw new Error("'useSaslPlain' must be of type 'boolean'.");
            }
            if (!this._context.connection) {
                const connectOptions = {
                    transport: Constants.TLS,
                    host: this._context.config.host,
                    hostname: this._context.config.host,
                    username: this._context.config.sharedAccessKeyName,
                    port: 5671,
                    reconnect_limit: Constants.reconnectLimit,
                    properties: {
                        product: "MSJSClient",
                        version: Constants.packageJsonInfo.version || "0.1.0",
                        platform: `(${os.arch()}-${os.type()}-${os.release()})`,
                        framework: `Node/${process.version}`,
                        "user-agent": this.userAgent
                    }
                };
                if (useSaslPlain) {
                    connectOptions.password = this._context.config.sharedAccessKey;
                }
                debug(`Dialing the amqp connection with options.`, connectOptions);
                this._context.connection = yield rheaPromise.connect(connectOptions);
                this._context.connectionId = this._context.connection.options.id;
                this.connectionId = this._context.connectionId;
                debug(`Successfully established the amqp connection "${this._context.connectionId}".`);
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