"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockEventHub = void 0;
const tslib_1 = require("tslib");
const rhea_1 = tslib_1.__importDefault(require("rhea"));
const mockServer_js_1 = require("../server/mockServer.js");
const partitionInfo_js_1 = require("../messages/event-hubs/partitionInfo.js");
const runtimeInfo_js_1 = require("../messages/event-hubs/runtimeInfo.js");
const messageStore_js_1 = require("../storage/messageStore.js");
const streamingPartitionSender_js_1 = require("../sender/streamingPartitionSender.js");
const cbsAccepted_js_1 = require("../messages/cbs/cbsAccepted.js");
const eventPosition_js_1 = require("../utils/eventPosition.js");
/**
 * `MockEventHub` represents a mock EventHubs service.
 *
 * It stores events in memory and does not perform any auth verification.
 */
class MockEventHub {
    /**
     * The Event Hub's partition ids.
     */
    get partitionIds() {
        const partitionIds = [];
        for (let i = 0; i < this._partitionCount; i++) {
            partitionIds.push(`${i}`);
        }
        return partitionIds;
    }
    /**
     * The full Set of consumer groups the Event Hub supports.
     */
    get consumerGroups() {
        return new Set(["$default", ...this._consumerGroups]);
    }
    /**
     * The port number the service is listening on.
     * Returns `-1` if the service is not currently listening.
     */
    get port() {
        return this._mockServer.port;
    }
    /**
     * Instantiates a `MockEventHub` using the provided options.
     * @param options - The options to instantiate the MockEventHub with.
     */
    constructor(options) {
        var _a, _b, _c;
        /**
         * When the EventHub was 'created'.
         */
        this._createdOn = new Date();
        /**
         * Any additional consumer groups (beyond `$default`) the Event Hub supports.
         */
        this._consumerGroups = [];
        /**
         * The `MessageStore` that stores messages sent by clients to the Event Hub.
         */
        this._messageStore = new messageStore_js_1.MessageStore();
        /**
         * This provides convenient access to a `Sender`'s `StreamingPartitionSender`
         * so that we can stop it when a `Sender` is closed.
         */
        this._streamingPartitionSenderMap = new Map();
        this._connections = new Set();
        this._clearableTimeouts = new Set();
        /**
         * This provides a way to find all the partition senders for a combination
         * of `consumerGroup` and `partitionId`.
         *
         * This is needed to support `ownerLevel` (epoch).
         */
        this._consumerGroupPartitionSenderMap = new Map();
        this._handleConnectionInactivity = (connection) => {
            if (!this._connectionInactivityTimeoutInMs) {
                return;
            }
            const forceCloseConnection = () => {
                connection.close({
                    condition: "amqp:connection:forced",
                    description: `The connection was inactive for more than the allowed ${this._connectionInactivityTimeoutInMs} milliseconds and is closed by the service.`,
                });
            };
            let tid = setTimeout(forceCloseConnection, this._connectionInactivityTimeoutInMs);
            this._clearableTimeouts.add(tid);
            const bounceTimeout = () => {
                clearTimeout(tid);
                this._clearableTimeouts.delete(tid);
                tid = setTimeout(forceCloseConnection, this._connectionInactivityTimeoutInMs);
                this._clearableTimeouts.add(tid);
            };
            connection.addListener(rhea_1.default.ConnectionEvents.settled, bounceTimeout);
            connection.addListener(rhea_1.default.SenderEvents.senderFlow, bounceTimeout);
            connection.addListener(rhea_1.default.SenderEvents.settled, bounceTimeout);
            connection.addListener(rhea_1.default.ReceiverEvents.receiverFlow, bounceTimeout);
            connection.addListener(rhea_1.default.ReceiverEvents.settled, bounceTimeout);
        };
        /**
         * The event handler for when the service creates a `Receiver` link.
         *
         * This is done in response to the client opening a `Sender` link.
         * @param event -
         */
        this._handleReceiverOpen = (event) => {
            event.receiver.set_source(event.receiver.source);
            event.receiver.set_target(event.receiver.target);
            if (this._isReceiverPartitionEntityPath(event.entityPath)) {
                // Handle the case where the client is creating a partition-specific sender.
                const entityComponents = this._parseReceiverPartitionEntityPath(event.entityPath);
                if (!entityComponents) {
                    return;
                }
                const partitionId = entityComponents.partitionId;
                // Validate that the partition the client's sender is targetting exists.
                if (!this.partitionIds.includes(partitionId)) {
                    return event.receiver.close({
                        condition: "com.microsoft:argument-out-of-range",
                        description: "The specified partition is invalid for an EventHub partition sender or receiver.",
                    });
                }
            }
        };
        /**
         * The event handler for when the service creates a `Sender` link.
         *
         * This is done in response to the client opening a `Receiver` link.
         * @param event -
         */
        this._handleSenderOpen = (event) => {
            var _a, _b, _c;
            event.sender.set_source(event.sender.source);
            event.sender.set_target(event.sender.target);
            if (event.entityPath === "$cbs") {
                // We don't need to do anything special when opening a $cbs sender.
            }
            else if (event.entityPath === "$management") {
                // We don't need to do anything special when opening a $management sender.
            }
            else if (this._isSenderPartitionEntityPath(event.entityPath)) {
                // Handle partition-specific senders (e.g. /eventHubName/ConsumerGroups/$default/Partitions/0)
                const entityComponents = this._parseSenderPartitionEntityPath(event.entityPath);
                if (!entityComponents) {
                    return;
                }
                // Ensure the resource the sender is sourced from exists.
                if (!this._handlePartitionSenderOpenValidation(entityComponents, event.sender, event.context)) {
                    return;
                }
                // Ensure the sender is allowed to exist based on the ownerLevel of existing senders.
                if (!this._handleSenderOwnerLevel(entityComponents.consumerGroup, entityComponents.partitionId, event.sender)) {
                    return;
                }
                const desiredCapabilities = Array.isArray(event.sender.desired_capabilities)
                    ? event.sender.desired_capabilities
                    : [event.sender.desired_capabilities];
                // Check if we need to include runtime metrics on events we send to the client.
                const enableRuntimeMetric = desiredCapabilities.includes("com.microsoft:enable-receiver-runtime-metric");
                // Get the starting position from which to start reading events.
                const sourceFilter = (_c = (_b = (_a = event.sender.source.filter) === null || _a === void 0 ? void 0 : _a["apache.org:selector-filter:string"]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : "";
                try {
                    const startPosition = (0, eventPosition_js_1.getEventPosition)(sourceFilter);
                    const streamingPartitionSender = new streamingPartitionSender_js_1.StreamingPartitionSender(this._messageStore, event.sender, entityComponents.partitionId, startPosition, enableRuntimeMetric);
                    this._streamingPartitionSenderMap.set(event.sender, streamingPartitionSender);
                    streamingPartitionSender.start();
                    this._storePartitionSender(entityComponents.consumerGroup, entityComponents.partitionId, event.sender);
                }
                catch (err) {
                    // Probably should close the sender at this point.
                    event.sender.close({
                        condition: "amqp:internal-error",
                        description: err instanceof Error ? err.message : "",
                    });
                }
            }
        };
        /**
         * The event handler for when the service closes a `Sender` link.
         *
         * This is done in response to the client closing a `Receiver` link,
         * or the service closing the `Sender` link.
         * @param event -
         */
        this._handleSenderClose = (event) => {
            if (this._isSenderPartitionEntityPath(event.entityPath)) {
                // Handles partition-specific senders.
                const entityComponents = this._parseSenderPartitionEntityPath(event.entityPath);
                const streamingPartitionSender = this._streamingPartitionSenderMap.get(event.sender);
                this._streamingPartitionSenderMap.delete(event.sender);
                if (streamingPartitionSender) {
                    streamingPartitionSender.stop();
                }
                if (entityComponents) {
                    this._deletePartitionSender(entityComponents.consumerGroup, entityComponents.partitionId, event.sender);
                }
            }
        };
        /**
         * The event handler for when the service closes a connection.
         *
         * This is done when a client explicitly closes or is disconnected.
         * @param event -
         */
        this._handleConnectionClose = (event) => {
            // Cleanup the partition senders we might have for this connection.
            // We'll just do brute force for now and optimize later.
            for (const [, partitionMap] of this._consumerGroupPartitionSenderMap) {
                for (const [, senders] of partitionMap) {
                    for (const sender of senders) {
                        if (sender.connection === event.context.connection) {
                            senders.delete(sender);
                        }
                    }
                }
            }
            // Ensure any `StreamingPartitionSender`s associated with the connection are stopped.
            for (const [sender, streamingSender] of this._streamingPartitionSenderMap) {
                if (sender.connection === event.context.connection) {
                    this._streamingPartitionSenderMap.delete(sender);
                    if (streamingSender) {
                        streamingSender.stop();
                    }
                }
            }
        };
        /**
         * The event handler for when the service receives a message.
         *
         * Messages are not automatically accepted/rejected.
         * @param event -
         */
        this._handleOnMessages = (event) => {
            var _a, _b;
            // Handle batched messages first.
            if (event.entityPath === this._name) {
                // received a message without a partition id
                return this._handleReceivedMessage(event);
            }
            else if (this._isReceiverPartitionEntityPath(event.entityPath)) {
                // received a message targetted at a partition id
                const entityComponents = this._parseReceiverPartitionEntityPath(event.entityPath);
                if (!entityComponents) {
                    return;
                }
                return this._handleReceivedMessage(event, entityComponents.partitionId);
            }
            // Handle individual messages.
            for (const message of event.messages) {
                if (event.entityPath === "$cbs") {
                    return this._handleCbsMessage(event, message);
                }
                else if ((0, runtimeInfo_js_1.isHubRuntimeInfo)(event.entityPath, message)) {
                    return this._handleHubRuntimeInfoMessage(event, message);
                }
                else if ((0, partitionInfo_js_1.isPartitionInfo)(event.entityPath, message)) {
                    return this._handlePartitionInfoMessage(event, message);
                }
                else if (this._isSenderPartitionEntityPath(event.entityPath)) {
                    const entityComponents = this._parseSenderPartitionEntityPath(event.entityPath);
                    // Handle links to partitions
                    if (!entityComponents) {
                        return;
                    }
                    (_a = event.context.delivery) === null || _a === void 0 ? void 0 : _a.accept();
                    return;
                }
                else {
                    // Accept other messages my default.
                    (_b = event.context.delivery) === null || _b === void 0 ? void 0 : _b.accept();
                }
            }
        };
        this._partitionCount = (_a = options.partitionCount) !== null && _a !== void 0 ? _a : 2;
        this._name = options.name;
        this._consumerGroups = (_b = options.consumerGroups) !== null && _b !== void 0 ? _b : [];
        this._connectionInactivityTimeoutInMs = (_c = options.connectionInactivityTimeoutInMs) !== null && _c !== void 0 ? _c : 0;
        this._mockServer = new mockServer_js_1.MockServer(options);
        this._mockServer.on("receiverOpen", this._handleReceiverOpen);
        this._mockServer.on("senderOpen", this._handleSenderOpen);
        this._mockServer.on("senderClose", this._handleSenderClose);
        this._mockServer.on("connectionClose", this._handleConnectionClose);
        this._mockServer.on("onMessages", this._handleOnMessages);
        this._mockServer.on("connectionOpen", (event) => {
            this._connections.add(event.context.connection);
            this._handleConnectionInactivity(event.context.connection);
        });
        this._mockServer.on("connectionClose", (event) => {
            this._connections.delete(event.context.connection);
        });
    }
    /**
     * Handles responding to CBS messages.
     * @param event -
     */
    _handleCbsMessage(event, message) {
        var _a, _b, _c;
        let outgoingMessage;
        if (!this.isValidCbsAuth(message)) {
            outgoingMessage = {
                correlation_id: (_a = message.message_id) === null || _a === void 0 ? void 0 : _a.toString(),
                to: message.reply_to,
                application_properties: {
                    "status-code": 404,
                    "status-description": `The messaging entity '${(_b = message.application_properties) === null || _b === void 0 ? void 0 : _b.name}' could not be found.`,
                    "error-condition": "amqp:not-found",
                },
                body: undefined,
            };
        }
        else {
            outgoingMessage = (0, cbsAccepted_js_1.createCbsAccepted)({
                correlationId: message.message_id,
                toLinkName: message.reply_to,
            });
        }
        (_c = event.context.delivery) === null || _c === void 0 ? void 0 : _c.accept();
        event.sendMessage(outgoingMessage);
    }
    /**
     * Handles responding to Management READ EventHubs messages.
     * @param event -
     */
    _handleHubRuntimeInfoMessage(event, message) {
        var _a, _b;
        const outgoingMessage = (0, runtimeInfo_js_1.generateHubRuntimeInfoResponse)({
            correlationId: (_a = message.message_id) === null || _a === void 0 ? void 0 : _a.toString(),
            partitions: this.partitionIds,
            targetLinkName: message.reply_to,
            createdOn: this._createdOn,
            eventHubName: this._name,
        });
        (_b = event.context.delivery) === null || _b === void 0 ? void 0 : _b.accept();
        event.sendMessage(outgoingMessage);
    }
    /**
     * Handles responding to Management READ Partition messages.
     * @param event -
     */
    _handlePartitionInfoMessage(event, message) {
        var _a, _b, _c, _d;
        const partitionId = (_a = message.application_properties) === null || _a === void 0 ? void 0 : _a.partition;
        let outgoingMessage;
        if (!this.partitionIds.includes(partitionId)) {
            outgoingMessage = (0, partitionInfo_js_1.generateBadPartitionInfoResponse)({
                correlationId: (_b = message.message_id) === null || _b === void 0 ? void 0 : _b.toString(),
                targetLinkName: message.reply_to,
            });
        }
        else {
            const partitionInfo = this._messageStore.getPartitionInfo(partitionId);
            outgoingMessage = (0, partitionInfo_js_1.generatePartitionInfoResponse)(Object.assign(Object.assign({}, partitionInfo), { correlationId: (_c = message.message_id) === null || _c === void 0 ? void 0 : _c.toString(), targetLinkName: message.reply_to, eventHubName: this._name }));
        }
        (_d = event.context.delivery) === null || _d === void 0 ? void 0 : _d.accept();
        event.sendMessage(outgoingMessage);
    }
    /**
     * Handles storing and accepting/rejecting messages sent from a client to a partition.
     * @param event -
     * @param partitionId -
     */
    _handleReceivedMessage(event, partitionId) {
        var _a, _b, _c, _d;
        const delivery = event.context.delivery;
        if (!delivery) {
            throw new Error("event.context.delivery must be defined");
        }
        const messageSize = (_b = (_a = event.context["message"]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        const maxMessageSize = (_d = (_c = event.context.receiver) === null || _c === void 0 ? void 0 : _c.get_option("max_message_size", 1024 * 1024)) !== null && _d !== void 0 ? _d : 1024 * 1024;
        if (messageSize >= maxMessageSize) {
            delivery.reject({
                condition: "amqp:link:message-size-exceeded",
                description: `The received message (delivery-id:${delivery.id}, size:${messageSize} bytes) exceeds the limit (${maxMessageSize !== null && maxMessageSize !== void 0 ? maxMessageSize : 1024 * 1024} bytes) currently allowed on the link.`,
            });
            return;
        }
        delivery.accept();
        this._storeMessage(event.messages, partitionId);
    }
    /**
     * Gets the Sender's `ownerLevel`, if it has one.
     * @param sender -
     */
    _getSenderOwnerLevel(sender) {
        var _a;
        const ownerLevel = (_a = sender.properties) === null || _a === void 0 ? void 0 : _a["com.microsoft:epoch"];
        return ownerLevel;
    }
    /**
     * Stores the partition sender based on its consumerGroup and partitionId.
     *
     * Note: Partition senders are used to send messages to a client receiver that
     * is listening on a consumerGroup/partitionId combination.
     * @param consumerGroup -
     * @param partitionId -
     * @param sender -
     */
    _storePartitionSender(consumerGroup, partitionId, sender) {
        var _a, _b;
        // Ensure we have an entry for the consumer group.
        const consumerGroupPartitionMap = (_a = this._consumerGroupPartitionSenderMap.get(consumerGroup)) !== null && _a !== void 0 ? _a : new Map();
        this._consumerGroupPartitionSenderMap.set(consumerGroup, consumerGroupPartitionMap);
        // Ensure we have an entry for the partition id.
        const partitionSenderSet = (_b = consumerGroupPartitionMap.get(partitionId)) !== null && _b !== void 0 ? _b : new Set();
        consumerGroupPartitionMap.set(partitionId, partitionSenderSet);
        partitionSenderSet.add(sender);
    }
    /**
     * Removes the partition sender based on its consumerGroup and partitionId.
     *
     * @param consumerGroup -
     * @param partitionId -
     * @param sender -
     */
    _deletePartitionSender(consumerGroup, partitionId, sender) {
        var _a;
        const partitionSenders = (_a = this._consumerGroupPartitionSenderMap
            .get(consumerGroup)) === null || _a === void 0 ? void 0 : _a.get(partitionId);
        if (partitionSenders) {
            partitionSenders.delete(sender);
        }
    }
    /**
     * Checks if the `Sender` is allowed to be created based on its `ownerLevel`
     * compared to other `Sender`s that exist on the same consumerGroup/partitionId.
     *
     * Returns `true` is the sender is allowed to be created, `false` otherwise.
     *
     * If the `Sender` is allowed to be created and does have an `ownerLevel`,
     * any existing `Sender`s with the same consumerGroup/partitionId will be closed.
     * @param consumerGroup -
     * @param partitionId -
     * @param sender -
     */
    _handleSenderOwnerLevel(consumerGroup, partitionId, sender) {
        var _a;
        const ownerLevel = this._getSenderOwnerLevel(sender);
        const partitionSenders = (_a = this._consumerGroupPartitionSenderMap
            .get(consumerGroup)) === null || _a === void 0 ? void 0 : _a.get(partitionId);
        // If there aren't any other senders for this consumerGroup/partition, then just go ahead, it's fine.
        if (!partitionSenders) {
            return true;
        }
        let maxOwnerLevel = -1;
        for (const partitionSender of partitionSenders) {
            const senderOwnerLevel = this._getSenderOwnerLevel(partitionSender);
            if (typeof senderOwnerLevel === "number" && senderOwnerLevel > maxOwnerLevel) {
                maxOwnerLevel = senderOwnerLevel;
            }
        }
        if (typeof ownerLevel === "undefined") {
            if (maxOwnerLevel === -1) {
                // No sender has an ownerLevel, so safe to continue.
                return true;
            }
            else {
                // There's a sender with a higher ownerLevel, not safe to continue.
                sender.close({
                    condition: "amqp:link:stolen",
                    description: `At least one receiver for the endpoint is created with epoch of '${maxOwnerLevel}', and so non-epoch receiver is not allowed. ` +
                        `Either reconnect with a higher epoch, or make sure all epoch receivers are closed or disconnected.`,
                });
                return false;
            }
        }
        if (ownerLevel >= maxOwnerLevel) {
            // This ownerLevel is higher than the existing ownerLevels, so take precedence!
            // Close existing senders!
            for (const partitionSender of partitionSenders) {
                const senderOwnerLevel = this._getSenderOwnerLevel(partitionSender);
                partitionSender.close({
                    condition: "amqp:link:stolen",
                    description: `New receiver 'nil' with higher epoch of '${ownerLevel}' is created hence current receiver 'nil' with epoch '${senderOwnerLevel !== null && senderOwnerLevel !== void 0 ? senderOwnerLevel : ""}' is getting disconnected. ` +
                        `If you are recreating the receiver, make sure a higher epoch is used.`,
                });
            }
            return true;
        }
        // This ownerLevel is lower than the existing ownerLevels, so not safe to continue.
        sender.close({
            condition: "amqp:link:stolen",
            description: `Receiver 'nil' with a higher epoch '${maxOwnerLevel}' already exists. ` +
                `Receiver 'nil' with epoch ${ownerLevel} cannot be created. ` +
                `Make sure you are creating receiver with increasing epoch value to ensure connectivity, or ensure all old epoch receivers are closed or disconnected.`,
        });
        return false;
    }
    /**
     * Stores a message in the `MessageStore`.
     *
     * If a `partitionId` is not provided, a partition will be assigned
     * either based on the `partitionKey` if it is available, or at random.
     * @param message -
     * @param partitionId -
     */
    _storeMessage(messages, partitionId) {
        var _a;
        if (!messages.length) {
            return;
        }
        let partitionKey;
        // determine partition id
        if (!partitionId) {
            // handle partition key
            partitionKey = (_a = messages[0].message_annotations) === null || _a === void 0 ? void 0 : _a["x-opt-partition-key"];
            if (partitionKey) {
                partitionId = this._partitionIdFromKey(partitionKey);
            }
            else {
                // random assignment
                partitionId = `${Math.floor(Math.random() * this.partitionIds.length)}`;
            }
        }
        for (const message of messages) {
            this._messageStore.storeMessage(partitionId, message, partitionKey);
        }
    }
    /**
     * A very hacky 'hash' function to calculate a `partitionId` from a `partitionKey`.
     * @param partitionKey -
     */
    _partitionIdFromKey(partitionKey) {
        let hash = 0;
        for (let i = 0; i < partitionKey.length; i++) {
            hash += partitionKey.charCodeAt(i);
        }
        return `${hash % this.partitionIds.length}`;
    }
    /**
     * Validates whether the partition sender can be created.
     *
     * @param entityComponents -
     * @param sender -
     * @param context -
     */
    _handlePartitionSenderOpenValidation(entityComponents, sender, context) {
        var _a;
        const { eventHubName, consumerGroup, partitionId } = entityComponents;
        if (!this.partitionIds.includes(partitionId)) {
            sender.close({
                condition: "com.microsoft:argument-out-of-range",
                description: "The specified partition is invalid for an EventHub partition sender or receiver.",
            });
            return false;
        }
        if (!this.consumerGroups.has(consumerGroup.toLowerCase())) {
            const host = ((_a = context.connection.hostname) !== null && _a !== void 0 ? _a : "").split(".")[0];
            sender.close({
                condition: "amqp-not-found",
                description: `The messaging entity '${host}:eventhub:${eventHubName}~0|${consumerGroup}' could not be found.`,
            });
            return false;
        }
        return true;
    }
    /**
     * Starts the service.
     */
    start() {
        return this._mockServer.start();
    }
    /**
     * Stops the service.
     */
    stop() {
        for (const tid of this._clearableTimeouts.values()) {
            clearTimeout(tid);
        }
        this._clearableTimeouts.clear();
        return this._mockServer.stop();
    }
    _parseReceiverPartitionEntityPath(entityPath) {
        const parts = entityPath.split("/");
        if (parts.length !== 3) {
            return;
        }
        const [eventHubName, , partitionId] = parts;
        return {
            eventHubName,
            partitionId,
        };
    }
    _parseSenderPartitionEntityPath(entityPath) {
        const parts = entityPath.split("/");
        if (parts.length !== 5) {
            return;
        }
        const [eventHubName, , consumerGroup, , partitionId] = parts;
        return {
            eventHubName,
            consumerGroup,
            partitionId,
        };
    }
    isValidCbsAuth(message) {
        var _a;
        const name = (_a = message.application_properties) === null || _a === void 0 ? void 0 : _a.name;
        if (!name) {
            return;
        }
        const url = new URL(name);
        const searchPath = url.pathname.startsWith("/") ? url.pathname.substring(1) : url.pathname;
        if ([`${this._name}/$management`, this._name].includes(searchPath)) {
            return true;
        }
        const receiverRegex = new RegExp(`^${this._name}\\/ConsumerGroups\\/[\\w\\d\\$\\-\\_]+\\/Partitions\\/[\\w\\d\\$\\-\\_]+`);
        if (receiverRegex.test(searchPath)) {
            return true;
        }
        const senderRegex = new RegExp(`^${this._name}\\/Partitions\\/[\\w\\d\\$\\-\\_]+`);
        if (senderRegex.test(searchPath)) {
            return true;
        }
        return false;
    }
    _isReceiverPartitionEntityPath(entityPath) {
        return (entityPath === null || entityPath === void 0 ? void 0 : entityPath.split("/").length) === 3;
    }
    _isSenderPartitionEntityPath(entityPath) {
        return (entityPath === null || entityPath === void 0 ? void 0 : entityPath.split("/").length) === 5;
    }
}
exports.MockEventHub = MockEventHub;
//# sourceMappingURL=eventHubs.js.map