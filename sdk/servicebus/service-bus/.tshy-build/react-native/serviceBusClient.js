// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createConnectionContextForConnectionString, createConnectionContextForCredential, } from "./constructorHelpers.js";
import { ConnectionContext } from "./connectionContext.js";
import { ServiceBusReceiverImpl } from "./receivers/receiver.js";
import { ServiceBusSessionReceiverImpl } from "./receivers/sessionReceiver.js";
import { ServiceBusRuleManagerImpl } from "./serviceBusRuleManager.js";
import { ServiceBusSenderImpl } from "./sender.js";
import { entityPathMisMatchError } from "./util/errors.js";
import { MessageSession } from "./session/messageSession.js";
import { isDefined } from "@azure/core-util";
import { isCredential } from "./util/typeGuards.js";
import { ensureValidIdentifier } from "./util/utils.js";
/**
 * A client that can create Sender instances for sending messages to queues and
 * topics as well as Receiver instances to receive messages from queues and subscriptions.
 */
export class ServiceBusClient {
    constructor(fullyQualifiedNamespaceOrConnectionString1, credentialOrOptions2, options3) {
        if (isCredential(credentialOrOptions2)) {
            const fullyQualifiedNamespace = fullyQualifiedNamespaceOrConnectionString1;
            const credential = credentialOrOptions2;
            this._clientOptions = options3 || {};
            this._connectionContext = createConnectionContextForCredential(credential, fullyQualifiedNamespace, this._clientOptions);
        }
        else {
            const connectionString = fullyQualifiedNamespaceOrConnectionString1;
            this._clientOptions = credentialOrOptions2 || {};
            this._connectionContext = createConnectionContextForConnectionString(connectionString, this._clientOptions);
        }
        this.fullyQualifiedNamespace = this._connectionContext.config.host;
        this.identifier = ensureValidIdentifier(this.fullyQualifiedNamespace, this._clientOptions.identifier);
        this._clientOptions.retryOptions = this._clientOptions.retryOptions || {};
        const timeoutInMs = this._clientOptions.retryOptions.timeoutInMs;
        if (isDefined(timeoutInMs) &&
            (typeof timeoutInMs !== "number" || !isFinite(timeoutInMs) || timeoutInMs <= 0)) {
            throw new Error(`${timeoutInMs} is an invalid value for retryOptions.timeoutInMs`);
        }
    }
    createReceiver(queueOrTopicName1, optionsOrSubscriptionName2, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options3) {
        var _a, _b;
        validateEntityPath(this._connectionContext.config, queueOrTopicName1);
        // NOTE: we don't currently have any options for this kind of receiver but
        // when we do make sure you pass them in and extract them.
        const { entityPath, receiveMode, options } = extractReceiverArguments(queueOrTopicName1, optionsOrSubscriptionName2, options3);
        let entityPathWithSubQueue = entityPath;
        if (options === null || options === void 0 ? void 0 : options.subQueueType) {
            switch (options === null || options === void 0 ? void 0 : options.subQueueType) {
                case "deadLetter":
                    entityPathWithSubQueue += "/$DeadLetterQueue";
                    break;
                case "transferDeadLetter":
                    entityPathWithSubQueue += "/$Transfer/$DeadLetterQueue";
                    break;
                default:
                    throw new Error(`Invalid subQueueType '${options === null || options === void 0 ? void 0 : options.subQueueType}' provided. Valid values are 'deadLetter' and 'transferDeadLetter'`);
            }
        }
        const maxLockAutoRenewDurationInMs = (options === null || options === void 0 ? void 0 : options.maxAutoLockRenewalDurationInMs) != null
            ? options.maxAutoLockRenewalDurationInMs
            : 5 * 60 * 1000;
        return new ServiceBusReceiverImpl(this._connectionContext, entityPathWithSubQueue, receiveMode, maxLockAutoRenewDurationInMs, (_a = options === null || options === void 0 ? void 0 : options.skipParsingBodyAsJson) !== null && _a !== void 0 ? _a : false, (_b = options === null || options === void 0 ? void 0 : options.skipConvertingDate) !== null && _b !== void 0 ? _b : false, this._clientOptions.retryOptions, options === null || options === void 0 ? void 0 : options.identifier);
    }
    /**
     * Creates an instance of {@link ServiceBusRuleManager} that is used to manage
     * the rules for a subscription.
     *
     * @param topicName - the topic to create {@link ServiceBusRuleManager}
     * @param subscriptionName - the subscription specific to the specified topic to create a {@link ServiceBusRuleManager} for.
     * @returns a {@link ServiceBusRuleManager} scoped to the specified subscription and topic.
     */
    createRuleManager(topicName, subscriptionName) {
        validateEntityPath(this._connectionContext.config, topicName);
        const { entityPath } = extractReceiverArguments(topicName, subscriptionName);
        return new ServiceBusRuleManagerImpl(this._connectionContext, entityPath, this._clientOptions.retryOptions);
    }
    async acceptSession(queueOrTopicName1, optionsOrSubscriptionNameOrSessionId2, optionsOrSessionId3, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options4) {
        var _a, _b, _c, _d;
        validateEntityPath(this._connectionContext.config, queueOrTopicName1);
        let sessionId;
        let entityPath;
        let receiveMode;
        let options;
        if (typeof queueOrTopicName1 === "string" &&
            typeof optionsOrSubscriptionNameOrSessionId2 === "string" &&
            typeof optionsOrSessionId3 === "string") {
            // subscription constructor
            sessionId = optionsOrSessionId3;
            ({ entityPath, receiveMode, options } = extractReceiverArguments(queueOrTopicName1, optionsOrSubscriptionNameOrSessionId2, 
            // skip the session ID parameter (3)
            options4));
        }
        else if (typeof queueOrTopicName1 === "string" &&
            typeof optionsOrSubscriptionNameOrSessionId2 === "string" &&
            typeof optionsOrSessionId3 !== "string") {
            // queue constructor (but only because we know we're not a subscription constructor)
            sessionId = optionsOrSubscriptionNameOrSessionId2;
            ({ entityPath, receiveMode, options } = extractReceiverArguments(queueOrTopicName1, 
            // skip the session ID parameter (2)
            optionsOrSessionId3, undefined));
        }
        else {
            throw new Error("Unhandled set of parameters");
        }
        const messageSession = await MessageSession.create(ensureValidIdentifier(entityPath, options === null || options === void 0 ? void 0 : options.identifier), this._connectionContext, entityPath, sessionId, {
            maxAutoLockRenewalDurationInMs: options === null || options === void 0 ? void 0 : options.maxAutoLockRenewalDurationInMs,
            receiveMode,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            retryOptions: this._clientOptions.retryOptions,
            skipParsingBodyAsJson: (_a = options === null || options === void 0 ? void 0 : options.skipParsingBodyAsJson) !== null && _a !== void 0 ? _a : false,
            skipConvertingDate: (_b = options === null || options === void 0 ? void 0 : options.skipConvertingDate) !== null && _b !== void 0 ? _b : false,
        });
        const sessionReceiver = new ServiceBusSessionReceiverImpl(messageSession, this._connectionContext, entityPath, receiveMode, (_c = options === null || options === void 0 ? void 0 : options.skipParsingBodyAsJson) !== null && _c !== void 0 ? _c : false, (_d = options === null || options === void 0 ? void 0 : options.skipConvertingDate) !== null && _d !== void 0 ? _d : false, this._clientOptions.retryOptions);
        return sessionReceiver;
    }
    async acceptNextSession(queueOrTopicName1, optionsOrSubscriptionName2, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options3) {
        var _a, _b, _c, _d;
        validateEntityPath(this._connectionContext.config, queueOrTopicName1);
        const { entityPath, receiveMode, options } = extractReceiverArguments(queueOrTopicName1, optionsOrSubscriptionName2, options3);
        const messageSession = await MessageSession.create(ensureValidIdentifier(entityPath, options === null || options === void 0 ? void 0 : options.identifier), this._connectionContext, entityPath, undefined, {
            maxAutoLockRenewalDurationInMs: options === null || options === void 0 ? void 0 : options.maxAutoLockRenewalDurationInMs,
            receiveMode,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            retryOptions: this._clientOptions.retryOptions,
            skipParsingBodyAsJson: (_a = options === null || options === void 0 ? void 0 : options.skipParsingBodyAsJson) !== null && _a !== void 0 ? _a : false,
            skipConvertingDate: (_b = options === null || options === void 0 ? void 0 : options.skipConvertingDate) !== null && _b !== void 0 ? _b : false,
        });
        const sessionReceiver = new ServiceBusSessionReceiverImpl(messageSession, this._connectionContext, entityPath, receiveMode, (_c = options === null || options === void 0 ? void 0 : options.skipParsingBodyAsJson) !== null && _c !== void 0 ? _c : false, (_d = options === null || options === void 0 ? void 0 : options.skipConvertingDate) !== null && _d !== void 0 ? _d : false, this._clientOptions.retryOptions);
        return sessionReceiver;
    }
    /**
     * Creates a Sender which can be used to send messages, schedule messages to be
     * sent at a later time and cancel such scheduled messages. No connection is made
     * to the service until one of the methods on the sender is called.
     * @param queueOrTopicName - The name of a queue or topic to send messages to.
     */
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    createSender(queueOrTopicName, options = {}) {
        validateEntityPath(this._connectionContext.config, queueOrTopicName);
        return new ServiceBusSenderImpl(this._connectionContext, queueOrTopicName, this._clientOptions.retryOptions, options.identifier);
    }
    /**
     * Closes the underlying AMQP connection.
     * NOTE: this will also disconnect any Receiver or Sender instances created from this
     * instance.
     */
    close() {
        return ConnectionContext.close(this._connectionContext);
    }
}
/**
 * Helper to validate and extract the common arguments from both the create*Receiver() overloads that
 * have this pattern:
 *
 * queue, options
 * topic, subscription, options
 *
 * @internal
 */
