// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as Long from "long";
import {
  EventContext,
  SenderEvents,
  ReceiverEvents,
  SenderOptions,
  ReceiverOptions,
  types,
  message as RheaMessageUtil,
  generate_uuid,
  Dictionary,
  string_to_uuid
} from "rhea-promise";
import {
  defaultLock,
  translate,
  Constants,
  RequestResponseLink,
  ConditionErrorNameMapper,
  AmqpMessage,
  SendRequestOptions
} from "@azure/amqp-common";
import { ClientEntityContext } from "../clientEntityContext";
import { ReceivedMessageInfo, ServiceBusMessage, SendableMessageInfo } from "../serviceBusMessage";
import { LinkEntity } from "./linkEntity";
import * as log from "../log";
import { ReceiveMode } from "./messageReceiver";
import { reorderLockTokens, toBuffer } from "../util/utils";
import { Typed } from "rhea/typings/types";
import { max32BitNumber } from "../util/constants";

/**
 * @ignore
 */
export enum DispositionStatus {
  completed = "completed",
  defered = "defered",
  suspended = "suspended",
  abandoned = "abandoned",
  renewed = "renewed"
}

/**
 * Represents a description of a rule.
 */
export interface RuleDescription {
  /**
   * Filter expression used to match messages.
   */
  filter?: SQLExpression | CorrelationFilter;
  /**
   * Action to perform if the message satisfies the filtering expression.
   */
  action?: SQLExpression;
  /**
   * Represents the name of the rule.
   */
  name: string;
}
/**
 * Represents the sql filter expression.
 */
export interface SQLExpression {
  /**
   * SQL-like condition expression that is evaluated in the broker against the arriving messages'
   * user-defined properties and system properties. All system properties must be prefixed with
   * `sys.` in the condition expression.
   */
  expression: string;
}

/**
 * Represents the correlation filter expression.
 * A CorrelationFilter holds a set of conditions that are matched against one of more of an
 * arriving message's user and system properties.
 */
export interface CorrelationFilter {
  /**
   * Identifier of the correlation.
   */
  correlationId?: string;
  /**
   * Identifier of the message.
   */
  messageId?: string;
  /**
   * Address to send to.
   */
  to?: string;
  /**
   * Address of the queue to reply to.
   */
  replyTo?: string;
  /**
   * Application specific label.
   */
  label?: string;
  /**
   * Session identifier.
   */
  sessionId?: string;
  /**
   * Session identifier to reply to.
   */
  replyToSessionId?: string;
  /**
   * Content type of the message.
   */
  contentType?: string;
  /**
   * Application specific properties of the message.
   */
  userProperties?: any;
}

/**
 * Describes the response that will be received for listing sessions.
 * @interface ListSessionsResponse
 */
export interface ListSessionsResponse {
  statusCode: number;
  statusDescription?: string | null;
  skip?: number;
  sessionIds?: string[];
}

/**
 * Describes the options that can be provided while peeking a message.
 * @interface PeekOptions
 */
export interface PeekOptions {
  /**
   * The number of messages that need to be peeked.
   * - **Default: `1`**.
   */
  messageCount?: number;
  /**
   * The id of the session for which the messages need to be peeked.
   * This should only be provided if messages are being fetched from a `session enabled` Queue or
   * Topic.
   */
  sessionId?: string;
}

/**
 * Provides information about the message to be scheduled.
 * @interface ScheduleMessage
 */
export interface ScheduleMessage {
  /**
   * @property message - The message to be scheduled
   */
  message: SendableMessageInfo;
  /**
   * @property scheduledEnqueueTimeUtc - The UTC time at which the message should be available
   * for processing.
   */
  scheduledEnqueueTimeUtc: Date;
}

export interface DispositionStatusOptions {
  /**
   * @property [propertiesToModify] A dictionary of Service Bus brokered message properties
   * to modify.
   */
  propertiesToModify?: Dictionary<any>;
  /**
   * @property [deadLetterReason] The deadletter reason. May be set if disposition status
   * is set to suspended.
   */
  deadLetterReason?: string;
  /**
   * @property [deadLetterDescription] The deadletter description. May be set if disposition status
   * is set to suspended.
   */
  deadLetterDescription?: string;
}

export interface ManagementClientOptions {
  address?: string;
  audience?: string;
}

