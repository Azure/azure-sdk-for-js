// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import Long from "long";
import { message as RheaMessageUtil, generate_uuid, string_to_uuid, types, ReceiverEvents, } from "rhea-promise";
import { ConditionErrorNameMapper, Constants, defaultCancellableLock, RequestResponseLink, } from "@azure/core-amqp";
import { DispositionType, ServiceBusMessageImpl, toRheaMessage, fromRheaMessage, updateScheduledTime, updateMessageId, } from "../serviceBusMessage.js";
import { LinkEntity } from "./linkEntity.js";
import { managementClientLogger, receiverLogger, senderLogger } from "../log.js";
import { toBuffer, waitForSendable } from "../util/utils.js";
import { InvalidMaxMessageCountError, throwErrorIfConnectionClosed, throwTypeErrorIfParameterIsEmptyString, throwTypeErrorIfParameterMissing, throwTypeErrorIfParameterNotLong, throwTypeErrorIfParameterTypeMismatch, } from "../util/errors.js";
import { max32BitNumber } from "../util/constants.js";
import { Buffer } from "buffer";
import { translateServiceBusError } from "../serviceBusError.js";
import { defaultDataTransformer, tryToJsonDecode } from "../dataTransformer.js";
import { delay, isDefined, isObjectWithProperties } from "@azure/core-util";
/**
 * @internal
 */
const sqlRuleProperties = ["sqlExpression"];
function isSqlRuleFilter(obj) {
    if (obj) {
        return sqlRuleProperties.some((validProperty) => isObjectWithProperties(obj, [validProperty]));
    }
    return false;
}
/**
 * @internal
 */
