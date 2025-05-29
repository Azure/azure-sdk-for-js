import Long from "long";
import type { SendRequestOptions, RetryOptions, AmqpAnnotatedMessage } from "@azure/core-amqp";
import { RequestResponseLink } from "@azure/core-amqp";
import type { ConnectionContext } from "../connectionContext.js";
import type { ServiceBusReceivedMessage, ServiceBusMessage } from "../serviceBusMessage.js";
import { DispositionType, ServiceBusMessageImpl } from "../serviceBusMessage.js";
import type { RequestResponseLinkOptions } from "./linkEntity.js";
import { LinkEntity } from "./linkEntity.js";
import type { OperationOptionsBase } from "./../modelsToBeSharedWithEventHubs.js";
import type { ReceiveMode } from "../models.js";
import type { RuleProperties, SqlRuleFilter } from "../serializers/ruleResourceSerializer.js";
import type { ListRequestOptions } from "../serviceBusAtomManagementClient.js";
/**
 * @internal
 */
export interface SendManagementRequestOptions extends SendRequestOptions {
    /**
     * The name of the sender or receiver link associated with the managmenet operations.
     * This is used for service side optimization.
     */
    associatedLinkName?: string;
    /**
     * Option to disable the client from running JSON.parse() on the message body when receiving the message.
     * Not applicable if the message was sent with AMQP body type value or sequence. Use this option when you
     * prefer to work directly with the bytes present in the message body than have the client attempt to parse it.
     */
    skipParsingBodyAsJson?: boolean;
    /**
     * Whether to skip converting Date type on properties of message annotations
     * or application properties into numbers when receiving the message. By
     * default, properties of Date type is converted into UNIX epoch number for
     * compatibility.
     */
    skipConvertingDate?: boolean;
}
/**
 * Represents the correlation filter expression.
 * A CorrelationRuleFilter holds a set of conditions that are matched against user and system properties
 * of incoming messages from a Subscription.
 */
export interface CorrelationRuleFilter {
    /**
     * Value to be matched with the `correlationId` property of the incoming message.
     */
    correlationId?: string;
    /**
     * Value to be matched with the `messageId` property of the incoming message.
     */
    messageId?: string;
    /**
     * Value to be matched with the `to` property of the incoming message.
     */
    to?: string;
    /**
     * Value to be matched with the `replyTo` property of the incoming message.
     */
    replyTo?: string;
    /**
     * Value to be matched with the `subject` property of the incoming message.
     */
    subject?: string;
    /**
     * Value to be matched with the `sessionId` property of the incoming message.
     */
    sessionId?: string;
    /**
     * Value to be matched with the `replyToSessionId` property of the incoming message.
     */
    replyToSessionId?: string;
    /**
     * Value to be matched with the `contentType` property of the incoming message.
     */
    contentType?: string;
    /**
     * Value to be matched with the user properties of the incoming message.
     */
    applicationProperties?: {
        [key: string]: string | number | boolean | Date;
    };
}
/**
 * @internal
 * Options to set when updating the disposition status
 */
export interface DispositionStatusOptions extends OperationOptionsBase {
    /**
     * A map of Service Bus brokered message properties
     * to modify.
     */
    propertiesToModify?: {
        [key: string]: any;
    };
    /**
     * The deadletter reason. May be set if disposition status
     * is set to suspended.
     */
    deadLetterReason?: string;
    /**
     * The deadletter description. May be set if disposition status
     * is set to suspended.
     */
    deadLetterDescription?: string;
    /**
     * This should only be provided if `session` is enabled for a Queue or Topic.
     */
    sessionId?: string;
    /**
     * Retry options.
     */
    retryOptions: RetryOptions | undefined;
}
/**
 * @internal
 * Options passed to the constructor of ManagementClient
 */
