// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Delivery, uuid_to_string } from "./rhea-promise";
import {
  Constants, ServiceBusMessageAnnotations, Dictionary, AmqpMessage
} from "./amqp-common";
import * as debugModule from "debug";
const debug = debugModule("azure:service-bus:message");
/**
 * Describes the message to be sent to ServiceBus.
 * @interface SBMessage.
 */
export interface SBMessage {
  /**
   * @property {any} body - The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * @property {string | number | Buffer} [messageId] The message identifier is an
   * application-defined value that uniquely identifies the message and its payload. The identifier
   * is a free-form string and can reflect a GUID or an identifier derived from the application
   * context. If enabled, the {@link https://docs.microsoft.com/azure/service-bus-messaging/duplicate-detection duplicate detection}
   * identifies and removes second and further submissions of messages with the same MessageId.
   */
  messageId?: string | number | Buffer;
  /**
   * @property {string} [contentType] The content type of the message. Optionally describes
   * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
   * example "application/json".
   */
  contentType?: string;
  /**
   * @property {string | number | Buffer} [correlationId] The correlation identifier that allows an
   * application to specify a context for the message for the purposes of correlation, for example
   * reflecting the MessageId of a message that is being replied to.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  correlationId?: string | number | Buffer;
  /**
   * @property {string} [partitionKey] The partition key for sending a message to a
   * partitioned entity. Maximum length is 128 characters. For {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-partitioning partitioned entities},
   * etting this value enables assigning related messages to the same internal partition,
   * so that submission sequence order is correctly recorded. The partition is chosen by a hash
   * function over this value and cannot be chosen directly. For session-aware entities,
   * the `sessionId` property overrides this value.
   */
  partitionKey?: string;
  /**
   * @property {string} [viaPartitionKey] The partition key for sending a message into an entity
   * via a partitioned transfer queue. Maximum length is 128 characters. If a message is sent via a
   * transfer queue in the scope of a transaction, this value selects the transfer queue partition:
   * This is functionally equivalent to `partitionKey` property and ensures that messages are kept
   * together and in order as they are transferred.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-transactions#transfers-and-send-via Transfers and Send Via}.
   */
  viaPartitionKey?: string;
  /**
   * @property {number} [partitionId] The Queue partition id.
   */
  partitionId?: number;
  /**
   * @property {string} [sessionId] The session identifier for a session-aware entity. Maximum
   * length is 128 characters. For session-aware entities, this application-defined value specifies
   * the session affiliation of the message. Messages with the same session identifier are subject
   * to summary locking and enable exact in-order processing and demultiplexing. For
   * session-unaware entities, this value is ignored.
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions Message Sessions}.
   */
  sessionId?: string;
  /**
   * @property {string} [replyToSessionId] The session identifier augmenting the `replyTo` address.
   * Maximum length is 128 characters. This value augments the ReplyTo information and specifies
   * which SessionId should be set for the reply when sent to the reply entity.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  replyToSessionId?: string;
  /**
   * @property {Date} [timeToLive] The message’s time to live value. This value is the relative
   * duration after which the message expires, starting from the instant the message has been
   * accepted and stored by the broker, as captured in `enqueuedTimeUtc`. When not set explicitly,
   * the assumed value is the DefaultTimeToLive for the respective queue or topic. A message-level
   * `timeToLive` value cannot be longer than the entity's DefaultTimeToLive setting and it is
   * silently adjusted if it does. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-expiration Expiration}.
   */
  timeToLive?: Date;
  /**
   * @property {string} [label] The application specific label. This property enables the
   * application to indicate the purpose of the message to the receiver in a standardized. fashion,
   * similar to an email subject line. The mapped AMQP property is "subject".
   */
  label?: string;
  /**
   * @property {string} [to] The "to" address. This property is reserved for future use in routing
   * scenarios and presently ignored by the broker itself. Applications can use this value in
   * rule-driven {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-auto-forwarding auto-forward chaining}
   * scenarios to indicate the intended logical destination of the message.
   */
  to?: string;
  /**
   * @property {string} [replyTo] The address of an entity to send replies to. This optional and
   * application-defined value is a standard way to express a reply path to the receiver of the
   * message. When a sender expects a reply, it sets the value to the absolute or relative path of
   * the queue or topic it expects the reply to be sent to. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  replyTo?: string;
  /**
   * @property {Date} [scheduledEnqueueTimeUtc] The date and time in UTC at which the message will
   * be enqueued. This property returns the time in UTC; when setting the property, the
   * supplied DateTime value must also be in UTC. This value is for delayed message sending.
   * It is utilized to delay messages sending to a specific time in the future. Message enqueuing
   * time does not mean that the message will be sent at the same time. It will get enqueued,
   * but the actual sending time depends on the queue's workload and its state.
   */
  scheduledEnqueueTimeUtc?: Date;
  /**
   * @property {Dictionary<any>} [properties] The application specific properties.
   */
  properties?: Dictionary<any>;
}

