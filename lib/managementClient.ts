// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as Long from "long";
import {
  EventContext, SenderEvents, ReceiverEvents, SenderOptions, ReceiverOptions, types,
  message as RheaMessageUtil, generate_uuid, Dictionary, string_to_uuid
} from "rhea-promise";
import {
  defaultLock, translate, Constants, RequestResponseLink, ConditionErrorNameMapper, AmqpMessage
} from "@azure/amqp-common";
import { ClientEntityContext } from "./clientEntityContext";
import { ReceivedMessageInfo, ServiceBusMessage, SendableMessageInfo } from "./serviceBusMessage";
import { LinkEntity } from "./linkEntity";
import * as log from "./log";
import { ReceiveMode } from "./messageReceiver";
import { reorderLockTokens } from "./util/utils";

export enum DispositionStatus {
  completed = "completed",
  defered = "defered",
  suspended = "suspended",
  abandoned = "abandoned",
  renewed = "renewed"
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
 * Descibes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export class ManagementClient extends LinkEntity {

  readonly managementLock: string = `${Constants.managementRequestKey}-${generate_uuid()}`;
  /**
   * @property {string} entityPath - The name/path of the entity (hub name) for which the management
   * request needs to be made.
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
      audience: options && options.audience ? options.audience :
        `${context.namespace.config.endpoint}${context.entityPath}/$management`
    });
    this._context = context;
    this.entityPath = context.namespace.config.entityPath as string;
  }

  /**
   * Closes the AMQP management session to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @return {Promise<void>}
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
    return await this.peekBySequenceNumber(this._lastPeekedSequenceNumber.add(1), messageCount);
  }

  /**
   * Peeks the desired number of messages from the specified sequence number.
   * @param {Long} fromSequenceNumber The sequence number from where to read the message.
   * @param {number} [messageCount] The number of messages to retrieve. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peekBySequenceNumber(fromSequenceNumber: Long, messageCount?: number): Promise<ReceivedMessageInfo[]> {
    if (fromSequenceNumber == undefined || !Long.isLong(fromSequenceNumber)) {
      throw new Error("'fromSequenceNumber' is a required parameter and must be an instance of 'Long'.");
    }
    if (messageCount != undefined && typeof messageCount !== "number") {
      throw new Error("'messageCount' must be of type 'number'.");
    }
    if (messageCount == undefined) messageCount = 1;
    const messageList: ReceivedMessageInfo[] = [];
    try {
      const messageBody: any = {};
      messageBody[Constants.fromSequenceNumber] =
        types.wrap_long(Buffer.from(fromSequenceNumber.toBytesBE()));
      messageBody[Constants.messageCount] = types.wrap_int(messageCount);
      const request: AmqpMessage = {
        body: messageBody,
        message_id: generate_uuid(),
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.peekMessage
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt("Peek by sequence number request: %O.", request);
      log.mgmt("[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId);
      await defaultLock.acquire(this.managementLock, () => { return this._init(); });

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
      log.error("An error occurred while sending the request to peek messages to " +
        "$management endpoint: %O", error);
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
   * @returns {Promise<Date>} Promise<Date> New lock token expiry date and time in UTC format.
   */
  async renewLock(lockTokenOrMessage: string | ServiceBusMessage): Promise<Date> {
    if (!lockTokenOrMessage) {
      throw new Error("'lockTokenOrMessage' is a required parameter.");
    }
    if (typeof lockTokenOrMessage !== "object" && typeof lockTokenOrMessage !== "string") {
      throw new Error("'lockTokenOrMessage must be of type 'string' or of type 'object'.");
    }

    const lockToken: string = (lockTokenOrMessage as ServiceBusMessage).lockToken
      ? (lockTokenOrMessage as ServiceBusMessage).lockToken as string
      : lockTokenOrMessage as string;
    try {
      const messageBody: any = {};
      messageBody[Constants.lockTokens] = types.wrap_array(reorderLockTokens([lockToken]), 0x98, undefined);
      const request: AmqpMessage = {
        body: messageBody,
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.renewLock
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt("Renew Lock request: %O.", request);
      log.mgmt("[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId);
      await defaultLock.acquire(this.managementLock, () => { return this._init(); });
      const result = await this._mgmtReqResLink!.sendRequest(request);
      const lockedUntilUtc = new Date(result.body.expirations[0]);
      if (typeof lockTokenOrMessage === "object") {
        (lockTokenOrMessage as ServiceBusMessage).lockedUntilUtc = lockedUntilUtc;
      }
      return lockedUntilUtc;
    } catch (err) {
      const error = translate(err);
      log.error("An error occurred while sending the renew lock request to $management " +
        "endpoint: %O", error);
      throw error;
    }
  }

  /**
   * Schedules a message to appear on Service Bus at a later time.
   *
   * @param {SendableMessageInfo} message message that needs to be scheduled.
   * @param {Date} scheduledEnqueueTimeUtc The UTC time at which the message should be available
   * for processing.
   * @returns {Promise<number>} Promise<number> The sequence number of the message that was
   * scheduled.
   */
  async scheduleMessage(message: SendableMessageInfo, scheduledEnqueueTimeUtc: Date): Promise<Long> {
    if (typeof message !== "object") {
      throw new Error("'message' is a required parameter and must be of type 'object'.");
    }
    if (!(scheduledEnqueueTimeUtc instanceof Date)) {
      throw new Error("'scheduledEnqueueTimeUtc' is a required parameter and must be of type 'Date'.");
    }
    const now = Date.now();
    const enqueueTimeInMs = scheduledEnqueueTimeUtc.getTime();
    if (enqueueTimeInMs < now) {
      throw new Error(`Cannot schedule messages in the past. Given scheduledEnqueueTimeUtc` +
        `(${enqueueTimeInMs}) < current time (${now}).`);
    }
    message.scheduledEnqueueTimeUtc = scheduledEnqueueTimeUtc;
    if (!message.messageId) message.messageId = generate_uuid();
    SendableMessageInfo.validate(message);
    const amqpMessage = SendableMessageInfo.toAmqpMessage(message);

    try {
      const entry: any = {
        "message": RheaMessageUtil.encode(amqpMessage),
        "message-id": message.messageId
      };
      if (message.sessionId) {
        entry["session-id"] = message.sessionId;
      }
      if (message.partitionKey) {
        entry["partition-key"] = message.partitionKey;
      }
      if (message.viaPartitionKey) {
        entry["via-partition-key"] = message.viaPartitionKey;
      }

      const wrappedEntry = types.wrap_map(entry);
      const messageBody: any[] = [wrappedEntry];

      const request: AmqpMessage = {
        body: { messages: messageBody },
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.scheduleMessage
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt("Schedule message request: %O.", request);
      log.mgmt("[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId);
      await defaultLock.acquire(this.managementLock, () => { return this._init(); });
      const result = await this._mgmtReqResLink!.sendRequest(request);
      if (typeof result.body[Constants.sequenceNumbers][0] === "number") {
        return Long.fromNumber(result.body[Constants.sequenceNumbers][0]);
      } else {
        return Long.fromBytesBE(result.body[Constants.sequenceNumbers][0]);
      }
    } catch (err) {
      const error = translate(err);
      log.error("An error occurred while sending the request to schedule message to " +
        "$management endpoint: %O", error);
      throw error;
    }
  }

  /**
   * Cancels a message that was scheduled.
   * @param {Long} sequenceNumber The sequence number of the message to be cancelled.
   * @returns {Promise<void>} Promise<void>
   */
  async cancelScheduledMessage(sequenceNumber: Long): Promise<void> {
    if (!Long.isLong(sequenceNumber)) {
      throw new Error("'sequenceNumber' is a required parameter and must be an instance of 'Long'.");
    }

    try {
      const messageBody: any = {};
      messageBody[Constants.sequenceNumbers] =
        types.wrap_array([Buffer.from(sequenceNumber.toBytesBE())], 0x81, undefined);
      const request: AmqpMessage = {
        body: messageBody,
        message_id: generate_uuid(),
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.cancelScheduledMessage
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt("Cancel scheduled message request: %O.", request);
      log.mgmt("[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId);
      await defaultLock.acquire(this.managementLock, () => { return this._init(); });

      await this._mgmtReqResLink!.sendRequest(request);
    } catch (err) {
      const error = translate(err);
      log.error("An error occurred while sending the request to cancel the scheduled message to " +
        "$management endpoint: %O", error);
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
  async receiveDeferredMessage(sequenceNumber: Long, receiveMode: ReceiveMode): Promise<ServiceBusMessage | undefined> {
    if (!Long.isLong(sequenceNumber)) {
      throw new Error("'sequenceNumber' is a required parameter and must be an instance of 'Long'.");
    }
    let message: ServiceBusMessage | undefined = undefined;
    const messages = await this.receiveDeferredMessages([sequenceNumber], receiveMode);
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
  async receiveDeferredMessages(sequenceNumbers: Long[], receiveMode: ReceiveMode): Promise<ServiceBusMessage[]> {
    if (!Array.isArray(sequenceNumbers)) {
      throw new Error("'sequenceNumbers' is a required parameter and must be of type 'Array'.");
    }

    if (typeof receiveMode !== 'number') {
      throw new Error("'receiveMode' is a required parameter with value 1 or 2.");
    }

    const messageList: ServiceBusMessage[] = [];

    try {
      const messageBody: any = {};
      messageBody["sequence-numbers"] = types.wrap_array(sequenceNumbers.map((i) => { return Buffer.from(i.toBytesBE()); }), 0x81, undefined);
      const receiverSettleMode: number = receiveMode === ReceiveMode.receiveAndDelete ? 0 : 1;
      messageBody[Constants.receiverSettleMode] = types.wrap_ubyte(receiverSettleMode);
      const request: AmqpMessage = {
        body: messageBody,
        message_id: generate_uuid(),
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.operations.receiveBySequenceNumber
        }
      };
      request.application_properties![Constants.trackingId] = generate_uuid();
      log.mgmt("Receive deferred messages request: %O.", request);
      log.mgmt("[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId);
      await defaultLock.acquire(this.managementLock, () => { return this._init(); });

      const result = await this._mgmtReqResLink!.sendRequest(request);
      const messages = result.body.messages as { message: Buffer, "lock-token": Buffer }[];
      for (const msg of messages) {
        const decodedMessage = RheaMessageUtil.decode(msg.message);
        const message = new ServiceBusMessage(this._context, decodedMessage as any,
          { tag: msg["lock-token"] } as any);
        this._context.requestResponseLockedMessages.set(message.lockToken!, message.lockedUntilUtc!);
        messageList.push(message);
      }
      return messageList;
    } catch (err) {
      const error = translate(err);
      log.error("An error occurred while sending the request to receive deferred messages to " +
        "$management endpoint: %O", error);
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
  async updateDispositionStatus(lockTokens: string[], dispositionStatus: DispositionStatus,
    options?: DispositionStatusOptions): Promise<void> {
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
      log.mgmt("Update disposition status request: %O.", request);
      log.mgmt("[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId);
      await defaultLock.acquire(this.managementLock, () => { return this._init(); });
      await this._mgmtReqResLink!.sendRequest(request);
    } catch (err) {
      const error = translate(err);
      log.error("An error occurred while sending the request to update disposition status to " +
        "$management endpoint: %O", error);
      throw error;
    }
  }

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
            log.error("[%s] An error occurred on the session for request/response links for " +
              "$management: %O", id, ehError);
          }
        };
        const sropt: SenderOptions = { target: { address: this.address } };
        log.mgmt("[%s] Creating sender/receiver links on a session for $management endpoint with " +
          "srOpts: %o, receiverOpts: %O.", this._context.namespace.connectionId, sropt, rxopt);
        this._mgmtReqResLink =
          await RequestResponseLink.create(this._context.namespace.connection, sropt, rxopt);
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
        log.mgmt("[%s] Created sender '%s' and receiver '%s' links for $management endpoint.",
          this._context.namespace.connectionId, this._mgmtReqResLink.sender.name,
          this._mgmtReqResLink.receiver.name);
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      log.error("[%s] An error occured while establishing the $management links: %O",
        this._context.namespace.connectionId, err);
      throw err;
    }
  }

  private _isMgmtRequestResponseLinkOpen(): boolean {
    return this._mgmtReqResLink! && this._mgmtReqResLink!.isOpen();
  }
}