export interface ManagementClientOptions {
    address?: string;
    audience?: string;
}
/**
 * @internal
 * Describes the ServiceBus Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export declare class ManagementClient extends LinkEntity<RequestResponseLink> {
    /**
     * The reply to Guid for the management client.
     */
    replyTo: string;
    /**
     * Provides the sequence number of the last peeked message.
     */
    private _lastPeekedSequenceNumber;
    /**
     * lock token for init operation
     */
    private _initLock;
    /**
     * Instantiates the management client.
     * @param context - The connection context
     * @param entityPath - The name/path of the entity (queue/topic/subscription name)
     * for which the management request needs to be made.
     * @param options - Options to be provided for creating the
     * "$management" client.
     */
    constructor(context: ConnectionContext, entityPath: string, options?: ManagementClientOptions);
    /**
     * initialize link with unique this.replyTo address.
     * @param options -
     * @returns updated options bag that has adjusted `timeoutInMs` to account for init time
     */
    private initWithUniqueReplyTo;
    private _init;
    protected createRheaLink(options: RequestResponseLinkOptions): Promise<RequestResponseLink>;
    /**
     * Given array of typed values, returns the element in given index
     */
    private _safelyGetTypedValueFromArray;
    private _decodeApplicationPropertiesMap;
    private _makeManagementRequest;
    /**
     * Closes the AMQP management session to the ServiceBus namespace for this client,
     * returning a promise that will be resolved when disconnection is completed.
     */
    close(): Promise<void>;
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
    peek(messageCount: number, omitMessageBody?: boolean, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<ServiceBusReceivedMessage[]>;
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
    peekMessagesBySession(sessionId: string, messageCount: number, omitMessageBody?: boolean, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<ServiceBusReceivedMessage[]>;
    /**
     * Peeks the desired number of messages from the specified sequence number.
     *
     * @param fromSequenceNumber - The sequence number from where to read the message.
     * @param messageCount - The number of messages to retrieve. Default value `1`.
     * @param sessionId - The sessionId from which messages need to be peeked.
     * @param omitMessageBody - Whether to omit message body when peeking. Default value `false`.
     */
    peekBySequenceNumber(fromSequenceNumber: Long, maxMessageCount: number, sessionId?: string, omitMessageBody?: boolean, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<ServiceBusReceivedMessage[]>;
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
    renewLock(lockToken: string, options?: SendManagementRequestOptions): Promise<Date>;
    /**
     * Schedules an array of messages to appear on Service Bus at a later time.
     *
     * @param scheduledEnqueueTimeUtc - The UTC time at which the messages should be enqueued.
     * @param messages - An array of messages that needs to be scheduled.
     * @returns The sequence numbers of messages that were scheduled.
     */
    scheduleMessages(scheduledEnqueueTimeUtc: Date, messages: ServiceBusMessage[] | AmqpAnnotatedMessage[], options?: OperationOptionsBase & SendManagementRequestOptions): Promise<Long[]>;
    /**
     * Cancels an array of messages that were scheduled.
     * @param sequenceNumbers - An Array of sequence numbers of the message to be cancelled.
     */
    cancelScheduledMessages(sequenceNumbers: Long[], options?: OperationOptionsBase & SendManagementRequestOptions): Promise<void>;
    /**
     * Receives a list of deferred messages identified by `sequenceNumbers`.
     *
     * @param sequenceNumbers - A list containing the sequence numbers to receive.
     * @param receiveMode - The mode in which the receiver was created.
     * @returns a list of messages identified by the given sequenceNumbers or an empty list if no messages are found.
     * - Throws an error if the messages have not been deferred.
     */
    receiveDeferredMessages(sequenceNumbers: Long[], receiveMode: ReceiveMode, sessionId?: string, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<ServiceBusMessageImpl[]>;
    private _deleteMessages;
    /**
     * Delete messages. If no option is specified, all messages will be deleted.
     *
     * @param messageCount - number of messages to delete in a batch.
     * @param enqueueTimeUtcOlderThan - Delete messages whose enqueue time (UTC) are older than this.
     * @returns number of messages deleted.
     */
    deleteMessages(messageCount: number, enqueueTimeUtcOlderThan?: Date, sessionId?: string, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<number>;
    /**
     * Updates the disposition status of deferred messages.
     *
     * @param lockTokens - Message lock tokens to update disposition status.
     * @param dispositionStatus - The disposition status to be set
     * @param options - Optional parameters that can be provided while updating the disposition status.
     */
    updateDispositionStatus(lockToken: string, dispositionType: DispositionType, options?: Omit<DispositionStatusOptions, "retryOptions"> & SendManagementRequestOptions): Promise<void>;
    /**
     * Renews the lock for the specified session.
     *
     * @param sessionId - Id of the session for which the lock needs to be renewed
     * @param options - Options that can be set while sending the request.
     * @returns New lock token expiry date and time in UTC format.
     */
    renewSessionLock(sessionId: string, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<Date>;
    /**
     * Sets the state of the specified session.
     *
     * @param sessionId - The session for which the state needs to be set
     * @param state - The state that needs to be set.
     */
    setSessionState(sessionId: string, state: unknown, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<void>;
    /**
     * Gets the state of the specified session.
     *
     * @param sessionId - The session for which the state needs to be retrieved.
     * @returns The state of that session
     */
    getSessionState(sessionId: string, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<any>;
    /**
     * Lists the sessions on the ServiceBus Queue/Topic.
     * @param lastUpdateTime - Filter to include only sessions updated after a given time.
     * @param skip - The number of sessions to skip
     * @param top - Maximum numer of sessions.
     * @returns A list of session ids.
     */
    listMessageSessions(skip: number, top: number, lastUpdatedTime?: Date, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<string[]>;
    /**
     * Get all the rules on the Subscription.
     * @returns A list of rules.
     */
    getRules(options?: ListRequestOptions & OperationOptionsBase & SendManagementRequestOptions): Promise<RuleProperties[]>;
    /**
     * Removes the rule on the Subscription identified by the given rule name.
     */
    removeRule(ruleName: string, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<void>;
    /**
     * Adds a rule on the subscription as defined by the given rule name, filter and action
     * @param ruleName - Name of the rule
     * @param filter - A Boolean, SQL expression or a Correlation filter
     * @param sqlRuleActionExpression - Action to perform if the message satisfies the filtering expression
     */
    addRule(ruleName: string, filter: SqlRuleFilter | CorrelationRuleFilter, sqlRuleActionExpression?: string, options?: OperationOptionsBase & SendManagementRequestOptions): Promise<void>;
    protected removeLinkFromContext(): void;
}
/**
 * Converts an AmqpAnnotatedMessage or ServiceBusMessage into a properly formatted
 * message for sending to the mgmt link for scheduling.
 *
 * @internal
 * @hidden
 */
export declare function toScheduleableMessage(item: ServiceBusMessage | AmqpAnnotatedMessage, scheduledEnqueueTimeUtc: Date): Record<string, unknown>;
//# sourceMappingURL=managementClient.d.ts.map