export namespace SBMessage {

  export function validate(msg: SBMessage): void {
    if (!msg) {
      throw new Error("msg cannot be null or undefined.");
    }

    if (msg.contentType && typeof msg.contentType !== "string") {
      throw new Error("contentType must be of type string");
    }

    if (msg.label && typeof msg.label !== "string") {
      throw new Error("label must be of type string");
    }

    if (msg.to && typeof msg.to !== "string") {
      throw new Error("to must be of type string");
    }

    if (msg.replyToSessionId && typeof msg.replyToSessionId !== "string") {
      throw new Error("replyToSessionId must be of type string");
    }

    if (msg.timeToLive && !(msg.timeToLive instanceof Date) &&
      msg.timeToLive!.toString() === "Invalid Date") {
      throw new Error("timeToLive must be an instance of a valid Date.");
    }

    if (msg.scheduledEnqueueTimeUtc && !(msg.scheduledEnqueueTimeUtc instanceof Date) &&
      msg.scheduledEnqueueTimeUtc!.toString() === "Invalid Date") {
      throw new Error("scheduledEnqueueTimeUtc must be an instance of a valid Date.");
    }

    if (msg.partitionKey && typeof msg.partitionKey !== "string") {
      throw new Error("partitionKey must be of type string");
    }

    if (msg.viaPartitionKey && typeof msg.viaPartitionKey !== "string") {
      throw new Error("viaPartitionKey must be of type string");
    }

    if (msg.partitionId && typeof msg.partitionId !== "number") {
      throw new Error("labpartitionIdel must be of type string");
    }

    if (msg.sessionId && typeof msg.sessionId !== "string") {
      throw new Error("sessionId must be of type string");
    }

    if (msg.messageId && typeof msg.messageId !== "string" && typeof msg.messageId !== "number"
      && !Buffer.isBuffer(msg.messageId)) {
      throw new Error("messageId must be of type string | number | Buffer.");
    }

    if (msg.correlationId && typeof msg.correlationId !== "string" && typeof msg.correlationId !== "number"
      && !Buffer.isBuffer(msg.correlationId)) {
      throw new Error("correlationId must be of type string | number | Buffer.");
    }
  }

  export function toAmqpMessage(msg: SBMessage): AmqpMessage {
    validate(msg);
    const amqpMsg: AmqpMessage = {
      body: msg.body,
      application_properties: msg.properties,
      content_type: msg.contentType,
      group_id: msg.sessionId,
      reply_to: msg.replyTo,
      to: msg.to,
      ttl: msg.timeToLive ? msg.timeToLive.getTime() : undefined,
      subject: msg.label,
      message_id: msg.messageId,
      correlation_id: msg.correlationId,
      reply_to_group_id: msg.replyToSessionId,
      message_annotations: {}
    };
    if (msg.timeToLive && msg.timeToLive !== Constants.maxDate) {
      amqpMsg.ttl = msg.timeToLive.getTime();
      amqpMsg.creation_time = Date.now();
      if (Constants.maxAbsoluteExpiryTime - amqpMsg.creation_time > amqpMsg.ttl) {
        amqpMsg.absolute_expiry_time = amqpMsg.creation_time + amqpMsg.ttl;
      } else {
        amqpMsg.absolute_expiry_time = Constants.maxAbsoluteExpiryTime;
      }
    }
    if (msg.partitionKey) amqpMsg.message_annotations![Constants.partitionKey] = msg.partitionKey;
    if (msg.viaPartitionKey) amqpMsg.message_annotations![Constants.viaPartitionKey] = msg.viaPartitionKey;
    if (msg.partitionId) amqpMsg.message_annotations![Constants.partitionIdName] = msg.partitionId;
    if (msg.scheduledEnqueueTimeUtc) amqpMsg.message_annotations![Constants.scheduledEnqueueTime] = msg.scheduledEnqueueTimeUtc;
    debug("SBMessage to AmqpMessage: %O", amqpMsg);
    return amqpMsg;
  }