export function extractReceiverArguments(queueOrTopicName1, optionsOrSubscriptionName2, definitelyOptions3) {
    let entityPath;
    let options;
    if (typeof optionsOrSubscriptionName2 === "string") {
        const topic = queueOrTopicName1;
        const subscription = optionsOrSubscriptionName2;
        entityPath = `${topic}/Subscriptions/${subscription}`;
        options = definitelyOptions3;
    }
    else {
        entityPath = queueOrTopicName1;
        options = optionsOrSubscriptionName2;
    }
    let receiveMode;
    if (!options || !isDefined(options.receiveMode) || options.receiveMode === "peekLock") {
        receiveMode = "peekLock";
    }
    else if (options.receiveMode === "receiveAndDelete") {
        receiveMode = "receiveAndDelete";
    }
    else {
        throw new TypeError(`Invalid receiveMode '${options === null || options === void 0 ? void 0 : options.receiveMode}' provided. Valid values are 'peekLock' and 'receiveAndDelete'`);
    }
    options === null || options === void 0 ? true : delete options.receiveMode;
    return {
        entityPath,
        receiveMode,
        options,
    };
}
/**
 * Validates that the EntityPath in the connection string (if any) matches with the
 * queue or topic name passed to the methods that create senders and receivers.
 *
 * @internal
 */
function validateEntityPath(connectionConfig, queueOrTopicName) {
    if (connectionConfig.entityPath && connectionConfig.entityPath !== queueOrTopicName) {
        throw new Error(entityPathMisMatchError);
    }
}
//# sourceMappingURL=serviceBusClient.js.map