const correlationProperties = [
    "correlationId",
    "messageId",
    "to",
    "replyTo",
    "subject",
    "sessionId",
    "replyToSessionId",
    "contentType",
    "applicationProperties",
];
function isCorrelationRuleFilter(obj) {
    if (obj) {
        return correlationProperties.some((validProperty) => isObjectWithProperties(obj, [validProperty]));
    }
    return false;
}
/**
 * @internal
 * Describes the ServiceBus Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export class ManagementClient extends LinkEntity {
    /**
     * Instantiates the management client.
     * @param context - The connection context
     * @param entityPath - The name/path of the entity (queue/topic/subscription name)
     * for which the management request needs to be made.
     * @param options - Options to be provided for creating the
     * "$management" client.
     */
    constructor(context, entityPath, options) {
        super(`${entityPath}/$management`, entityPath, context, "mgmt", managementClientLogger, {
            address: options && options.address ? options.address : Constants.management,
            audience: options && options.audience
                ? options.audience
                : `${context.config.endpoint}${entityPath}/$management`,
        });
        /**
         * The reply to Guid for the management client.
         */
        this.replyTo = generate_uuid();
        /**
         * Provides the sequence number of the last peeked message.
         */
        this._lastPeekedSequenceNumber = Long.ZERO;
        /**
         * lock token for init operation
         */
        this._initLock = `initMgmtLink-${generate_uuid()}`;
        this._context = context;
    }
    /**
     * initialize link with unique this.replyTo address.
     * @param options -
     * @returns updated options bag that has adjusted `timeoutInMs` to account for init time
     */
    async initWithUniqueReplyTo(options = {}) {
        var _a;
        const retryTimeoutInMs = (_a = options.timeoutInMs) !== null && _a !== void 0 ? _a : Constants.defaultOperationTimeoutInMs;
        const initOperationStartTime = Date.now();
        return defaultCancellableLock.acquire(this._initLock, async () => {
            managementClientLogger.verbose(`${this.logPrefix} lock acquired for initializing replyTo address and link`);
            if (!this.isOpen()) {
                this.replyTo = generate_uuid();
                managementClientLogger.verbose(`${this.logPrefix} new replyTo address: ${this.replyTo} generated`);
            }
            const { abortSignal } = options;
            const aborter = new AbortController();
            const abortListener = () => {
                aborter.abort();
            };
            abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.addEventListener("abort", abortListener);
            if (!this.isOpen()) {
                await Promise.race([
                    this._init(aborter.signal),
                    delay(retryTimeoutInMs, { abortSignal: aborter.signal }).then(function onfulfilled() {
                        throw {
                            name: "OperationTimeoutError",
                            message: "The initialization of management client timed out. Please try again later.",
                        };
                    }, function onrejected(_) {
                        managementClientLogger.verbose(`The management client initialization has either completed or been cancelled.`);
                    }),
                ]).finally(() => {
                    aborter.abort();
                    abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.removeEventListener("abort", abortListener);
                });
            }
            // time taken by the init operation
            const timeTakenByInit = Date.now() - initOperationStartTime;
            return Object.assign(Object.assign({}, options), { 
                // Left over time
                timeoutInMs: retryTimeoutInMs - timeTakenByInit });
        }, {
            abortSignal: options.abortSignal,
            timeoutInMs: retryTimeoutInMs,
        });
    }
    async _init(abortSignal) {
        throwErrorIfConnectionClosed(this._context);
        try {
            const rxopt = {
                source: { address: this.address },
                name: this.replyTo,
                target: { address: this.replyTo },
                onSessionError: (context) => {
                    const sbError = translateServiceBusError(context.session.error);
                    managementClientLogger.logError(sbError, `${this.logPrefix} An error occurred on the session for request/response links for $management`);
                },
            };
            const sropt = {
                target: { address: this.address },
                onError: (context) => {
                    const ehError = translateServiceBusError(context.sender.error);
                    managementClientLogger.logError(ehError, `${this.logPrefix} An error occurred on the $management sender link`);
                },
            };
            // Even if multiple parallel requests reach here, the initLink secures a lock
            // to ensure there won't be multiple initializations
            await this.initLink({
                senderOptions: sropt,
                receiverOptions: rxopt,
            }, abortSignal);
        }
        catch (err) {
            const translatedError = translateServiceBusError(err);
            managementClientLogger.logError(translatedError, `${this.logPrefix} An error occurred while establishing the $management links`);
            throw translatedError;
        }
    }
    async createRheaLink(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options) {
        const rheaLink = await RequestResponseLink.create(this._context.connection, options.senderOptions, options.receiverOptions);
        // Attach listener for the `receiver_error` events to log the errors.
        // "message" event listener is added in core-amqp.
        // "rhea" doesn't allow setting only the "onError" handler in the options if it is not accompanied by an "onMessage" handler.
        // Hence, not passing onError handler in the receiver options, adding a handler below.
        rheaLink.receiver.on(ReceiverEvents.receiverError, (context) => {
            const ehError = translateServiceBusError(context.receiver.error);
            managementClientLogger.logError(ehError, `${this.logPrefix} An error occurred on the $management receiver link`);
        });
        return rheaLink;
    }
    /**
     * Given array of typed values, returns the element in given index
     */
    _safelyGetTypedValueFromArray(data, index) {
        return Array.isArray(data) && data.length > index && data[index]
            ? data[index].value
            : undefined;
    }
    _decodeApplicationPropertiesMap(obj) {
        if (!types.is_map(obj)) {
            throw new Error("object to decode is not of Map types");
        }
        const array = obj.value;
        const result = {};
        for (let i = 0; i < array.length; i += 2) {
            const key = array[i].value;
            result[key] = array[i + 1].value;
        }
        return result;
    }
    async _makeManagementRequest(request, internalLogger, sendRequestOptions = {}) {
        var _a, _b, _c, _d;
        if (request.message_id === undefined) {
            request.message_id = generate_uuid();
        }
        try {
            const { timeoutInMs } = sendRequestOptions;
            await waitForSendable(internalLogger, this.logPrefix, this.name, timeoutInMs !== null && timeoutInMs !== void 0 ? timeoutInMs : Constants.defaultOperationTimeoutInMs, (_a = this.link) === null || _a === void 0 ? void 0 : _a.sender, (_d = (_c = (_b = this.link) === null || _b === void 0 ? void 0 : _b.session) === null || _c === void 0 ? void 0 : _c.outgoing) === null || _d === void 0 ? void 0 : _d.available());
            return await this.link.sendRequest(request, sendRequestOptions);
        }
        catch (err) {
            const translatedError = translateServiceBusError(err);
            internalLogger.logError(translatedError, "%s An error occurred during send on management request-response link with address '%s'", this.logPrefix, this.address);
            throw translatedError;
        }
    }
    /**
     * Closes the AMQP management session to the ServiceBus namespace for this client,
     * returning a promise that will be resolved when disconnection is completed.
     */
    async close() {
        try {
            // Always clear the timeout, as the isOpen check may report
            // false without ever having cleared the timeout otherwise.
            // NOTE: management link currently doesn't have a separate concept of "detaching" like
            // the other links do. When we add handling of this (via the onDetached call, like other links)
            // we can change this back to closeLink("permanent").
            await this.closeLink();
            managementClientLogger.verbose("Successfully closed the management session.");
        }
        catch (err) {
            managementClientLogger.logError(err, `${this.logPrefix} An error occurred while closing the management session`);
            throw err;
        }
    }
    /**
     * Fetches the next batch of active messages. The first call to `peek()` fetches the first
     * active message for this client. Each subsequent call fetches the subsequent message in the
     * entity.
     *
     * Unlike a `received` message, `peeked` message will not have lock token associated with it,
     * and hence it cannot be `Completed/Abandoned/Deferred/Deadlettered/Renewed`. This method will
     * also fetch even Deferred messages (but not Deadlettered message).
     *
     * @param messageCount - The number of messages to retrieve. Default value `1`.
     * @param omitMessageBody - Whether to omit message body when peeking. Default value `false`.
     */
    async peek(messageCount, omitMessageBody, options) {
        throwErrorIfConnectionClosed(this._context);
        return this.peekBySequenceNumber(this._lastPeekedSequenceNumber.add(1), messageCount, undefined, omitMessageBody, options);
    }
    /**
     * Fetches the next batch of active messages in the current MessageSession. The first call to
     * `peek()` fetches the first active message for this client. Each subsequent call fetches the
     * subsequent message in the entity.
     *
     * Unlike a `received` message, `peeked` message will not have lock token associated with it,
     * and hence it cannot be `Completed/Abandoned/Deferred/Deadlettered/Renewed`.  This method will
     * also fetch even Deferred messages (but not Deadlettered message).
     *
     * @param sessionId - The sessionId from which messages need to be peeked.
     * @param messageCount - The number of messages to retrieve. Default value `1`.
     * @param omitMessageBody - Whether to omit message body when peeking Default value `false`.
     */
    async peekMessagesBySession(sessionId, messageCount, omitMessageBody, options) {
        throwErrorIfConnectionClosed(this._context);
        return this.peekBySequenceNumber(this._lastPeekedSequenceNumber.add(1), messageCount, sessionId, omitMessageBody, options);
    }
    /**
     * Peeks the desired number of messages from the specified sequence number.
     *
     * @param fromSequenceNumber - The sequence number from where to read the message.
     * @param messageCount - The number of messages to retrieve. Default value `1`.
     * @param sessionId - The sessionId from which messages need to be peeked.
     * @param omitMessageBody - Whether to omit message body when peeking. Default value `false`.
     */
    async peekBySequenceNumber(fromSequenceNumber, maxMessageCount, sessionId, omitMessageBody, options) {
        var _a, _b;
        throwErrorIfConnectionClosed(this._context);
        const connId = this._context.connectionId;
        // Checks for fromSequenceNumber
        throwTypeErrorIfParameterMissing(connId, "fromSequenceNumber", fromSequenceNumber);
        throwTypeErrorIfParameterNotLong(connId, "fromSequenceNumber", fromSequenceNumber);
        // Checks for maxMessageCount
        throwTypeErrorIfParameterMissing(this._context.connectionId, "maxMessageCount", maxMessageCount);
        throwTypeErrorIfParameterTypeMismatch(this._context.connectionId, "maxMessageCount", maxMessageCount, "number");
        if (isNaN(maxMessageCount) || maxMessageCount < 1) {
            throw new TypeError(InvalidMaxMessageCountError);
        }
        const messageList = [];
        try {
            const messageBody = {};
            messageBody[Constants.fromSequenceNumber] = types.wrap_long(Buffer.from(fromSequenceNumber.toBytesBE()));
            messageBody[Constants.messageCount] = types.wrap_int(maxMessageCount);
            if (isDefined(sessionId)) {
                messageBody[Constants.sessionIdMapKey] = sessionId;
            }
            if (isDefined(omitMessageBody)) {
                const omitMessageBodyKey = "omit-message-body"; // TODO: Service Bus specific. Put it somewhere
                messageBody[omitMessageBodyKey] = types.wrap_boolean(omitMessageBody);
            }
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: messageBody,
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.peekMessage,
                },
            };
            if (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName) {
                request.application_properties[Constants.associatedLinkName] =
                    updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName;
            }
            request.application_properties[Constants.trackingId] = generate_uuid();
            // TODO: it'd be nice to attribute this peek request to the actual receiver that made it. So have them pass in a
            // log prefix rather than just falling back to the management links.
            receiverLogger.verbose("%s Peek by sequence number request body: %O.", this.logPrefix, request.body);
            const result = await this._makeManagementRequest(request, receiverLogger, updatedOptions);
            if (result.application_properties.statusCode !== 204) {
                const messages = result.body.messages;
                for (const msg of messages) {
                    const decodedMessage = RheaMessageUtil.decode(msg.message);
                    const message = fromRheaMessage(decodedMessage, {
                        skipParsingBodyAsJson: (_a = updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.skipParsingBodyAsJson) !== null && _a !== void 0 ? _a : false,
                        skipConvertingDate: (_b = updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.skipConvertingDate) !== null && _b !== void 0 ? _b : false,
                    });
                    messageList.push(message);
                    this._lastPeekedSequenceNumber = message.sequenceNumber;
                }
            }
        }
        catch (err) {
            const error = translateServiceBusError(err);
            receiverLogger.logError(error, `${this.logPrefix} An error occurred while sending the request to peek messages to $management endpoint`);
            // statusCode == 404 then do not throw
            if (error.code !== ConditionErrorNameMapper["com.microsoft:message-not-found"]) {
                throw error;
            }
        }
        return messageList;
    }
    /**
     * Renews the lock on the message. The lock will be renewed based on the setting specified on
     * the queue.
     *
     * When a message is received in `PeekLock` mode, the message is locked on the server for this
     * receiver instance for a duration as specified during the Queue/Subscription creation
     * (LockDuration). If processing of the message requires longer than this duration, the
     * lock needs to be renewed. For each renewal, it resets the time the message is locked by the
     * LockDuration set on the Entity.
     *
     * @param lockToken - Lock token of the message
     * @param options - Options that can be set while sending the request.
     * @returns New lock token expiry date and time in UTC format.
     */
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    async renewLock(lockToken, options) {
        throwErrorIfConnectionClosed(this._context);
        if (!options)
            options = {};
        if (options.timeoutInMs == null)
            options.timeoutInMs = 5000;
        try {
            const messageBody = {};
            messageBody[Constants.lockTokens] = types.wrap_array([string_to_uuid(lockToken)], 0x98, undefined);
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: messageBody,
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.renewLock,
                },
            };
            request.application_properties[Constants.trackingId] = generate_uuid();
            if (updatedOptions.associatedLinkName) {
                request.application_properties[Constants.associatedLinkName] =
                    updatedOptions.associatedLinkName;
            }
            receiverLogger.verbose("[%s] Renew message Lock request: %O.", this._context.connectionId, request);
            const result = await this._makeManagementRequest(request, receiverLogger, {
                abortSignal: updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.abortSignal,
                requestName: "renewLock",
            });
            const lockedUntilUtc = new Date(result.body.expirations[0]);
            return lockedUntilUtc;
        }
        catch (err) {
            const error = translateServiceBusError(err);
            receiverLogger.logError(error, `${this.logPrefix} An error occurred while sending the renew lock request to $management endpoint`);
            throw error;
        }
    }
    /**
     * Schedules an array of messages to appear on Service Bus at a later time.
     *
     * @param scheduledEnqueueTimeUtc - The UTC time at which the messages should be enqueued.
     * @param messages - An array of messages that needs to be scheduled.
     * @returns The sequence numbers of messages that were scheduled.
     */
    async scheduleMessages(scheduledEnqueueTimeUtc, messages, options) {
        var _a;
        throwErrorIfConnectionClosed(this._context);
        if (!messages.length) {
            return [];
        }
        const messageBody = [];
        for (let i = 0; i < messages.length; i++) {
            const item = messages[i];
            try {
                const rheaMessage = toRheaMessage(item, defaultDataTransformer);
                updateMessageId(rheaMessage, rheaMessage.message_id || generate_uuid());
                updateScheduledTime(rheaMessage, scheduledEnqueueTimeUtc);
                const entry = {
                    message: RheaMessageUtil.encode(rheaMessage),
                    "message-id": rheaMessage.message_id,
                };
                if (rheaMessage.group_id) {
                    entry[Constants.sessionIdMapKey] = rheaMessage.group_id;
                }
                if ((_a = rheaMessage.message_annotations) === null || _a === void 0 ? void 0 : _a[Constants.partitionKey]) {
                    entry["partition-key"] = rheaMessage.message_annotations[Constants.partitionKey];
                }
                // Will be required later for implementing Transactions
                // if (item.viaPartitionKey) {
                //   entry["via-partition-key"] = item.viaPartitionKey;
                // }
                const wrappedEntry = types.wrap_map(entry);
                messageBody.push(wrappedEntry);
            }
            catch (err) {
                const error = translateServiceBusError(err);
                senderLogger.logError(error, `${this.logPrefix} An error occurred while encoding the item at position ${i} in the messages array`);
                throw error;
            }
        }
        const updatedOptions = await this.initWithUniqueReplyTo(options);
        try {
            const request = {
                body: { messages: messageBody },
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.scheduleMessage,
                },
            };
            if (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName) {
                request.application_properties[Constants.associatedLinkName] =
                    updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName;
            }
            request.application_properties[Constants.trackingId] = generate_uuid();
            senderLogger.verbose("%s Schedule messages request body: %O.", this.logPrefix, request.body);
            const result = await this._makeManagementRequest(request, senderLogger, updatedOptions);
            const sequenceNumbers = result.body[Constants.sequenceNumbers];
            const sequenceNumbersAsLong = [];
            for (let i = 0; i < sequenceNumbers.length; i++) {
                if (typeof sequenceNumbers[i] === "number") {
                    sequenceNumbersAsLong.push(Long.fromNumber(sequenceNumbers[i]));
                }
                else {
                    sequenceNumbersAsLong.push(Long.fromBytesBE(sequenceNumbers[i]));
                }
            }
            return sequenceNumbersAsLong;
        }
        catch (err) {
            const error = translateServiceBusError(err);
            senderLogger.logError(error, `${this.logPrefix} An error occurred while sending the request to schedule messages to $management endpoint`);
            throw error;
        }
    }
    /**
     * Cancels an array of messages that were scheduled.
     * @param sequenceNumbers - An Array of sequence numbers of the message to be cancelled.
     */
    async cancelScheduledMessages(sequenceNumbers, options) {
        throwErrorIfConnectionClosed(this._context);
        if (!sequenceNumbers.length) {
            return;
        }
        const messageBody = {};
        messageBody[Constants.sequenceNumbers] = [];
        for (let i = 0; i < sequenceNumbers.length; i++) {
            const sequenceNumber = sequenceNumbers[i];
            try {
                messageBody[Constants.sequenceNumbers].push(Buffer.from(sequenceNumber.toBytesBE()));
            }
            catch (err) {
                const error = translateServiceBusError(err);
                senderLogger.logError(error, `${this.logPrefix} An error occurred while encoding the item at position ${i} in the sequenceNumbers array`);
                throw error;
            }
        }
        try {
            messageBody[Constants.sequenceNumbers] = types.wrap_array(messageBody[Constants.sequenceNumbers], 0x81, undefined);
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: messageBody,
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.cancelScheduledMessage,
                },
            };
            if (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName) {
                request.application_properties[Constants.associatedLinkName] =
                    updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName;
            }
            request.application_properties[Constants.trackingId] = generate_uuid();
            senderLogger.verbose("%s Cancel scheduled messages request body: %O.", this.logPrefix, request.body);
            await this._makeManagementRequest(request, senderLogger, updatedOptions);
            return;
        }
        catch (err) {
            const error = translateServiceBusError(err);
            senderLogger.logError(error, `${this.logPrefix} An error occurred while sending the request to cancel the scheduled message to $management endpoint`);
            throw error;
        }
    }
    /**
     * Receives a list of deferred messages identified by `sequenceNumbers`.
     *
     * @param sequenceNumbers - A list containing the sequence numbers to receive.
     * @param receiveMode - The mode in which the receiver was created.
     * @returns a list of messages identified by the given sequenceNumbers or an empty list if no messages are found.
     * - Throws an error if the messages have not been deferred.
     */
    async receiveDeferredMessages(sequenceNumbers, receiveMode, sessionId, options) {
        var _a;
        throwErrorIfConnectionClosed(this._context);
        if (!sequenceNumbers.length) {
            return [];
        }
        const messageList = [];
        const messageBody = {};
        messageBody[Constants.sequenceNumbers] = [];
        for (let i = 0; i < sequenceNumbers.length; i++) {
            const sequenceNumber = sequenceNumbers[i];
            try {
                messageBody[Constants.sequenceNumbers].push(Buffer.from(sequenceNumber.toBytesBE()));
            }
            catch (err) {
                const error = translateServiceBusError(err);
                receiverLogger.logError(error, `${this.logPrefix} An error occurred while encoding the item at position ${i} in the sequenceNumbers array`);
                throw error;
            }
        }
        try {
            messageBody[Constants.sequenceNumbers] = types.wrap_array(messageBody[Constants.sequenceNumbers], 0x81, undefined);
            const receiverSettleMode = receiveMode === "receiveAndDelete" ? 0 : 1;
            messageBody[Constants.receiverSettleMode] = types.wrap_uint(receiverSettleMode);
            if (sessionId != null) {
                messageBody[Constants.sessionIdMapKey] = sessionId;
            }
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: messageBody,
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.receiveBySequenceNumber,
                },
            };
            if (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName) {
                request.application_properties[Constants.associatedLinkName] =
                    updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName;
            }
            request.application_properties[Constants.trackingId] = generate_uuid();
            receiverLogger.verbose("%s Receive deferred messages request body: %O.", this.logPrefix, request.body);
            const result = await this._makeManagementRequest(request, receiverLogger, updatedOptions);
            const messages = result.body.messages;
            for (const msg of messages) {
                const decodedMessage = RheaMessageUtil.decode(msg.message);
                const message = new ServiceBusMessageImpl(decodedMessage, { tag: msg["lock-token"] }, false, receiveMode, (_a = updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.skipParsingBodyAsJson) !== null && _a !== void 0 ? _a : false, false);
                messageList.push(message);
            }
            return messageList;
        }
        catch (err) {
            const error = translateServiceBusError(err);
            receiverLogger.logError(error, `${this.logPrefix} An error occurred while sending the request to receive deferred messages to $management endpoint`);
            throw error;
        }
    }
    async _deleteMessages(messageCount, enqueueTimeUtcOlderThan, sessionId, options) {
        try {
            const messageBody = {};
            messageBody[Constants.messageCount] = types.wrap_int(messageCount);
            messageBody[Constants.enqueuedTimeUtc] = enqueueTimeUtcOlderThan;
            if (isDefined(sessionId)) {
                messageBody[Constants.sessionIdMapKey] = sessionId;
            }
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: messageBody,
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.deleteMessages,
                },
            };
            if (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName) {
                request.application_properties[Constants.associatedLinkName] =
                    updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName;
            }
            request.application_properties[Constants.trackingId] = generate_uuid();
            receiverLogger.verbose("%s delete messages request body: %O.", this.logPrefix, request.body);
            const result = await this._makeManagementRequest(request, receiverLogger, updatedOptions);
            if (result.application_properties.statusCode === 200) {
                return result.body["message-count"];
            }
            else if (result.application_properties.statusCode === 204 &&
                result.application_properties.errorCondition === "com.microsoft:message-not-found") {
                return 0;
            }
            else {
                throw new Error(`Unexpected response with status code of ${result.application_properties.statusCode}`);
            }
        }
        catch (err) {
            const error = translateServiceBusError(err);
            receiverLogger.logError(error, `${this.logPrefix} An error occurred while sending the request to delete messages to $management endpoint`);
            throw error;
        }
    }
    /**
     * Delete messages. If no option is specified, all messages will be deleted.
     *
     * @param messageCount - number of messages to delete in a batch.
     * @param enqueueTimeUtcOlderThan - Delete messages whose enqueue time (UTC) are older than this.
     * @returns number of messages deleted.
     */
    async deleteMessages(messageCount, enqueueTimeUtcOlderThan, sessionId, options = {}) {
        throwTypeErrorIfParameterMissing(this._context.connectionId, "messageCount", messageCount);
        throwTypeErrorIfParameterTypeMismatch(this._context.connectionId, "messageCount", messageCount, "number");
        if (isNaN(messageCount) || messageCount < 1) {
            throw new TypeError("'messageCount' must be a number greater than 0.");
        }
        enqueueTimeUtcOlderThan !== null && enqueueTimeUtcOlderThan !== void 0 ? enqueueTimeUtcOlderThan : (enqueueTimeUtcOlderThan = new Date());
        return this._deleteMessages(messageCount, enqueueTimeUtcOlderThan, sessionId, options);
    }
    /**
     * Updates the disposition status of deferred messages.
     *
     * @param lockTokens - Message lock tokens to update disposition status.
     * @param dispositionStatus - The disposition status to be set
     * @param options - Optional parameters that can be provided while updating the disposition status.
     */
    async updateDispositionStatus(lockToken, dispositionType, 
    // TODO: mgmt link retry<> will come in the next PR.
    options) {
        throwErrorIfConnectionClosed(this._context);
        if (!options)
            options = {};
        try {
            let dispositionStatus;
            if (dispositionType === DispositionType.abandon)
                dispositionStatus = "abandoned";
            else if (dispositionType === DispositionType.complete)
                dispositionStatus = "completed";
            else if (dispositionType === DispositionType.defer)
                dispositionStatus = "defered";
            else if (dispositionType === DispositionType.deadletter)
                dispositionStatus = "suspended";
            else
                throw new Error(`Provided "dispositionType" - ${dispositionType} is invalid`);
            const messageBody = {};
            const lockTokenBuffer = [];
            lockTokenBuffer.push(string_to_uuid(lockToken));
            messageBody[Constants.lockTokens] = types.wrap_array(lockTokenBuffer, 0x98, undefined);
            messageBody[Constants.dispositionStatus] = dispositionStatus;
            if (options.deadLetterDescription != null) {
                messageBody[Constants.deadLetterDescription] = options.deadLetterDescription;
            }
            if (options.deadLetterReason != null) {
                messageBody[Constants.deadLetterReason] = options.deadLetterReason;
            }
            if (options.propertiesToModify != null) {
                messageBody[Constants.propertiesToModify] = options.propertiesToModify;
            }
            if (options.sessionId != null) {
                messageBody[Constants.sessionIdMapKey] = options.sessionId;
            }
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: messageBody,
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.updateDisposition,
                },
            };
            if (updatedOptions.associatedLinkName) {
                request.application_properties[Constants.associatedLinkName] =
                    updatedOptions.associatedLinkName;
            }
            request.application_properties[Constants.trackingId] = generate_uuid();
            receiverLogger.verbose("%s Update disposition status request body: %O.", this.logPrefix, request.body);
            await this._makeManagementRequest(request, receiverLogger, updatedOptions);
        }
        catch (err) {
            const error = translateServiceBusError(err);
            receiverLogger.logError(error, `${this.logPrefix} An error occurred while sending the request to update disposition status to $management endpoint`);
            throw error;
        }
    }
    /**
     * Renews the lock for the specified session.
     *
     * @param sessionId - Id of the session for which the lock needs to be renewed
     * @param options - Options that can be set while sending the request.
     * @returns New lock token expiry date and time in UTC format.
     */
    async renewSessionLock(sessionId, options) {
        throwErrorIfConnectionClosed(this._context);
        try {
            const messageBody = {};
            messageBody[Constants.sessionIdMapKey] = sessionId;
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: messageBody,
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.renewSessionLock,
                },
            };
            request.application_properties[Constants.trackingId] = generate_uuid();
            if (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName) {
                request.application_properties[Constants.associatedLinkName] =
                    updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName;
            }
            receiverLogger.verbose("%s Renew Session Lock request body: %O.", this.logPrefix, request.body);
            const result = await this._makeManagementRequest(request, receiverLogger, updatedOptions);
            const lockedUntilUtc = new Date(result.body.expiration);
            receiverLogger.verbose("%s Lock for session '%s' will expire at %s.", this.logPrefix, sessionId, lockedUntilUtc.toString());
            return lockedUntilUtc;
        }
        catch (err) {
            const error = translateServiceBusError(err);
            receiverLogger.logError(error, `${this.logPrefix} An error occurred while sending the renew lock request to $management endpoint`);
            throw error;
        }
    }
    /**
     * Sets the state of the specified session.
     *
     * @param sessionId - The session for which the state needs to be set
     * @param state - The state that needs to be set.
     */
    async setSessionState(sessionId, state, options) {
        throwErrorIfConnectionClosed(this._context);
        try {
            const messageBody = {};
            messageBody[Constants.sessionIdMapKey] = sessionId;
            messageBody["session-state"] = toBuffer(state);
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: messageBody,
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.setSessionState,
                },
            };
            if (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName) {
                request.application_properties[Constants.associatedLinkName] =
                    updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName;
            }
            request.application_properties[Constants.trackingId] = generate_uuid();
            receiverLogger.verbose("%s Set Session state request body: %O.", this.logPrefix, request.body);
            await this._makeManagementRequest(request, receiverLogger, updatedOptions);
        }
        catch (err) {
            const error = translateServiceBusError(err);
            receiverLogger.logError(error, `${this.logPrefix} An error occurred while sending the renew lock request to $management endpoint`);
            throw error;
        }
    }
    /**
     * Gets the state of the specified session.
     *
     * @param sessionId - The session for which the state needs to be retrieved.
     * @returns The state of that session
     */
    async getSessionState(sessionId, options) {
        throwErrorIfConnectionClosed(this._context);
        try {
            const messageBody = {};
            messageBody[Constants.sessionIdMapKey] = sessionId;
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: messageBody,
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.getSessionState,
                },
            };
            if (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName) {
                request.application_properties[Constants.associatedLinkName] =
                    updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.associatedLinkName;
            }
            request.application_properties[Constants.trackingId] = generate_uuid();
            receiverLogger.verbose("%s Get session state request body: %O.", this.logPrefix, request.body);
            const result = await this._makeManagementRequest(request, receiverLogger, updatedOptions);
            return result.body["session-state"]
                ? tryToJsonDecode(result.body["session-state"])
                : result.body["session-state"];
        }
        catch (err) {
            const error = translateServiceBusError(err);
            receiverLogger.logError(error, `${this.logPrefix} An error occurred while sending the renew lock request to $management endpoint`);
            throw error;
        }
    }
    /**
     * Lists the sessions on the ServiceBus Queue/Topic.
     * @param lastUpdateTime - Filter to include only sessions updated after a given time.
     * @param skip - The number of sessions to skip
     * @param top - Maximum numer of sessions.
     * @returns A list of session ids.
     */
    async listMessageSessions(skip, top, lastUpdatedTime, options) {
        throwErrorIfConnectionClosed(this._context);
        const defaultLastUpdatedTimeForListingSessions = 259200000; // 3 * 24 * 3600 * 1000
        if (typeof skip !== "number") {
            throw new Error("'skip' is a required parameter and must be of type 'number'.");
        }
        if (typeof top !== "number") {
            throw new Error("'top' is a required parameter and must be of type 'number'.");
        }
        if (lastUpdatedTime && !(lastUpdatedTime instanceof Date)) {
            throw new Error("'lastUpdatedTime' must be of type 'Date'.");
        }
        if (!lastUpdatedTime) {
            lastUpdatedTime = new Date(Date.now() - defaultLastUpdatedTimeForListingSessions);
        }
        try {
            const messageBody = {};
            messageBody["last-updated-time"] = lastUpdatedTime;
            messageBody["skip"] = types.wrap_int(skip);
            messageBody["top"] = types.wrap_int(top);
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: messageBody,
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.enumerateSessions,
                },
            };
            request.application_properties[Constants.trackingId] = generate_uuid();
            managementClientLogger.verbose("%s List sessions request body: %O.", this.logPrefix, request.body);
            const response = await this._makeManagementRequest(request, managementClientLogger, updatedOptions);
            return (response && response.body && response.body["sessions-ids"]) || [];
        }
        catch (err) {
            const error = translateServiceBusError(err);
            managementClientLogger.logError(error, `${this.logPrefix} An error occurred while sending the renew lock request to $management endpoint`);
            throw error;
        }
    }
    /**
     * Get all the rules on the Subscription.
     * @returns A list of rules.
     */
    async getRules(options) {
        throwErrorIfConnectionClosed(this._context);
        try {
            const updatedOptions = (await this.initWithUniqueReplyTo(options));
            const request = {
                body: {
                    top: (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.maxCount)
                        ? types.wrap_int(updatedOptions.maxCount)
                        : types.wrap_int(max32BitNumber),
                    skip: (updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.skip) ? types.wrap_int(updatedOptions.skip) : types.wrap_int(0),
                },
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.enumerateRules,
                },
            };
            request.application_properties[Constants.trackingId] = generate_uuid();
            managementClientLogger.verbose("%s Get rules request body: %O.", this.logPrefix, request.body);
            const response = await this._makeManagementRequest(request, managementClientLogger, updatedOptions);
            if (response.application_properties.statusCode === 204 ||
                !response.body ||
                !Array.isArray(response.body.rules)) {
                return [];
            }
            // Reference: https://learn.microsoft.com/azure/service-bus-messaging/service-bus-amqp-request-response#response-11
            const result = response.body.rules || [];
            const rules = [];
            result.forEach((x) => {
                const ruleDescriptor = x["rule-description"];
                let filter;
                // We use the first three elements of the `ruleDescriptor.value` to get filter, action, name
                if (!ruleDescriptor ||
                    !ruleDescriptor.descriptor ||
                    ruleDescriptor.descriptor.value !== Constants.descriptorCodes.ruleDescriptionList ||
                    !Array.isArray(ruleDescriptor.value) ||
                    ruleDescriptor.value.length < 3) {
                    return;
                }
                const filtersRawData = ruleDescriptor.value[0];
                const actionsRawData = ruleDescriptor.value[1];
                let sqlRuleAction;
                if (actionsRawData.descriptor.value === Constants.descriptorCodes.sqlRuleActionList &&
                    Array.isArray(actionsRawData.value) &&
                    actionsRawData.value.length) {
                    sqlRuleAction = {
                        sqlExpression: this._safelyGetTypedValueFromArray(actionsRawData.value, 0),
                    };
                }
                else {
                    sqlRuleAction = {};
                }
                switch (filtersRawData.descriptor.value) {
                    case Constants.descriptorCodes.trueFilterList:
                        filter = {
                            sqlExpression: "1=1",
                        };
                        break;
                    case Constants.descriptorCodes.falseFilterList:
                        filter = {
                            sqlExpression: "1=0",
                        };
                        break;
                    case Constants.descriptorCodes.sqlFilterList:
                        filter = {
                            sqlExpression: this._safelyGetTypedValueFromArray(filtersRawData.value, 0),
                        };
                        break;
                    case Constants.descriptorCodes.correlationFilterList:
                        filter = {
                            correlationId: this._safelyGetTypedValueFromArray(filtersRawData.value, 0),
                            messageId: this._safelyGetTypedValueFromArray(filtersRawData.value, 1),
                            to: this._safelyGetTypedValueFromArray(filtersRawData.value, 2),
                            replyTo: this._safelyGetTypedValueFromArray(filtersRawData.value, 3),
                            subject: this._safelyGetTypedValueFromArray(filtersRawData.value, 4),
                            sessionId: this._safelyGetTypedValueFromArray(filtersRawData.value, 5),
                            replyToSessionId: this._safelyGetTypedValueFromArray(filtersRawData.value, 6),
                            contentType: this._safelyGetTypedValueFromArray(filtersRawData.value, 7),
                            applicationProperties: Array.isArray(filtersRawData.value) &&
                                filtersRawData.value.length > 8 &&
                                filtersRawData.value[8]
                                ? this._decodeApplicationPropertiesMap(filtersRawData.value[8])
                                : undefined,
                        };
                        break;
                    default:
                        throw new Error(`${this.logPrefix} Found unexpected descriptor code for the filter: ${filtersRawData.descriptor.value}`);
                }
                const rule = {
                    name: ruleDescriptor.value[2].value,
                    filter,
                    action: sqlRuleAction,
                };
                rules.push(rule);
            });
            return rules;
        }
        catch (err) {
            const error = translateServiceBusError(err);
            managementClientLogger.logError(error, `${this.logPrefix} An error occurred while sending the get rules request to $management endpoint`);
            throw error;
        }
    }
    /**
     * Removes the rule on the Subscription identified by the given rule name.
     */
    async removeRule(ruleName, options) {
        throwErrorIfConnectionClosed(this._context);
        throwTypeErrorIfParameterMissing(this._context.connectionId, "ruleName", ruleName);
        ruleName = String(ruleName);
        throwTypeErrorIfParameterIsEmptyString(this._context.connectionId, "ruleName", ruleName);
        try {
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: {
                    "rule-name": types.wrap_string(ruleName),
                },
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.removeRule,
                },
            };
            request.application_properties[Constants.trackingId] = generate_uuid();
            managementClientLogger.verbose("%s Remove Rule request body: %O.", this.logPrefix, request.body);
            await this._makeManagementRequest(request, managementClientLogger, updatedOptions);
        }
        catch (err) {
            const error = translateServiceBusError(err);
            managementClientLogger.logError(error, `${this.logPrefix} An error occurred while sending the remove rule request to $management endpoint`);
            throw error;
        }
    }
    /**
     * Adds a rule on the subscription as defined by the given rule name, filter and action
     * @param ruleName - Name of the rule
     * @param filter - A Boolean, SQL expression or a Correlation filter
     * @param sqlRuleActionExpression - Action to perform if the message satisfies the filtering expression
     */
    async addRule(ruleName, filter, sqlRuleActionExpression, options) {
        throwErrorIfConnectionClosed(this._context);
        throwTypeErrorIfParameterMissing(this._context.connectionId, "ruleName", ruleName);
        ruleName = String(ruleName);
        throwTypeErrorIfParameterIsEmptyString(this._context.connectionId, "ruleName", ruleName);
        throwTypeErrorIfParameterMissing(this._context.connectionId, "filter", filter);
        if (!isSqlRuleFilter(filter) && !isCorrelationRuleFilter(filter)) {
            throw new TypeError(`The parameter "filter" should implement either the SqlRuleFilter or the CorrelationRuleFilter interface.`);
        }
        try {
            const ruleDescription = {};
            if (isSqlRuleFilter(filter)) {
                ruleDescription["sql-filter"] = {
                    expression: filter.sqlExpression,
                };
            }
            else {
                ruleDescription["correlation-filter"] = {
                    "correlation-id": filter.correlationId,
                    "message-id": filter.messageId,
                    to: filter.to,
                    "reply-to": filter.replyTo,
                    label: filter.subject,
                    "session-id": filter.sessionId,
                    "reply-to-session-id": filter.replyToSessionId,
                    "content-type": filter.contentType,
                    properties: filter.applicationProperties,
                };
            }
            if (sqlRuleActionExpression !== undefined) {
                ruleDescription["sql-rule-action"] = {
                    expression: String(sqlRuleActionExpression),
                };
            }
            const updatedOptions = await this.initWithUniqueReplyTo(options);
            const request = {
                body: {
                    "rule-name": types.wrap_string(ruleName),
                    "rule-description": types.wrap_map(ruleDescription),
                },
                reply_to: this.replyTo,
                application_properties: {
                    operation: Constants.operations.addRule,
                },
            };
            request.application_properties[Constants.trackingId] = generate_uuid();
            managementClientLogger.verbose("%s Add Rule request body: %O.", this.logPrefix, request.body);
            await this._makeManagementRequest(request, managementClientLogger, updatedOptions);
        }
        catch (err) {
            const error = translateServiceBusError(err);
            managementClientLogger.logError(error, `${this.logPrefix} An error occurred while sending the Add rule request to $management endpoint`);
            throw error;
        }
    }
    removeLinkFromContext() {
        delete this._context.managementClients[this.name];
    }
}
/**
 * Converts an AmqpAnnotatedMessage or ServiceBusMessage into a properly formatted
 * message for sending to the mgmt link for scheduling.
 *
 * @internal
 * @hidden
 */
export function toScheduleableMessage(item, scheduledEnqueueTimeUtc) {
    const rheaMessage = toRheaMessage(item, defaultDataTransformer);
    updateMessageId(rheaMessage, rheaMessage.message_id || generate_uuid());
    updateScheduledTime(rheaMessage, scheduledEnqueueTimeUtc);
    const entry = {
        message: RheaMessageUtil.encode(rheaMessage),
        "message-id": rheaMessage.message_id,
    };
    rheaMessage.message_annotations = Object.assign(Object.assign({}, rheaMessage.message_annotations), { [Constants.scheduledEnqueueTime]: scheduledEnqueueTimeUtc });
    if (rheaMessage.group_id) {
        entry[Constants.sessionIdMapKey] = rheaMessage.group_id;
    }
    const partitionKey = rheaMessage.message_annotations && rheaMessage.message_annotations[Constants.partitionKey];
    if (partitionKey) {
        entry["partition-key"] = partitionKey;
    }
    return entry;
}
//# sourceMappingURL=managementClient.js.map