  export function fromAmqpMessage(msg: AmqpMessage): SBMessage {
    if (!msg) {
      throw new Error("msg cannot be null or undefined.");
    }
    const sbmsg: SBMessage = {
      body: msg.body,
      properties: msg.application_properties,
      contentType: msg.content_type,
      sessionId: msg.group_id,
      replyTo: msg.reply_to,
      to: msg.to,
      timeToLive: msg.ttl ? new Date(msg.ttl) : undefined,
      label: msg.subject,
      messageId: msg.message_id,
      correlationId: msg.correlation_id,
      replyToSessionId: msg.reply_to_group_id
    };
    if (msg.message_annotations) {
      if (msg.message_annotations[Constants.partitionKey]) sbmsg.partitionKey = msg.message_annotations[Constants.partitionKey];
      if (msg.message_annotations[Constants.viaPartitionKey]) sbmsg.viaPartitionKey = msg.message_annotations[Constants.viaPartitionKey];
      if (msg.message_annotations[Constants.partitionIdName]) sbmsg.partitionId = msg.message_annotations[Constants.partitionIdName];
      if (msg.message_annotations[Constants.scheduledEnqueueTime]) sbmsg.scheduledEnqueueTimeUtc = msg.message_annotations[Constants.scheduledEnqueueTime];
    }
    debug("AmqpMessage to SBMessage: %O", sbmsg);
    return sbmsg;
  }
}

/**
 * Describes the message received from ServiceBus.
 * @class ReceivedSBMessage
 */
export interface ReceivedSBMessage extends SBMessage {
  /**
   * @property {string} [lockToken] The lock token for the current message. The lock token is a
   * reference to the lock that is being held by the broker in `ReceiveMode.PeekLock` mode. Locks
   * are used to explicitly settle messages as explained in the {@link https://docs.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement product documentation in more detail}
   * The token can also be used to pin the lock permanently through the {@link https://docs.microsoft.com/azure/service-bus-messaging/message-deferral Deferral API}
   * and, with that, take the message out of the regular delivery state flow.
   * @readonly
   */
  readonly lockToken?: string;
  /**
   * @property {number} [deliveryCount] The current delivery count. The value start from 1. Number
   * of deliveries that have been attempted for this message. The count is incremented when a
   * message lock expires, or the message is explicitly abandoned by the receiver.
   * @readonly
   */
  readonly deliveryCount?: number;
  /**
   * @property {Date} [enqueuedTimeUtc] The date and time of the sent message in UTC. The UTC
   * instant at which the message has been accepted and stored in the entity. This value can be
   * used as an authoritative and neutral arrival time indicator when the receiver does not
   * want to trust the sender's clock.
   * @readonly
   */
  readonly enqueuedTimeUtc?: Date;
  /**
   * @property {Date} [expiresAtUtc] The date and time in UTC at which the message is set to expire.
   * The UTC instant at which the message is marked for removal and no longer available for
   * retrieval from the entity due to expiration. Expiry is controlled by the `timeToLive` property
   * and this property is computed from `enqueuedTimeUtc` + `timeToLive`.
   */
  readonly expiresAtUtc?: Date;
  /**
   * @property {Date} [lockedUntilUtc] The date and time in UTC until which the message will be
   * locked in the queue/subscription. For messages retrieved under a lock (peek-lock receive mode,
   * not pre-settled) this property reflects the UTC instant until which the message is held
   * locked in the queue/subscription. When the lock expires, the `deliveryCount` is incremented
   * and the message is again available for retrieval.
   * @readonly
   */
  readonly lockedUntilUtc?: Date;
  /**
   * @property {number} [enqueuedSequenceNumber] The original sequence number of the message. For
   * messages that have been auto-forwarded, this property reflects the sequence number that had
   * first been assigned to the message at its original point of submission.
   * @readonly
   */
  readonly enqueuedSequenceNumber?: number;
  /**
   * @property {number} [sequenceNumber] The unique number assigned to a message by Service Bus.
   * The sequence number is a unique 64-bit integer assigned to a message as it is accepted
   * and stored by the broker and functions as its true identifier. For partitioned entities,
   * the topmost 16 bits reflect the partition identifier. Sequence numbers monotonically increase.
   * They roll over to 0 when the 48-64 bit range is exhausted.
   * @readonly
   */
  readonly sequenceNumber?: number;
  /**
   * @property {string} [deadLetterSource] The name of the queue or subscription that this message
   * was enqueued on, before it was deadlettered. Only set in messages that have been dead-lettered
   * and subsequently auto-forwarded from the dead-letter queue to another entity. Indicates the
   * entity in which the message was dead-lettered.
   * @readonly
   */
  readonly deadLetterSource?: string;
  /**
   * @property {AmqpMessage} _amqpMessage The underlying raw amqp message.
   * @readonly
   */
  readonly _amqpMessage: AmqpMessage;
  /**
   * @property {Delivery} delivery The associated delivery of the received message.
   */
  readonly _delivery: Delivery;
}

