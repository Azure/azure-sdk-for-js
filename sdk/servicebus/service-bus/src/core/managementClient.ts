// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Long from "long";
import {
  EventContext,
  ReceiverOptions,
  message as RheaMessageUtil,
  SenderOptions,
  generate_uuid,
  string_to_uuid,
  types,
  Typed,
  ReceiverEvents,
  Message as RheaMessage,
} from "rhea-promise";
import {
  ConditionErrorNameMapper,
  Constants,
  MessagingError,
  RequestResponseLink,
  SendRequestOptions,
  RetryOptions,
  AmqpAnnotatedMessage,
} from "@azure/core-amqp";
import { ConnectionContext } from "../connectionContext";
import {
  DispositionType,
  ServiceBusReceivedMessage,
  ServiceBusMessage,
  ServiceBusMessageImpl,
  toRheaMessage,
  fromRheaMessage,
  updateScheduledTime,
  updateMessageId,
} from "../serviceBusMessage";
import { LinkEntity, RequestResponseLinkOptions } from "./linkEntity";
import { managementClientLogger, receiverLogger, senderLogger, ServiceBusLogger } from "../log";
import { toBuffer } from "../util/utils";
import {
  InvalidMaxMessageCountError,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterIsEmptyString,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong,
  throwTypeErrorIfParameterTypeMismatch,
} from "../util/errors";
import { max32BitNumber } from "../util/constants";
import { Buffer } from "buffer";
import { OperationOptionsBase } from "./../modelsToBeSharedWithEventHubs";
import { AbortSignalLike } from "@azure/abort-controller";
import { ReceiveMode } from "../models";
import { translateServiceBusError } from "../serviceBusError";
import { defaultDataTransformer, tryToJsonDecode } from "../dataTransformer";
import { isDefined, isObjectWithProperties } from "../util/typeGuards";
import {
  RuleProperties,
  SqlRuleAction,
  SqlRuleFilter,
} from "../serializers/ruleResourceSerializer";
import { ListRequestOptions } from "../serviceBusAtomManagementClient";

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
  applicationProperties?: { [key: string]: string | number | boolean | Date };
}

/**
 * @internal
 */
const sqlRuleProperties = ["sqlExpression"];