/**
 * @class ManagementClient
 * Descibes the ServiceBus Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export class ManagementClient extends LinkEntity {
  readonly managementLock: string = `${Constants.managementRequestKey}-${generate_uuid()}`;
  /**
   * @property {string} entityPath - The name/path of the entity (queue/topic/subscription name)
   * for which the management request needs to be made.
   */
  entityPath: string;
  /**
   * @property {string} replyTo The reply to Guid for the management client.
   */
  replyTo: string = generate_uuid();
  /**
   * @property $management sender, receiver on the same session.
   * @private
   */
  private _mgmtReqResLink?: RequestResponseLink;
  /**
   * @property _lastPeekedSequenceNumber Provides the sequence number of the last peeked message.
   * @private
   */
  private _lastPeekedSequenceNumber: Long = Long.ZERO;

  /**
   * @constructor
   * Instantiates the management client.
   * @param {ClientEntityContext} context The client entity context.
   * @param {ManagementClientOptions} [options] Options to be provided for creating the
   * "$management" client.
   */
  constructor(context: ClientEntityContext, options?: ManagementClientOptions) {
    super(`${context.entityPath}/$management`, context, {
      address: options && options.address ? options.address : Constants.management,
      audience:
        options && options.audience
          ? options.audience
          : `${context.namespace.config.endpoint}${context.entityPath}/$management`
    });
    this._context = context;
    this.entityPath = context.namespace.config.entityPath as string;
  }

  /**
   * Closes the AMQP management session to the ServiceBus namespace for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @return Promise<void>
   */
  async close(): Promise<void> {
    try {
      if (this._isMgmtRequestResponseLinkOpen()) {
        const mgmtLink = this._mgmtReqResLink;
        this._mgmtReqResLink = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
        await mgmtLink!.close();
        log.mgmt("Successfully closed the management session.");
      }
    } catch (err) {
      const msg = `An error occurred while closing the management session: ${err}`;
      log.error(msg);
      throw new Error(msg);
    }
  }

  /**
   * Fetches the next batch of active messages. The first call to `peek()` fetches the first
   * active message for this client. Each subsequent call fetches the subsequent message in the
   * entity.
   *
   * Unlike a `received` message, `peeked` message will not have lock token associated with it,
   * and hence it cannot be `Completed/Abandoned/Deferred/Deadlettered/Renewed`. Also, unlike
   * `receive() | receiveBatch()` this method will fetch even Deferred messages
   * (but not Deadlettered message).
   * @param {number} [messageCount] The number of messages to retrieve. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peek(messageCount?: number): Promise<ReceivedMessageInfo[]> {
    return this.peekBySequenceNumber(this._lastPeekedSequenceNumber.add(1), {
      messageCount: messageCount
    });
  }

  /**
   * Fetches the next batch of active messages in the current MessageSession. The first call to
   * `peek()` fetches the first active message for this client. Each subsequent call fetches the
   * subsequent message in the entity.
   *
   * Unlike a `received` message, `peeked` message will not have lock token associated with it,
   * and hence it cannot be `Completed/Abandoned/Deferred/Deadlettered/Renewed`. Also, unlike
   * `receive() | receiveBatch()` this method will also fetch `Deferred` messages, but
   * **NOT** `Deadlettered` messages.
   * @param {string} sessionId The sessionId from which messages need to be peeked.
   * @param {number} [messageCount] The number of messages to retrieve. Default value `1`.
   * @returns Promise<ReceivedMessageInfo[]>
   */
  async peekMessagesBySession(
    sessionId: string,
    messageCount?: number
  ): Promise<ReceivedMessageInfo[]> {
    if (sessionId == undefined) {
      throw new Error("'sessionId' is a required parameter and must be of type 'string'.");
    }
    return this.peekBySequenceNumber(this._lastPeekedSequenceNumber.add(1), {
      sessionId: sessionId,
      messageCount: messageCount
    });
  }

  /**
   * Peeks the desired number of messages from the specified sequence number.
   * @param {Long} fromSequenceNumber The sequence number from where to read the message.
   * @param {PeekOptions} [options] Options that can be provided while peeking messages.
   * @returns Promise<ReceivedMessageInfo[]>
   */
  async peekBySequenceNumber(
    fromSequenceNumber: Long,
    options?: PeekOptions
  ): Promise<ReceivedMessageInfo[]> {
    if (!options) options = {};
    if (fromSequenceNumber == undefined || !Long.isLong(fromSequenceNumber)) {
      throw new Error(
        "'fromSequenceNumber' is a required parameter and must be an instance of 'Long'."
      );
    }
    if (options.messageCount != undefined && typeof options.messageCount !== "number") {
      throw new Error("'messageCount' must be of type 'number'.");
    }
    if (options.sessionId != undefined && typeof options.sessionId !== "string") {
      throw new Error("'sessionId' must be of type 'string'.");
    }
    if (options.messageCount == undefined) options.messageCount = 1;
    const messageList: ReceivedMessageInfo[] = [];
    try {
      const messageBody: any = {};
      messageBody[Constants.fromSequenceNumber] = types.wrap_long(
        Buffer.from(fromSequenceNumber.toBytesBE())
      );
      messageBody[Constants.messageCount] = types.wrap_int(options.messageCount);
      if (options.sessionId) {
        messageBody[Constants.sessionIdMapKey] = options.sessionId;
      }
      const request: AmqpMessage = {
        body: messageBody,
        message_id: generate_uuid(),
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.peekMessage
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt(
        "[%s] Peek by sequence number request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });

      const result = await this._mgmtReqResLink!.sendRequest(request);
      if (result.application_properties!.statusCode !== 204) {
        const messages = result.body.messages as { message: Buffer }[];
        for (const msg of messages) {
          const decodedMessage = RheaMessageUtil.decode(msg.message);
          const message = ReceivedMessageInfo.fromAmqpMessage(decodedMessage as any);
          message.body = this._context.namespace.dataTransformer.decode(message.body);
          messageList.push(message);
          this._lastPeekedSequenceNumber = message.sequenceNumber!;
        }
      }
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the request to peek messages to " +
          "$management endpoint: %O",
        error
      );
      // statusCode == 404 then do not throw
      if (error.name !== ConditionErrorNameMapper["com.microsoft:message-not-found"]) {
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
   * @param {string | ServiceBusMessage} lockTokenOrMessage Lock token of the message or
   * the message itself.
   * @param {SendRequestOptions} [options] Options that can be set while sending the request.
   * @returns {Promise<Date>} Promise<Date> New lock token expiry date and time in UTC format.
   */
  async renewLock(
    lockTokenOrMessage: string | ServiceBusMessage,
    options?: SendRequestOptions
  ): Promise<Date> {
    if (!lockTokenOrMessage) {
      throw new Error("'lockTokenOrMessage' is a required parameter.");
    }
    if (typeof lockTokenOrMessage !== "object" && typeof lockTokenOrMessage !== "string") {
      throw new Error("'lockTokenOrMessage must be of type 'string' or of type 'object'.");
    }
    if (!options) options = {};
    if (options.delayInSeconds == undefined) options.delayInSeconds = 1;
    if (options.timeoutInSeconds == undefined) options.timeoutInSeconds = 5;
    if (options.times == undefined) options.times = 5;
    const lockToken: string = (lockTokenOrMessage as ServiceBusMessage).lockToken
      ? ((lockTokenOrMessage as ServiceBusMessage).lockToken as string)
      : (lockTokenOrMessage as string);
    try {
      const messageBody: any = {};
      messageBody[Constants.lockTokens] = types.wrap_array(
        reorderLockTokens([lockToken]),
        0x98,
        undefined
      );
      const request: AmqpMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.renewLock
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt(
        "[%s] Renew message Lock request: %O.",
        this._context.namespace.connectionId,
        request
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });
      const result = await this._mgmtReqResLink!.sendRequest(request, options);
      const lockedUntilUtc = new Date(result.body.expirations[0]);
      if (typeof lockTokenOrMessage === "object") {
        (lockTokenOrMessage as ServiceBusMessage).lockedUntilUtc = lockedUntilUtc;
      }
      return lockedUntilUtc;
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the renew lock request to $management " + "endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Schedules an array of messages to appear on Service Bus at a later time.
   *
   * @param messages - An array of messages that needs to be scheduled.
   * @returns Promise<number> The sequence numbers of messages that were scheduled.
   */
  async scheduleMessages(messages: ScheduleMessage[]): Promise<Long[]> {
    if (!Array.isArray(messages)) {
      throw new Error("'messages' is a required parameter of type 'Array'.");
    }
    const messageBody: any[] = [];
    for (let i = 0; i < messages.length; i++) {
      const item = messages[i];
      if (typeof item.message !== "object") {
        throw new Error("'message' is a required property and must be of type 'object'.");
      }
      if (!(item.scheduledEnqueueTimeUtc instanceof Date)) {
        throw new Error(
          "'scheduledEnqueueTimeUtc' is a required property and must be of type 'Date'."
        );
      }
      const now = Date.now();
      const enqueueTimeInMs = item.scheduledEnqueueTimeUtc.getTime();
      if (enqueueTimeInMs < now) {
        throw new Error(
          `Cannot schedule messages in the past. Given scheduledEnqueueTimeUtc` +
            `(${enqueueTimeInMs}) < current time (${now}).`
        );
      }
      item.message.scheduledEnqueueTimeUtc = item.scheduledEnqueueTimeUtc;
      if (!item.message.messageId) item.message.messageId = generate_uuid();
      SendableMessageInfo.validate(item.message);
      const amqpMessage = SendableMessageInfo.toAmqpMessage(item.message);

      try {
        const entry: any = {
          message: RheaMessageUtil.encode(amqpMessage),
          "message-id": item.message.messageId
        };
        if (item.message.sessionId) {
          entry[Constants.sessionIdMapKey] = item.message.sessionId;
        }
        if (item.message.partitionKey) {
          entry["partition-key"] = item.message.partitionKey;
        }
        if (item.message.viaPartitionKey) {
          entry["via-partition-key"] = item.message.viaPartitionKey;
        }

        const wrappedEntry = types.wrap_map(entry);
        messageBody.push(wrappedEntry);
      } catch (err) {
        const error = translate(err);
        log.error(
          "An error occurred while encoding the item at position %d in the messages array" + ": %O",
          i,
          error
        );
        throw error;
      }
    }
    try {
      const request: AmqpMessage = {
        body: { messages: messageBody },
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.scheduleMessage
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt(
        "[%s] Schedule messages request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });
      const result = await this._mgmtReqResLink!.sendRequest(request);
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
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the request to schedule messages to " +
          "$management endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Cancels an array of messages that were scheduled.
   * @param sequenceNumbers - An Array of sequence numbers of the message to be cancelled.
   * @returns Promise<void>
   */
  async cancelScheduledMessages(sequenceNumbers: Long[]): Promise<void> {
    if (!Array.isArray(sequenceNumbers)) {
      throw new Error("'sequenceNumbers' is a required parameter of type 'Array'.");
    }
    const messageBody: any = {};
    messageBody[Constants.sequenceNumbers] = [];
    for (let i = 0; i < sequenceNumbers.length; i++) {
      const sequenceNumber = sequenceNumbers[i];
      if (!Long.isLong(sequenceNumber)) {
        throw new Error("An item in the 'sequenceNumbers' Array must be an instance of 'Long'.");
      }
      try {
        messageBody[Constants.sequenceNumbers].push(Buffer.from(sequenceNumber.toBytesBE()));
      } catch (err) {
        const error = translate(err);
        log.error(
          "An error occurred while encoding the item at position %d in the " +
            "sequenceNumbers array: %O",
          i,
          error
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
      const request: AmqpMessage = {
        body: messageBody,
        message_id: generate_uuid(),
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.cancelScheduledMessage
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt(
        "[%s] Cancel scheduled messages request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });
      await this._mgmtReqResLink!.sendRequest(request);
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the request to cancel the scheduled message to " +
          "$management endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Receives a specific deferred message identified by `sequenceNumber` of the `Message`.
   * @param sequenceNumber The sequence number of the message that will be received.
   * @param receiveMode The mode in which the receiver was created.
   * @returns Promise<ServiceBusMessage | undefined>
   * - Returns `ServiceBusMessage` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * - Throws an error if the message has not been deferred.
   */
  async receiveDeferredMessage(
    sequenceNumber: Long,
    receiveMode: ReceiveMode,
    sessionId?: string
  ): Promise<ServiceBusMessage | undefined> {
    if (!Long.isLong(sequenceNumber)) {
      throw new Error(
        "'sequenceNumber' is a required parameter and must be an instance of 'Long'."
      );
    }
    let message: ServiceBusMessage | undefined = undefined;
    const messages = await this.receiveDeferredMessages([sequenceNumber], receiveMode, sessionId);
    if (messages.length) {
      message = messages[0];
    }
    return message;
  }

  /**
   * Receives a list of deferred messages identified by `sequenceNumbers`.
   * @param sequenceNumbers A list containing the sequence numbers to receive.
   * @param receiveMode The mode in which the receiver was created.
   * @returns Promise<ServiceBusMessage[]>
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * - Throws an error if the messages have not been deferred.
   */
  async receiveDeferredMessages(
    sequenceNumbers: Long[],
    receiveMode: ReceiveMode,
    sessionId?: string
  ): Promise<ServiceBusMessage[]> {
    if (!Array.isArray(sequenceNumbers)) {
      throw new Error("'sequenceNumbers' is a required parameter and must be of type 'Array'.");
    }

    if (typeof receiveMode !== "number") {
      throw new Error("'receiveMode' is a required parameter with value 1 or 2.");
    }

    if (sessionId && typeof sessionId !== "string") {
      throw new Error("'sessionId' must be of type 'string'.");
    }

    const messageList: ServiceBusMessage[] = [];
    const messageBody: any = {};
    messageBody[Constants.sequenceNumbers] = [];
    for (let i = 0; i < sequenceNumbers.length; i++) {
      const sequenceNumber = sequenceNumbers[i];
      if (!Long.isLong(sequenceNumber)) {
        throw new Error("An item in the 'sequenceNumbers' Array must be an instance of 'Long'.");
      }
      try {
        messageBody[Constants.sequenceNumbers].push(Buffer.from(sequenceNumber.toBytesBE()));
      } catch (err) {
        const error = translate(err);
        log.error(
          "An error occurred while encoding the item at position %d in the " +
            "sequenceNumbers array: %O",
          i,
          error
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
      const receiverSettleMode: number = receiveMode === ReceiveMode.receiveAndDelete ? 0 : 1;
      messageBody[Constants.receiverSettleMode] = types.wrap_ubyte(receiverSettleMode);
      if (sessionId != undefined) {
        messageBody[Constants.sessionIdMapKey] = sessionId;
      }
      const request: AmqpMessage = {
        body: messageBody,
        message_id: generate_uuid(),
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.receiveBySequenceNumber
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt(
        "[%s] Receive deferred messages request bosy: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });

      const result = await this._mgmtReqResLink!.sendRequest(request);
      const messages = result.body.messages as {
        message: Buffer;
        "lock-token": Buffer;
      }[];
      for (const msg of messages) {
        const decodedMessage = RheaMessageUtil.decode(msg.message);
        const message = new ServiceBusMessage(
          this._context,
          decodedMessage as any,
          { tag: msg["lock-token"] } as any
        );
        this._context.requestResponseLockedMessages.set(
          message.lockToken!,
          message.lockedUntilUtc!
        );
        messageList.push(message);
      }
      return messageList;
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the request to receive deferred messages to " +
          "$management endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Updates the disposition status of deferred messages.
   *
   * @param lockTokens Message lock tokens to update disposition status.
   * @param dispositionStatus The disposition status to be set
   * @param options Optional parameters that can be provided while updating the disposition status.
   *
   * @returns Promise<void>
   */
  async updateDispositionStatus(
    lockTokens: string[],
    dispositionStatus: DispositionStatus,
    options?: DispositionStatusOptions
  ): Promise<void> {
    if (!Array.isArray(lockTokens)) {
      throw new Error("'lockTokens' is a required parameter and must be of type 'Array'.");
    }
    if (!dispositionStatus || typeof dispositionStatus !== "string") {
      throw new Error("'dispositionStatus' is a required parameter and must be of type 'string'.");
    }
    if (!options) options = {};
    try {
      const messageBody: any = {};
      const lockTokenBuffer: Buffer[] = [];
      for (const lockToken of lockTokens) {
        lockTokenBuffer.push(string_to_uuid(lockToken));
      }
      messageBody[Constants.lockTokens] = types.wrap_array(lockTokenBuffer, 0x98, undefined);
      messageBody[Constants.dispositionStatus] = dispositionStatus;
      if (options.deadLetterDescription != undefined) {
        messageBody[Constants.deadLetterDescription] = options.deadLetterDescription;
      }
      if (options.deadLetterReason != undefined) {
        messageBody[Constants.deadLetterReason] = options.deadLetterReason;
      }
      if (options.propertiesToModify != undefined) {
        messageBody[Constants.propertiesToModify] = options.propertiesToModify;
      }
      const request: AmqpMessage = {
        body: messageBody,
        message_id: generate_uuid(),
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.updateDisposition
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt(
        "[%s] Update disposition status request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });
      await this._mgmtReqResLink!.sendRequest(request);
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the request to update disposition status to " +
          "$management endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Renews the lock for the specified session.
   * @param sessionId Id of the session for which the lock needs to be renewed
   * @param options Options that can be set while sending the request.
   * @returns Promise<Date> New lock token expiry date and time in UTC format.
   */
  async renewSessionLock(sessionId: string, options?: SendRequestOptions): Promise<Date> {
    if (typeof sessionId !== "string") {
      throw new Error("'sessionId' is a required parameter and must be of type 'string'.");
    }
    if (!options) options = {};
    if (options.delayInSeconds == undefined) options.delayInSeconds = 1;
    if (options.timeoutInSeconds == undefined) options.timeoutInSeconds = 5;
    if (options.times == undefined) options.times = 5;
    try {
      const messageBody: any = {};
      messageBody[Constants.sessionIdMapKey] = sessionId;
      const request: AmqpMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.renewSessionLock
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt(
        "[%s] Renew Session Lock request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });
      const result = await this._mgmtReqResLink!.sendRequest(request, options);
      const lockedUntilUtc = new Date(result.body.expiration);
      log.mgmt(
        "[%s] Lock for session '%s' will expire at %s.",
        this._context.namespace.connectionId,
        sessionId,
        lockedUntilUtc.toString()
      );
      return lockedUntilUtc;
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the renew lock request to $management " + "endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Sets the state of the specified session.
   * @param sessionId The session for which the state needs to be set
   * @param state The state that needs to be set.
   * @returns Promise<void>
   */
  async setSessionState(sessionId: string, state: any): Promise<void> {
    if (typeof sessionId !== "string") {
      throw new Error("'sessionId' is a required parameter and must be of type 'string'.");
    }

    try {
      const messageBody: any = {};
      messageBody[Constants.sessionIdMapKey] = sessionId;
      messageBody["session-state"] = toBuffer(state);
      const request: AmqpMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.setSessionState
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt(
        "[%s] Set Session state request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });
      await this._mgmtReqResLink!.sendRequest(request);
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the renew lock request to $management " + "endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Gets the state of the specified session.
   * @param sessionId The session for which the state needs to be retrieved.
   * @returns Promise<any> The state of that session
   */
  async getSessionState(sessionId: string): Promise<any> {
    if (typeof sessionId !== "string") {
      throw new Error("'sessionId' is a required parameter and must be of type 'string'.");
    }
    try {
      const messageBody: any = {};
      messageBody[Constants.sessionIdMapKey] = sessionId;
      const request: AmqpMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.getSessionState
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt(
        "[%s] Get session state request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });
      const result = await this._mgmtReqResLink!.sendRequest(request);
      return result.body["session-state"]
        ? this._context.namespace.dataTransformer.decode(result.body["session-state"])
        : result.body["session-state"];
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the renew lock request to $management " + "endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Lists the sessions on the ServiceBus Queue/Topic.
   * @param lastUpdateTime Filter to include only sessions updated after a given time.
   * @param skip The number of sessions to skip
   * @param top Maximum numer of sessions.
   * @returns Promise<ListSessionsResponse> A list of sessions.
   */
  async listMessageSessions(
    skip: number,
    top: number,
    lastUpdatedTime?: Date
  ): Promise<ListSessionsResponse> {
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
      const request: AmqpMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.enumerateSessions
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt(
        "[%s] List sessions request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });
      const response = await this._mgmtReqResLink!.sendRequest(request);
      const result: ListSessionsResponse = {
        statusCode: response.application_properties!.statusCode,
        statusDescription: response.application_properties!.statusDescription
      };
      if (response && response.body) {
        if (response.body.skip) {
          result.skip = response.body.skip;
        }
        if (response.body["sessions-ids"]) {
          result.sessionIds = response.body["sessions-ids"];
        }
      }
      return result;
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the renew lock request to $management " + "endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Get all the rules on the Subscription.
   * @returns Promise<RuleDescription[]> A list of rules.
   */
  async getRules(): Promise<RuleDescription[]> {
    try {
      const request: AmqpMessage = {
        body: {
          top: types.wrap_int(max32BitNumber),
          skip: types.wrap_int(0)
        },
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.enumerateRules
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();

      log.mgmt(
        "[%s] Get rules request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });

      const response = await this._mgmtReqResLink!.sendRequest(request);
      if (
        response.application_properties!.statusCode === 204 ||
        !response.body ||
        !Array.isArray(response.body.rules)
      ) {
        return [];
      }

      // Reference: https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-amqp-request-response#response-11
      const result: { "rule-description": Typed }[] = response.body.rules || [];
      const rules: RuleDescription[] = [];
      result.forEach((x) => {
        const ruleDescriptor = x["rule-description"];

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
        const rule: RuleDescription = {
          name: ruleDescriptor.value[2].value
        };

        switch (filtersRawData.descriptor.value) {
          case Constants.descriptorCodes.trueFilterList:
            rule.filter = {
              expression: "1=1"
            };
            break;
          case Constants.descriptorCodes.falseFilterList:
            rule.filter = {
              expression: "1=0"
            };
            break;
          case Constants.descriptorCodes.sqlFilterList:
            rule.filter = {
              expression: this._safelyGetTypedValueFromArray(filtersRawData.value, 0)
            };
            break;
          case Constants.descriptorCodes.correlationFilterList:
            rule.filter = {
              correlationId: this._safelyGetTypedValueFromArray(filtersRawData.value, 0),
              messageId: this._safelyGetTypedValueFromArray(filtersRawData.value, 1),
              to: this._safelyGetTypedValueFromArray(filtersRawData.value, 2),
              replyTo: this._safelyGetTypedValueFromArray(filtersRawData.value, 3),
              label: this._safelyGetTypedValueFromArray(filtersRawData.value, 4),
              sessionId: this._safelyGetTypedValueFromArray(filtersRawData.value, 5),
              replyToSessionId: this._safelyGetTypedValueFromArray(filtersRawData.value, 6),
              contentType: this._safelyGetTypedValueFromArray(filtersRawData.value, 7),
              userProperties: this._safelyGetTypedValueFromArray(filtersRawData.value, 8)
            };
            break;
          default:
            log.mgmt(
              `Found unexpected descriptor code for the filter: ${filtersRawData.descriptor.value}`
            );
            break;
        }

        if (
          actionsRawData.descriptor.value === Constants.descriptorCodes.sqlRuleActionList &&
          Array.isArray(actionsRawData.value) &&
          actionsRawData.value.length
        ) {
          rule.action = {
            expression: this._safelyGetTypedValueFromArray(actionsRawData.value, 0)
          };
        }

        rules.push(rule);
      });

      return rules;
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the get rules request to $management " + "endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Removes the rule on the Subscription identified by the given rule name.
   * @param ruleName
   */
  async removeRule(ruleName: string): Promise<void> {
    if (!ruleName || typeof ruleName !== "string") {
      throw new Error("Cannot remove rule. Rule name is missing or is not a string.");
    }
    try {
      const request: AmqpMessage = {
        body: {
          "rule-name": types.wrap_string(ruleName)
        },
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.removeRule
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();

      log.mgmt(
        "[%s] Remove Rule request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });

      await this._mgmtReqResLink!.sendRequest(request);
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the remove rule request to $management " + "endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * Adds a rule on the subscription as defined by the given rule name, filter and action
   * @param ruleName Name of the rule
   * @param filter A Boolean, SQL expression or a Correlation filter
   * @param sqlRuleActionExpression Action to perform if the message satisfies the filtering expression
   */
  async addRule(
    ruleName: string,
    filter: boolean | string | CorrelationFilter,
    sqlRuleActionExpression?: string
  ): Promise<void> {
    if (!ruleName || typeof ruleName !== "string") {
      throw new Error("Cannot add rule. Rule name is missing or is not a string.");
    }
    if (!filter) {
      throw new Error("Cannot add rule. Filter is missing.");
    }
    if (sqlRuleActionExpression && typeof sqlRuleActionExpression !== "string") {
      throw new Error("Cannot add rule. Given action expression is not a string.");
    }
    try {
      const ruleDescription: any = {};
      switch (typeof filter) {
        case "boolean":
          ruleDescription["sql-filter"] = {
            expression: filter ? "1=1" : "1=0"
          };
          break;
        case "string":
          ruleDescription["sql-filter"] = {
            expression: filter
          };
          break;
        default:
          ruleDescription["correlation-filter"] = {
            "correlation-id": filter.correlationId,
            "message-id": filter.messageId,
            to: filter.to,
            "reply-to": filter.replyTo,
            label: filter.label,
            "session-id": filter.sessionId,
            "reply-to-session-id": filter.replyToSessionId,
            "content-type": filter.contentType,
            properties: filter.userProperties
          };
          break;
      }

      if (sqlRuleActionExpression && typeof sqlRuleActionExpression === "string") {
        ruleDescription["sql-rule-action"] = sqlRuleActionExpression;
      }

      const request: AmqpMessage = {
        body: {
          "rule-name": types.wrap_string(ruleName),
          "rule-description": types.wrap_map(ruleDescription)
        },
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.addRule
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();

      log.mgmt(
        "[%s] Add Rule request body: %O.",
        this._context.namespace.connectionId,
        request.body
      );
      log.mgmt(
        "[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId
      );
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });

      await this._mgmtReqResLink!.sendRequest(request);
    } catch (err) {
      const error = translate(err);
      log.error(
        "An error occurred while sending the Add rule request to $management " + "endpoint: %O",
        error
      );
      throw error;
    }
  }

  /**
   * @ignore
   */
  private async _init(): Promise<void> {
    try {
      if (!this._isMgmtRequestResponseLinkOpen()) {
        await this._negotiateClaim();
        const rxopt: ReceiverOptions = {
          source: { address: this.address },
          name: this.replyTo,
          target: { address: this.replyTo },
          onSessionError: (context: EventContext) => {
            const id = context.connection.options.id;
            const ehError = translate(context.session!.error!);
            log.error(
              "[%s] An error occurred on the session for request/response links for " +
                "$management: %O",
              id,
              ehError
            );
          }
        };
        const sropt: SenderOptions = { target: { address: this.address } };
        log.mgmt(
          "[%s] Creating sender/receiver links on a session for $management endpoint with " +
            "srOpts: %o, receiverOpts: %O.",
          this._context.namespace.connectionId,
          sropt,
          rxopt
        );
        this._mgmtReqResLink = await RequestResponseLink.create(
          this._context.namespace.connection,
          sropt,
          rxopt
        );
        this._mgmtReqResLink.sender.on(SenderEvents.senderError, (context: EventContext) => {
          const id = context.connection.options.id;
          const ehError = translate(context.sender!.error!);
          log.error("[%s] An error occurred on the $management sender link.. %O", id, ehError);
        });
        this._mgmtReqResLink.receiver.on(ReceiverEvents.receiverError, (context: EventContext) => {
          const id = context.connection.options.id;
          const ehError = translate(context.receiver!.error!);
          log.error("[%s] An error occurred on the $management receiver link.. %O", id, ehError);
        });
        log.mgmt(
          "[%s] Created sender '%s' and receiver '%s' links for $management endpoint.",
          this._context.namespace.connectionId,
          this._mgmtReqResLink.sender.name,
          this._mgmtReqResLink.receiver.name
        );
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      log.error(
        "[%s] An error occured while establishing the $management links: %O",
        this._context.namespace.connectionId,
        err
      );
      throw err;
    }
  }

  /**
   * @ignore
   */
  private _isMgmtRequestResponseLinkOpen(): boolean {
    return this._mgmtReqResLink! && this._mgmtReqResLink!.isOpen();
  }

  /**
   * Given array of typed values, returns the element in given index
   */
  private _safelyGetTypedValueFromArray(data: Typed[], index: number): any {
    return Array.isArray(data) && data.length > index && data[index]
      ? data[index].value
      : undefined;
  }
}