export namespace ReceivedSBMessage {

  export function validate(msg: ReceivedSBMessage): void {
    SBMessage.validate(msg);
    if (msg.lockToken && typeof msg.lockToken !== "string") {
      throw new Error("contentType must be of type string.");
    }

    if (msg.deliveryCount && typeof msg.deliveryCount !== "number") {
      throw new Error("deliveryCount must be of type number.");
    }

    if (msg.sequenceNumber && typeof msg.sequenceNumber !== "number") {
      throw new Error("sequenceNumber must be of type .");
    }

    if (msg.enqueuedSequenceNumber && typeof msg.enqueuedSequenceNumber !== "number") {
      throw new Error("enqueuedSequenceNumber must be of type number.");
    }

    if (msg.enqueuedTimeUtc && !(msg.enqueuedTimeUtc instanceof Date) &&
      msg.enqueuedTimeUtc!.toString() === "Invalid Date") {
      throw new Error("enqueuedTimeUtc must be an instance of a valid Date.");
    }

    if (msg.expiresAtUtc && !(msg.expiresAtUtc instanceof Date) &&
      msg.expiresAtUtc!.toString() === "Invalid Date") {
      throw new Error("expiresAtUtc must be an instance of a valid Date.");
    }

    if (msg.lockedUntilUtc && !(msg.lockedUntilUtc instanceof Date) &&
      msg.lockedUntilUtc!.toString() === "Invalid Date") {
      throw new Error("lockedUntilUtc must be an instance of a valid Date.");
    }
  }

  export function toAmqpMessage(msg: ReceivedSBMessage): AmqpMessage {
    ReceivedSBMessage.validate(msg);
    const amqpMsg: AmqpMessage = SBMessage.toAmqpMessage(msg);
    amqpMsg.delivery_count = msg.deliveryCount;
    amqpMsg.absolute_expiry_time = msg.expiresAtUtc ? msg.expiresAtUtc.getTime() : undefined;
    if (!amqpMsg.message_annotations) amqpMsg.message_annotations = {};
    if (msg.deadLetterSource) amqpMsg.message_annotations[Constants.deadLetterSource] = msg.deadLetterSource;
    if (msg.enqueuedSequenceNumber) amqpMsg.message_annotations[Constants.offset] = msg.enqueuedSequenceNumber;
    if (msg.sequenceNumber) amqpMsg.message_annotations[Constants.sequenceNumber] = msg.sequenceNumber;
    if (msg.enqueuedTimeUtc) amqpMsg.message_annotations[Constants.enqueuedTime] = msg.enqueuedTimeUtc;
    if (msg.lockedUntilUtc) amqpMsg.message_annotations[Constants.lockedUntil] = msg.lockedUntilUtc;
    debug("ReceivedSBMessage to AmqpMessage: %O", amqpMsg);
    return amqpMsg;
  }

  export function fromAmqpMessage(msg: AmqpMessage, delivery: Delivery): ReceivedSBMessage {
    const sbmsg: SBMessage = SBMessage.fromAmqpMessage(msg);
    const props: any = {};
    if (msg.message_annotations) {
      if (msg.message_annotations[Constants.deadLetterSource]) props.deadLetterSource = msg.message_annotations[Constants.deadLetterSource];
      if (msg.message_annotations[Constants.offset]) props.enqueuedSequenceNumber = msg.message_annotations[Constants.offset];
      if (msg.message_annotations[Constants.sequenceNumber]) props.sequenceNumber = msg.message_annotations[Constants.sequenceNumber];
      if (msg.message_annotations[Constants.enqueuedTime]) props.enqueuedTimeUtc = new Date(msg.message_annotations[Constants.enqueuedTime] as number);
      if (msg.message_annotations[Constants.lockedUntil]) props.lockedUntilUtc = msg.message_annotations[Constants.lockedUntil];
    }
    const rcvdsbmsg: ReceivedSBMessage = {
      _amqpMessage: msg,
      _delivery: delivery,
      deliveryCount: msg.delivery_count,
      lockToken: uuid_to_string(delivery.tag),
      expiresAtUtc: msg.absolute_expiry_time ? new Date(msg.absolute_expiry_time) : undefined,
      ...sbmsg,
      ...props
    };

    debug("AmqpMessage to ReceivedSBMessage: %O", rcvdsbmsg);
    return rcvdsbmsg;
  }
}