function isSqlRuleFilter(obj: unknown): obj is SqlRuleFilter {
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

function isCorrelationRuleFilter(obj: unknown): obj is CorrelationRuleFilter {
  if (obj) {
    return correlationProperties.some((validProperty) =>
      isObjectWithProperties(obj, [validProperty])
    );
  }

  return false;
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
  propertiesToModify?: { [key: string]: any };
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
export class ManagementClient extends LinkEntity<RequestResponseLink> {
  /**
   * The reply to Guid for the management client.
   */
  replyTo: string = generate_uuid();
  /**
   * Provides the sequence number of the last peeked message.
   */
  private _lastPeekedSequenceNumber: Long = Long.ZERO;

  /**
   * Instantiates the management client.
   * @param context - The connection context
   * @param entityPath - The name/path of the entity (queue/topic/subscription name)
   * for which the management request needs to be made.
   * @param options - Options to be provided for creating the
   * "$management" client.
   */
  constructor(context: ConnectionContext, entityPath: string, options?: ManagementClientOptions) {
    super(`${entityPath}/$management`, entityPath, context, "mgmt", managementClientLogger, {
      address: options && options.address ? options.address : Constants.management,
      audience:
        options && options.audience
          ? options.audience
          : `${context.config.endpoint}${entityPath}/$management`,
    });
    this._context = context;
  }

  private async _init(abortSignal?: AbortSignalLike): Promise<void> {
    throwErrorIfConnectionClosed(this._context);
    try {
      const rxopt: ReceiverOptions = {
        source: { address: this.address },
        name: this.replyTo,
        target: { address: this.replyTo },
        onSessionError: (context: EventContext) => {
          const sbError = translateServiceBusError(context.session!.error!);
          managementClientLogger.logError(
            sbError,
            `${this.logPrefix} An error occurred on the session for request/response links for $management`
          );
        },
      };
      const sropt: SenderOptions = {
        target: { address: this.address },
        onError: (context: EventContext) => {
          const ehError = translateServiceBusError(context.sender!.error!);
          managementClientLogger.logError(
            ehError,
            `${this.logPrefix} An error occurred on the $management sender link`
          );
        },
      };

      // Even if multiple parallel requests reach here, the initLink secures a lock
      // to ensure there won't be multiple initializations
      await this.initLink(
        {
          senderOptions: sropt,
          receiverOptions: rxopt,
        },
        abortSignal
      );
    } catch (err: any) {
      const translatedError = translateServiceBusError(err);
      managementClientLogger.logError(
        translatedError,
        `${this.logPrefix} An error occurred while establishing the $management links`
      );
      throw translatedError;
    }
  }

  protected async createRheaLink(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: RequestResponseLinkOptions
  ): Promise<RequestResponseLink> {
    const rheaLink = await RequestResponseLink.create(
      this._context.connection,
      options.senderOptions,
      options.receiverOptions
    );
    // Attach listener for the `receiver_error` events to log the errors.

    // "message" event listener is added in core-amqp.
    // "rhea" doesn't allow setting only the "onError" handler in the options if it is not accompanied by an "onMessage" handler.
    // Hence, not passing onError handler in the receiver options, adding a handler below.
    rheaLink.receiver.on(ReceiverEvents.receiverError, (context: EventContext) => {
      const ehError = translateServiceBusError(context.receiver!.error!);
      managementClientLogger.logError(
        ehError,
        `${this.logPrefix} An error occurred on the $management receiver link`
      );
    });
    return rheaLink;
  }

  /**
   * Given array of typed values, returns the element in given index
   */
  private _safelyGetTypedValueFromArray(data: Typed[], index: number): any {
    return Array.isArray(data) && data.length > index && data[index]
      ? data[index].value
      : undefined;
  }

  private _decodeApplicationPropertiesMap(
    obj: Typed
  ): Record<string, string | number | boolean | Date> {
    if (!types.is_map(obj)) {
      throw new Error("object to decode is not of Map types");
    }
    const array = obj.value as Array<Typed>;
    const result: Record<string, string | number | boolean | Date> = {};
    for (let i = 0; i < array.length; i += 2) {
      const key = array[i].value as string;
      result[key] = array[i + 1].value as string | number | boolean | Date;
    }

    return result;
  }

  private async _makeManagementRequest(
    request: RheaMessage,
    internalLogger: ServiceBusLogger,
    sendRequestOptions: SendManagementRequestOptions = {}
  ): Promise<RheaMessage> {
    if (request.message_id === undefined) {
      request.message_id = generate_uuid();
    }
    const retryTimeoutInMs =
      sendRequestOptions.timeoutInMs ?? Constants.defaultOperationTimeoutInMs;
    const initOperationStartTime = Date.now();
    const actionAfterTimeout = (reject: (reason?: any) => void): void => {
      const desc: string = `The request with message_id "${request.message_id}" timed out. Please try again later.`;
      const e: Error = {
        name: "OperationTimeoutError",
        message: desc,
      };

      reject(e);
    };

    let waitTimer: ReturnType<typeof setTimeout>;
    // eslint-disable-next-line promise/param-names
    const operationTimeout = new Promise<void>((_, reject) => {
      waitTimer = setTimeout(() => actionAfterTimeout(reject), retryTimeoutInMs);
    });
    internalLogger.verbose(`${this.logPrefix} Acquiring lock to get the management req res link.`);

    try {
      if (!this.isOpen()) {
        await Promise.race([this._init(sendRequestOptions?.abortSignal), operationTimeout]);
      }
    } finally {
      clearTimeout(waitTimer!);
    }

    // time taken by the init operation
    const timeTakenByInit = Date.now() - initOperationStartTime;
    // Left over time
    sendRequestOptions.timeoutInMs = retryTimeoutInMs - timeTakenByInit;

    try {
      if (!request.message_id) request.message_id = generate_uuid();
      return await this.link!.sendRequest(request, sendRequestOptions);
    } catch (err: any) {
      const translatedError = translateServiceBusError(err);
      internalLogger.logError(
        translatedError,
        "%s An error occurred during send on management request-response link with address '%s'",
        this.logPrefix,
        this.address
      );
      throw translatedError;
    }
  }

  /**
   * Closes the AMQP management session to the ServiceBus namespace for this client,
   * returning a promise that will be resolved when disconnection is completed.
   */
  async close(): Promise<void> {
    try {
      // Always clear the timeout, as the isOpen check may report
      // false without ever having cleared the timeout otherwise.

      // NOTE: management link currently doesn't have a separate concept of "detaching" like
      // the other links do. When we add handling of this (via the onDetached call, like other links)
      // we can change this back to closeLink("permanent").
      await this.closeLink();
      managementClientLogger.verbose("Successfully closed the management session.");
    } catch (err: any) {
      managementClientLogger.logError(
        err,
        `${this.logPrefix} An error occurred while closing the management session`
      );
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
  async peek(
    messageCount: number,
    omitMessageBody?: boolean,
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<ServiceBusReceivedMessage[]> {
    throwErrorIfConnectionClosed(this._context);
    return this.peekBySequenceNumber(
      this._lastPeekedSequenceNumber.add(1),
      messageCount,
      undefined,
      omitMessageBody,
      options
    );
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
  async peekMessagesBySession(
    sessionId: string,
    messageCount: number,
    omitMessageBody?: boolean,
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<ServiceBusReceivedMessage[]> {
    throwErrorIfConnectionClosed(this._context);
    return this.peekBySequenceNumber(
      this._lastPeekedSequenceNumber.add(1),
      messageCount,
      sessionId,
      omitMessageBody,
      options
    );
  }

  /**
   * Peeks the desired number of messages from the specified sequence number.
   *
   * @param fromSequenceNumber - The sequence number from where to read the message.
   * @param messageCount - The number of messages to retrieve. Default value `1`.
   * @param sessionId - The sessionId from which messages need to be peeked.
   * @param omitMessageBody - Whether to omit message body when peeking. Default value `false`.
   */
  async peekBySequenceNumber(
    fromSequenceNumber: Long,
    maxMessageCount: number,
    sessionId?: string,
    omitMessageBody?: boolean,
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<ServiceBusReceivedMessage[]> {
    throwErrorIfConnectionClosed(this._context);
    const connId = this._context.connectionId;

    // Checks for fromSequenceNumber
    throwTypeErrorIfParameterMissing(connId, "fromSequenceNumber", fromSequenceNumber);
    throwTypeErrorIfParameterNotLong(connId, "fromSequenceNumber", fromSequenceNumber);

    // Checks for maxMessageCount
    throwTypeErrorIfParameterMissing(
      this._context.connectionId,
      "maxMessageCount",
      maxMessageCount
    );
    throwTypeErrorIfParameterTypeMismatch(
      this._context.connectionId,
      "maxMessageCount",
      maxMessageCount,
      "number"
    );

    if (isNaN(maxMessageCount) || maxMessageCount < 1) {
      throw new TypeError(InvalidMaxMessageCountError);
    }

    const messageList: ServiceBusReceivedMessage[] = [];
    try {
      const messageBody: any = {};
      messageBody[Constants.fromSequenceNumber] = types.wrap_long(
        Buffer.from(fromSequenceNumber.toBytesBE())
      );
      messageBody[Constants.messageCount] = types.wrap_int(maxMessageCount!);
      if (isDefined(sessionId)) {
        messageBody[Constants.sessionIdMapKey] = sessionId;
      }
      if (isDefined(omitMessageBody)) {
        const omitMessageBodyKey = "omit-message-body"; // TODO: Service Bus specific. Put it somewhere
        messageBody[omitMessageBodyKey] = types.wrap_boolean(omitMessageBody);
      }
      const request: RheaMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.peekMessage,
        },
      };
      if (options?.associatedLinkName) {
        request.application_properties![Constants.associatedLinkName] = options?.associatedLinkName;
      }
      request.application_properties![Constants.trackingId] = generate_uuid();

      // TODO: it'd be nice to attribute this peek request to the actual receiver that made it. So have them pass in a
      // log prefix rather than just falling back to the management links.
      receiverLogger.verbose(
        "%s Peek by sequence number request body: %O.",
        this.logPrefix,
        request.body
      );

      const result = await this._makeManagementRequest(request, receiverLogger, options);
      if (result.application_properties!.statusCode !== 204) {
        const messages = result.body.messages as { message: Buffer }[];
        for (const msg of messages) {
          const decodedMessage = RheaMessageUtil.decode(msg.message);
          const message = fromRheaMessage(
            decodedMessage as any,
            options?.skipParsingBodyAsJson ?? false
          );
          messageList.push(message);
          this._lastPeekedSequenceNumber = message.sequenceNumber!;
        }
      }
    } catch (err: any) {
      const error = translateServiceBusError(err) as MessagingError;
      receiverLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the request to peek messages to $management endpoint`
      );
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
  async renewLock(lockToken: string, options?: SendManagementRequestOptions): Promise<Date> {
    throwErrorIfConnectionClosed(this._context);
    if (!options) options = {};
    if (options.timeoutInMs == null) options.timeoutInMs = 5000;

    try {
      const messageBody: any = {};

      messageBody[Constants.lockTokens] = types.wrap_array(
        [string_to_uuid(lockToken)],
        0x98,
        undefined
      );
      const request: RheaMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.renewLock,
        },
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      if (options.associatedLinkName) {
        request.application_properties![Constants.associatedLinkName] = options.associatedLinkName;
      }
      receiverLogger.verbose(
        "[%s] Renew message Lock request: %O.",
        this._context.connectionId,
        request
      );
      const result = await this._makeManagementRequest(request, receiverLogger, {
        abortSignal: options?.abortSignal,
        requestName: "renewLock",
      });
      const lockedUntilUtc = new Date(result.body.expirations[0]);
      return lockedUntilUtc;
    } catch (err: any) {
      const error = translateServiceBusError(err);
      receiverLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the renew lock request to $management endpoint`
      );
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
  async scheduleMessages(
    scheduledEnqueueTimeUtc: Date,
    messages: ServiceBusMessage[] | AmqpAnnotatedMessage[],
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<Long[]> {
    throwErrorIfConnectionClosed(this._context);
    if (!messages.length) {
      return [];
    }
    const messageBody: any[] = [];
    for (let i = 0; i < messages.length; i++) {
      const item = messages[i];

      try {
        const rheaMessage = toRheaMessage(item, defaultDataTransformer);
        updateMessageId(rheaMessage, rheaMessage.message_id || generate_uuid());
        updateScheduledTime(rheaMessage, scheduledEnqueueTimeUtc);

        const entry: {
          message: Buffer;
          ["message-id"]: ServiceBusMessage["messageId"];
          ["partition-key"]?: ServiceBusMessage["partitionKey"];
          [Constants.sessionIdMapKey]?: string | undefined;
        } = {
          message: RheaMessageUtil.encode(rheaMessage),
          "message-id": rheaMessage.message_id,
        };

        if (rheaMessage.group_id) {
          entry[Constants.sessionIdMapKey] = rheaMessage.group_id;
        }

        if (rheaMessage.message_annotations?.[Constants.partitionKey]) {
          entry["partition-key"] = rheaMessage.message_annotations[Constants.partitionKey];
        }

        // Will be required later for implementing Transactions
        // if (item.viaPartitionKey) {
        //   entry["via-partition-key"] = item.viaPartitionKey;
        // }

        const wrappedEntry = types.wrap_map(entry);
        messageBody.push(wrappedEntry);
      } catch (err: any) {
        const error = translateServiceBusError(err);
        senderLogger.logError(
          error,
          `${this.logPrefix} An error occurred while encoding the item at position ${i} in the messages array`
        );
        throw error;
      }
    }
    try {
      const request: RheaMessage = {
        body: { messages: messageBody },
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.scheduleMessage,
        },
      };
      if (options?.associatedLinkName) {
        request.application_properties![Constants.associatedLinkName] = options?.associatedLinkName;
      }
      request.application_properties![Constants.trackingId] = generate_uuid();
      senderLogger.verbose("%s Schedule messages request body: %O.", this.logPrefix, request.body);
      const result = await this._makeManagementRequest(request, senderLogger, options);
      const sequenceNumbers = result.body[Constants.sequenceNumbers];
      const sequenceNumbersAsLong = [];
      for (let i = 0; i < sequenceNumbers.length; i++) {
        if (typeof sequenceNumbers[i] === "number") {
          sequenceNumbersAsLong.push(Long.fromNumber(sequenceNumbers[i]));
        } else {
          sequenceNumbersAsLong.push(Long.fromBytesBE(sequenceNumbers[i]));
        }
      }
      return sequenceNumbersAsLong;
    } catch (err: any) {
      const error = translateServiceBusError(err);
      senderLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the request to schedule messages to $management endpoint`
      );
      throw error;
    }
  }

  /**
   * Cancels an array of messages that were scheduled.
   * @param sequenceNumbers - An Array of sequence numbers of the message to be cancelled.
   */
  async cancelScheduledMessages(
    sequenceNumbers: Long[],
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<void> {
    throwErrorIfConnectionClosed(this._context);
    if (!sequenceNumbers.length) {
      return;
    }
    const messageBody: any = {};
    messageBody[Constants.sequenceNumbers] = [];
    for (let i = 0; i < sequenceNumbers.length; i++) {
      const sequenceNumber = sequenceNumbers[i];
      try {
        messageBody[Constants.sequenceNumbers].push(Buffer.from(sequenceNumber.toBytesBE()));
      } catch (err: any) {
        const error = translateServiceBusError(err);
        senderLogger.logError(
          error,
          `${this.logPrefix} An error occurred while encoding the item at position ${i} in the sequenceNumbers array`
        );
        throw error;
      }
    }

    try {
      messageBody[Constants.sequenceNumbers] = types.wrap_array(
        messageBody[Constants.sequenceNumbers],
        0x81,
        undefined
      );
      const request: RheaMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.cancelScheduledMessage,
        },
      };

      if (options?.associatedLinkName) {
        request.application_properties![Constants.associatedLinkName] = options?.associatedLinkName;
      }
      request.application_properties![Constants.trackingId] = generate_uuid();
      senderLogger.verbose(
        "%s Cancel scheduled messages request body: %O.",
        this.logPrefix,
        request.body
      );

      await this._makeManagementRequest(request, senderLogger, options);
      return;
    } catch (err: any) {
      const error = translateServiceBusError(err);
      senderLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the request to cancel the scheduled message to $management endpoint`
      );
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
  async receiveDeferredMessages(
    sequenceNumbers: Long[],
    receiveMode: ReceiveMode,
    sessionId?: string,
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<ServiceBusMessageImpl[]> {
    throwErrorIfConnectionClosed(this._context);

    if (!sequenceNumbers.length) {
      return [];
    }

    const messageList: ServiceBusMessageImpl[] = [];
    const messageBody: any = {};
    messageBody[Constants.sequenceNumbers] = [];
    for (let i = 0; i < sequenceNumbers.length; i++) {
      const sequenceNumber = sequenceNumbers[i];
      try {
        messageBody[Constants.sequenceNumbers].push(Buffer.from(sequenceNumber.toBytesBE()));
      } catch (err: any) {
        const error = translateServiceBusError(err);
        receiverLogger.logError(
          error,
          `${this.logPrefix} An error occurred while encoding the item at position ${i} in the sequenceNumbers array`
        );
        throw error;
      }
    }

    try {
      messageBody[Constants.sequenceNumbers] = types.wrap_array(
        messageBody[Constants.sequenceNumbers],
        0x81,
        undefined
      );
      const receiverSettleMode: number = receiveMode === "receiveAndDelete" ? 0 : 1;
      messageBody[Constants.receiverSettleMode] = types.wrap_uint(receiverSettleMode);
      if (sessionId != null) {
        messageBody[Constants.sessionIdMapKey] = sessionId;
      }
      const request: RheaMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.receiveBySequenceNumber,
        },
      };
      if (options?.associatedLinkName) {
        request.application_properties![Constants.associatedLinkName] = options?.associatedLinkName;
      }
      request.application_properties![Constants.trackingId] = generate_uuid();
      receiverLogger.verbose(
        "%s Receive deferred messages request body: %O.",
        this.logPrefix,
        request.body
      );

      const result = await this._makeManagementRequest(request, receiverLogger, options);
      const messages = result.body.messages as {
        message: Buffer;
        "lock-token": Buffer;
      }[];
      for (const msg of messages) {
        const decodedMessage = RheaMessageUtil.decode(msg.message);
        const message = new ServiceBusMessageImpl(
          decodedMessage as any,
          { tag: msg["lock-token"] } as any,
          false,
          receiveMode,
          options?.skipParsingBodyAsJson ?? false
        );
        messageList.push(message);
      }
      return messageList;
    } catch (err: any) {
      const error = translateServiceBusError(err);
      receiverLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the request to receive deferred messages to $management endpoint`
      );
      throw error;
    }
  }

  /**
   * Updates the disposition status of deferred messages.
   *
   * @param lockTokens - Message lock tokens to update disposition status.
   * @param dispositionStatus - The disposition status to be set
   * @param options - Optional parameters that can be provided while updating the disposition status.
   */
  async updateDispositionStatus(
    lockToken: string,
    dispositionType: DispositionType,
    // TODO: mgmt link retry<> will come in the next PR.
    options?: Omit<DispositionStatusOptions, "retryOptions"> & SendManagementRequestOptions
  ): Promise<void> {
    throwErrorIfConnectionClosed(this._context);
    if (!options) options = {};
    try {
      let dispositionStatus: "completed" | "defered" | "suspended" | "abandoned";

      if (dispositionType === DispositionType.abandon) dispositionStatus = "abandoned";
      else if (dispositionType === DispositionType.complete) dispositionStatus = "completed";
      else if (dispositionType === DispositionType.defer) dispositionStatus = "defered";
      else if (dispositionType === DispositionType.deadletter) dispositionStatus = "suspended";
      else throw new Error(`Provided "dispositionType" - ${dispositionType} is invalid`);

      const messageBody: any = {};
      const lockTokenBuffer: Buffer[] = [];
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
      const request: RheaMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.updateDisposition,
        },
      };
      if (options.associatedLinkName) {
        request.application_properties![Constants.associatedLinkName] = options.associatedLinkName;
      }
      request.application_properties![Constants.trackingId] = generate_uuid();
      receiverLogger.verbose(
        "%s Update disposition status request body: %O.",
        this.logPrefix,
        request.body
      );
      await this._makeManagementRequest(request, receiverLogger, options);
    } catch (err: any) {
      const error = translateServiceBusError(err);
      receiverLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the request to update disposition status to $management endpoint`
      );
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
  async renewSessionLock(
    sessionId: string,
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<Date> {
    throwErrorIfConnectionClosed(this._context);
    try {
      const messageBody: any = {};
      messageBody[Constants.sessionIdMapKey] = sessionId;
      const request: RheaMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.renewSessionLock,
        },
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      if (options?.associatedLinkName) {
        request.application_properties![Constants.associatedLinkName] = options?.associatedLinkName;
      }
      receiverLogger.verbose(
        "%s Renew Session Lock request body: %O.",
        this.logPrefix,
        request.body
      );
      const result = await this._makeManagementRequest(request, receiverLogger, options);
      const lockedUntilUtc = new Date(result.body.expiration);
      receiverLogger.verbose(
        "%s Lock for session '%s' will expire at %s.",
        this.logPrefix,
        sessionId,
        lockedUntilUtc.toString()
      );
      return lockedUntilUtc;
    } catch (err: any) {
      const error = translateServiceBusError(err);
      receiverLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the renew lock request to $management endpoint`
      );
      throw error;
    }
  }

  /**
   * Sets the state of the specified session.
   *
   * @param sessionId - The session for which the state needs to be set
   * @param state - The state that needs to be set.
   */
  async setSessionState(
    sessionId: string,
    state: unknown,
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<void> {
    throwErrorIfConnectionClosed(this._context);

    try {
      const messageBody: any = {};
      messageBody[Constants.sessionIdMapKey] = sessionId;
      messageBody["session-state"] = toBuffer(state);
      const request: RheaMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.setSessionState,
        },
      };
      if (options?.associatedLinkName) {
        request.application_properties![Constants.associatedLinkName] = options?.associatedLinkName;
      }
      request.application_properties![Constants.trackingId] = generate_uuid();
      receiverLogger.verbose(
        "%s Set Session state request body: %O.",
        this.logPrefix,
        request.body
      );
      await this._makeManagementRequest(request, receiverLogger, options);
    } catch (err: any) {
      const error = translateServiceBusError(err);
      receiverLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the renew lock request to $management endpoint`
      );
      throw error;
    }
  }

  /**
   * Gets the state of the specified session.
   *
   * @param sessionId - The session for which the state needs to be retrieved.
   * @returns The state of that session
   */
  async getSessionState(
    sessionId: string,
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<any> {
    throwErrorIfConnectionClosed(this._context);
    try {
      const messageBody: any = {};
      messageBody[Constants.sessionIdMapKey] = sessionId;
      const request: RheaMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.getSessionState,
        },
      };
      if (options?.associatedLinkName) {
        request.application_properties![Constants.associatedLinkName] = options?.associatedLinkName;
      }
      request.application_properties![Constants.trackingId] = generate_uuid();
      receiverLogger.verbose(
        "%s Get session state request body: %O.",
        this.logPrefix,
        request.body
      );
      const result = await this._makeManagementRequest(request, receiverLogger, options);
      return result.body["session-state"]
        ? tryToJsonDecode(result.body["session-state"])
        : result.body["session-state"];
    } catch (err: any) {
      const error = translateServiceBusError(err);
      receiverLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the renew lock request to $management endpoint`
      );
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
  async listMessageSessions(
    skip: number,
    top: number,
    lastUpdatedTime?: Date,
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<string[]> {
    throwErrorIfConnectionClosed(this._context);
    const defaultLastUpdatedTimeForListingSessions: number = 259200000; // 3 * 24 * 3600 * 1000
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
      const messageBody: any = {};
      messageBody["last-updated-time"] = lastUpdatedTime;
      messageBody["skip"] = types.wrap_int(skip);
      messageBody["top"] = types.wrap_int(top);
      const request: RheaMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.enumerateSessions,
        },
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      managementClientLogger.verbose(
        "%s List sessions request body: %O.",
        this.logPrefix,
        request.body
      );
      const response = await this._makeManagementRequest(request, managementClientLogger, options);

      return (response && response.body && response.body["sessions-ids"]) || [];
    } catch (err: any) {
      const error = translateServiceBusError(err);
      managementClientLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the renew lock request to $management endpoint`
      );
      throw error;
    }
  }

  /**
   * Get all the rules on the Subscription.
   * @returns A list of rules.
   */
  async getRules(
    options?: ListRequestOptions & OperationOptionsBase & SendManagementRequestOptions
  ): Promise<RuleProperties[]> {
    throwErrorIfConnectionClosed(this._context);
    try {
      const request: RheaMessage = {
        body: {
          top: options?.maxCount
            ? types.wrap_int(options.maxCount)
            : types.wrap_int(max32BitNumber),
          skip: options?.skip ? types.wrap_int(options.skip) : types.wrap_int(0),
        },
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.enumerateRules,
        },
      };
      request.application_properties![Constants.trackingId] = generate_uuid();

      managementClientLogger.verbose(
        "%s Get rules request body: %O.",
        this.logPrefix,
        request.body
      );
      const response = await this._makeManagementRequest(request, managementClientLogger, options);
      if (
        response.application_properties!.statusCode === 204 ||
        !response.body ||
        !Array.isArray(response.body.rules)
      ) {
        return [];
      }

      // Reference: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-amqp-request-response#response-11
      const result: { "rule-description": Typed }[] = response.body.rules || [];
      const rules: RuleProperties[] = [];
      result.forEach((x) => {
        const ruleDescriptor = x["rule-description"];
        let filter: SqlRuleFilter | CorrelationRuleFilter;

        // We use the first three elements of the `ruleDescriptor.value` to get filter, action, name
        if (
          !ruleDescriptor ||
          !ruleDescriptor.descriptor ||
          ruleDescriptor.descriptor.value !== Constants.descriptorCodes.ruleDescriptionList ||
          !Array.isArray(ruleDescriptor.value) ||
          ruleDescriptor.value.length < 3
        ) {
          return;
        }

        const filtersRawData: Typed = ruleDescriptor.value[0];
        const actionsRawData: Typed = ruleDescriptor.value[1];
        let sqlRuleAction: SqlRuleAction;
        if (
          actionsRawData.descriptor.value === Constants.descriptorCodes.sqlRuleActionList &&
          Array.isArray(actionsRawData.value) &&
          actionsRawData.value.length
        ) {
          sqlRuleAction = {
            sqlExpression: this._safelyGetTypedValueFromArray(actionsRawData.value, 0),
          };
        } else {
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
              applicationProperties:
                Array.isArray(filtersRawData.value) &&
                filtersRawData.value.length > 8 &&
                filtersRawData.value[8]
                  ? this._decodeApplicationPropertiesMap(filtersRawData.value[8])
                  : undefined,
            };
            break;
          default:
            throw new Error(
              `${this.logPrefix} Found unexpected descriptor code for the filter: ${filtersRawData.descriptor.value}`
            );
        }

        const rule: RuleProperties = {
          name: ruleDescriptor.value[2].value,
          filter,
          action: sqlRuleAction,
        };
        rules.push(rule);
      });

      return rules;
    } catch (err: any) {
      const error = translateServiceBusError(err);
      managementClientLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the get rules request to $management endpoint`
      );
      throw error;
    }
  }

  /**
   * Removes the rule on the Subscription identified by the given rule name.
   */
  async removeRule(
    ruleName: string,
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<void> {
    throwErrorIfConnectionClosed(this._context);
    throwTypeErrorIfParameterMissing(this._context.connectionId, "ruleName", ruleName);
    ruleName = String(ruleName);
    throwTypeErrorIfParameterIsEmptyString(this._context.connectionId, "ruleName", ruleName);

    try {
      const request: RheaMessage = {
        body: {
          "rule-name": types.wrap_string(ruleName),
        },
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.removeRule,
        },
      };
      request.application_properties![Constants.trackingId] = generate_uuid();

      managementClientLogger.verbose(
        "%s Remove Rule request body: %O.",
        this.logPrefix,
        request.body
      );
      await this._makeManagementRequest(request, managementClientLogger, options);
    } catch (err: any) {
      const error = translateServiceBusError(err);
      managementClientLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the remove rule request to $management endpoint`
      );
      throw error;
    }
  }

  /**
   * Adds a rule on the subscription as defined by the given rule name, filter and action
   * @param ruleName - Name of the rule
   * @param filter - A Boolean, SQL expression or a Correlation filter
   * @param sqlRuleActionExpression - Action to perform if the message satisfies the filtering expression
   */
  async addRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    sqlRuleActionExpression?: string,
    options?: OperationOptionsBase & SendManagementRequestOptions
  ): Promise<void> {
    throwErrorIfConnectionClosed(this._context);

    throwTypeErrorIfParameterMissing(this._context.connectionId, "ruleName", ruleName);
    ruleName = String(ruleName);
    throwTypeErrorIfParameterIsEmptyString(this._context.connectionId, "ruleName", ruleName);

    throwTypeErrorIfParameterMissing(this._context.connectionId, "filter", filter);
    if (!isSqlRuleFilter(filter) && !isCorrelationRuleFilter(filter)) {
      throw new TypeError(
        `The parameter "filter" should implement either the SqlRuleFilter or the CorrelationRuleFilter interface.`
      );
    }

    try {
      const ruleDescription: any = {};
      if (isSqlRuleFilter(filter)) {
        ruleDescription["sql-filter"] = {
          expression: filter.sqlExpression,
        };
      } else {
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
      const request: RheaMessage = {
        body: {
          "rule-name": types.wrap_string(ruleName),
          "rule-description": types.wrap_map(ruleDescription),
        },
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.addRule,
        },
      };
      request.application_properties![Constants.trackingId] = generate_uuid();

      managementClientLogger.verbose("%s Add Rule request body: %O.", this.logPrefix, request.body);
      await this._makeManagementRequest(request, managementClientLogger, options);
    } catch (err: any) {
      const error = translateServiceBusError(err);
      managementClientLogger.logError(
        error,
        `${this.logPrefix} An error occurred while sending the Add rule request to $management endpoint`
      );
      throw error;
    }
  }

  protected removeLinkFromContext(): void {
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
export function toScheduleableMessage(
  item: ServiceBusMessage | AmqpAnnotatedMessage,
  scheduledEnqueueTimeUtc: Date
): Record<string, unknown> {
  const rheaMessage = toRheaMessage(item, defaultDataTransformer);
  updateMessageId(rheaMessage, rheaMessage.message_id || generate_uuid());
  updateScheduledTime(rheaMessage, scheduledEnqueueTimeUtc);

  const entry: Record<string, unknown> = {
    message: RheaMessageUtil.encode(rheaMessage),
    "message-id": rheaMessage.message_id,
  };

  rheaMessage.message_annotations = {
    ...rheaMessage.message_annotations,
    [Constants.scheduledEnqueueTime]: scheduledEnqueueTimeUtc,
  };

  if (rheaMessage.group_id) {
    entry[Constants.sessionIdMapKey] = rheaMessage.group_id;
  }

  const partitionKey =
    rheaMessage.message_annotations && rheaMessage.message_annotations[Constants.partitionKey];

  if (partitionKey) {
    entry["partition-key"] = partitionKey;
  }
  return entry;
}