/**
 * Describes the message received from ServiceBus.
 * @class Message
 */
export class Message implements ReceivedSBMessage {
  /**
   * @property {any} body - The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * @property {string | number | Buffer} [messageId] The message identifier is an
   * application-defined value that uniquely identifies the message and its payload. The identifier
   * is a free-form string and can reflect a GUID or an identifier derived from the application
   * context. If enabled, the {@link https://docs.microsoft.com/azure/service-bus-messaging/duplicate-detection duplicate detection}
   * identifies and removes second and further submissions of messages with the same MessageId.
   */
  messageId?: string | number | Buffer;
  /**
   * @property {string} [contentType] The content type of the message. Optionally describes
   * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
   * example "application/json".
   */
  contentType?: string;
  /**
   * @property {string | number | Buffer} [correlationId] The correlation identifier that allows an
   * application to specify a context for the message for the purposes of correlation, for example
   * reflecting the MessageId of a message that is being replied to.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  correlationId?: string | number | Buffer;
  /**
   * @property {string} [partitionKey] The partition key for sending a message to a
   * partitioned entity. Maximum length is 128 characters. For {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-partitioning partitioned entities},
   * etting this value enables assigning related messages to the same internal partition,
   * so that submission sequence order is correctly recorded. The partition is chosen by a hash
   * function over this value and cannot be chosen directly. For session-aware entities,
   * the `sessionId` property overrides this value.
   */
  partitionKey?: string;
  /**
   * @property {number} [partitionId] The Queue partition id.
   */
  partitionId?: number;
  /**
   * @property {string} [viaPartitionKey] The partition key for sending a message into an entity
   * via a partitioned transfer queue. Maximum length is 128 characters. If a message is sent via a
   * transfer queue in the scope of a transaction, this value selects the transfer queue partition:
   * This is functionally equivalent to `partitionKey` property and ensures that messages are kept
   * together and in order as they are transferred.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-transactions#transfers-and-send-via Transfers and Send Via}.
   */
  viaPartitionKey?: string;
  /**
   * @property {string} [sessionId] The session identifier for a session-aware entity. Maximum
   * length is 128 characters. For session-aware entities, this application-defined value specifies
   * the session affiliation of the message. Messages with the same session identifier are subject
   * to summary locking and enable exact in-order processing and demultiplexing. For
   * session-unaware entities, this value is ignored.
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions Message Sessions}.
   */
  sessionId?: string;
  /**
   * @property {string} [replyToSessionId] The session identifier augmenting the `replyTo` address.
   * Maximum length is 128 characters. This value augments the ReplyTo information and specifies
   * which SessionId should be set for the reply when sent to the reply entity.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  replyToSessionId?: string;
  /**
   * @property {Date} [timeToLive] The message’s time to live value. This value is the relative
   * duration after which the message expires, starting from the instant the message has been
   * accepted and stored by the broker, as captured in `enqueuedTimeUtc`. When not set explicitly,
   * the assumed value is the DefaultTimeToLive for the respective queue or topic. A message-level
   * `timeToLive` value cannot be longer than the entity's DefaultTimeToLive setting and it is
   * silently adjusted if it does. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-expiration Expiration}.
   */
  timeToLive?: Date;
  /**
   * @property {string} [label] The application specific label. This property enables the
   * application to indicate the purpose of the message to the receiver in a standardized. fashion,
   * similar to an email subject line. The mapped AMQP property is "subject".
   */
  label?: string;
  /**
   * @property {string} [to] The "to" address. This property is reserved for future use in routing
   * scenarios and presently ignored by the broker itself. Applications can use this value in
   * rule-driven {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-auto-forwarding auto-forward chaining}
   * scenarios to indicate the intended logical destination of the message.
   */
  to?: string;
  /**
   * @property {string} [replyTo] The address of an entity to send replies to. This optional and
   * application-defined value is a standard way to express a reply path to the receiver of the
   * message. When a sender expects a reply, it sets the value to the absolute or relative path of
   * the queue or topic it expects the reply to be sent to. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  replyTo?: string;
  /**
   * @property {Date} [scheduledEnqueueTimeUtc] The date and time in UTC at which the message will
   * be enqueued. This property returns the time in UTC; when setting the property, the
   * supplied DateTime value must also be in UTC. This value is for delayed message sending.
   * It is utilized to delay messages sending to a specific time in the future. Message enqueuing
   * time does not mean that the message will be sent at the same time. It will get enqueued,
   * but the actual sending time depends on the queue's workload and its state.
   */
  scheduledEnqueueTimeUtc?: Date;
  /**
   * @property {string} [lockToken] The lock token for the current message. The lock token is a
   * reference to the lock that is being held by the broker in `ReceiveMode.PeekLock` mode. Locks
   * are used to explicitly settle messages as explained in the {@link https://docs.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement product documentation in more detail}
   * The token can also be used to pin the lock permanently through the {@link https://docs.microsoft.com/azure/service-bus-messaging/message-deferral Deferral API}
   * and, with that, take the message out of the regular delivery state flow.
   * @readonly
   */
  readonly lockToken?: string;
  /**
   * @property {number} [deliveryCount] The current delivery count. The value start from 1. Number
   * of deliveries that have been attempted for this message. The count is incremented when a
   * message lock expires, or the message is explicitly abandoned by the receiver.
   * @readonly
   */
  readonly deliveryCount?: number;
  /**
   * @property {Date} [enqueuedTimeUtc] The date and time of the sent message in UTC. The UTC
   * instant at which the message has been accepted and stored in the entity. This value can be
   * used as an authoritative and neutral arrival time indicator when the receiver does not
   * want to trust the sender's clock.
   * @readonly
   */
  readonly enqueuedTimeUtc?: Date;
  /**
   * @property {Date} [expiresAtUtc] The date and time in UTC at which the message is set to expire.
   * The UTC instant at which the message is marked for removal and no longer available for
   * retrieval from the entity due to expiration. Expiry is controlled by the `timeToLive` property
   * and this property is computed from `enqueuedTimeUtc` + `timeToLive`.
   */
  readonly expiresAtUtc?: Date;
  /**
   * @property {Date} [lockedUntilUtc] The date and time in UTC until which the message will be
   * locked in the queue/subscription. For messages retrieved under a lock (peek-lock receive mode,
   * not pre-settled) this property reflects the UTC instant until which the message is held
   * locked in the queue/subscription. When the lock expires, the `deliveryCount` is incremented
   * and the message is again available for retrieval.
   * @readonly
   */
  readonly lockedUntilUtc?: Date;
  /**
   * @property {number} [enqueuedSequenceNumber] The original sequence number of the message. For
   * messages that have been auto-forwarded, this property reflects the sequence number that had
   * first been assigned to the message at its original point of submission.
   * @readonly
   */
  readonly enqueuedSequenceNumber?: number;
  /**
   * @property {number} [sequenceNumber] The unique number assigned to a message by Service Bus.
   * The sequence number is a unique 64-bit integer assigned to a message as it is accepted
   * and stored by the broker and functions as its true identifier. For partitioned entities,
   * the topmost 16 bits reflect the partition identifier. Sequence numbers monotonically increase.
   * They roll over to 0 when the 48-64 bit range is exhausted.
   * @readonly
   */
  readonly sequenceNumber?: number;
  /**
   * @property {string} [deadLetterSource] The name of the queue or subscription that this message
   * was enqueued on, before it was deadlettered. Only set in messages that have been dead-lettered
   * and subsequently auto-forwarded from the dead-letter queue to another entity. Indicates the
   * entity in which the message was dead-lettered.
   * @readonly
   */
  readonly deadLetterSource?: string;
  /**
   * @property {AmqpMessage} _amqpMessage The underlying raw amqp message.
   * @readonly
   */
  readonly _amqpMessage: AmqpMessage;
  /**
   * @property {ServiceBusMessageAnnotations} [annotations] The amqp message attributes.
   * @readonly
   */
  readonly annotations?: ServiceBusMessageAnnotations;
  /**
   * @property {Delivery} delivery The associated delivery of the received message.
   */
  readonly _delivery: Delivery;
  /**
   * @property {Dictionary<any>} [properties] The application specific properties.
   */
  properties?: Dictionary<any>;

  constructor(msg: AmqpMessage, delivery: Delivery) {
    Object.assign(this, ReceivedSBMessage.fromAmqpMessage(msg, delivery));
    this._amqpMessage = msg;
    this._delivery = delivery;
  }
}
