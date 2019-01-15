// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as Long from "long";
import {
  Delivery,
  uuid_to_string,
  AmqpError,
  MessageAnnotations,
  DeliveryAnnotations
} from "rhea-promise";
import { Constants, Dictionary, AmqpMessage } from "@azure/amqp-common";
import * as log from "./log";
import { ClientEntityContext } from "./clientEntityContext";
import { DispositionStatus } from "./core/managementClient";
import { DispositionType } from "./core/messageReceiver";
import { ReceiveMode } from "./core/messageReceiver";

/**
 * Describes the delivery annotations for ServiceBus.
 * @interface
 */
export interface ServiceBusDeliveryAnnotations extends DeliveryAnnotations {
  /**
   * @property {string} [last_enqueued_offset] The offset of the last event.
   */
  last_enqueued_offset?: string;
  /**
   * @property {number} [last_enqueued_sequence_number] The sequence number of the last event.
   */
  last_enqueued_sequence_number?: number;
  /**
   * @property {number} [last_enqueued_time_utc] The enqueued time of the last event.
   */
  last_enqueued_time_utc?: number;
  /**
   * @property {number} [runtime_info_retrieval_time_utc] The retrieval time of the last event.
   */
  runtime_info_retrieval_time_utc?: number;
  /**
   * @property {string} Any unknown delivery annotations.
   */
  [x: string]: any;
}

/**
 * Describes the message annotations for ServiceBus.
 * @interface ServiceBusMessageAnnotations
 */
export interface ServiceBusMessageAnnotations extends MessageAnnotations {
  /**
   * @property {string | null} [x-opt-partition-key] Annotation for the partition key set for the event.
   */
  "x-opt-partition-key"?: string | null;
  /**
   * @property {number} [x-opt-sequence-number] Annontation for the sequence number of the event.
   */
  "x-opt-sequence-number"?: number;
  /**
   * @property {number} [x-opt-enqueued-time] Annotation for the enqueued time of the event.
   */
  "x-opt-enqueued-time"?: number;
  /**
   * @property {string} [x-opt-offset] Annotation for the offset of the event.
   */
  "x-opt-offset"?: string;
  /**
   * @property {string} [x-opt-locked-until] Annotation for the message being locked until.
   */
  "x-opt-locked-until"?: Date | number;
}

/**
 * Describes the reason and error description for dead lettering a message.
 * @interface DeadLetterOptions
 */
export interface DeadLetterOptions {
  /**
   * @property {string} [deadletterReason] The reason for deadlettering the message.
   */
  deadletterReason: string;
  /**
   * @property {string} [deadLetterErrorDescription] The error description for deadlettering the message.
   */
  deadLetterErrorDescription: string;
}

/**
 * Describes the message to be sent to ServiceBus.
 * @interface SendableMessageInfo.
 */
export interface SendableMessageInfo {
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
   * @property {number} [timeToLive] The message’s time to live value. This value is the relative
   * duration after which the message expires, starting from the instant the message has been
   * accepted and stored by the broker, as captured in `enqueuedTimeUtc`. When not set explicitly,
   * the assumed value is the DefaultTimeToLive for the respective queue or topic. A message-level
   * `timeToLive` value cannot be longer than the entity's DefaultTimeToLive setting and it is
   * silently adjusted if it does. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-expiration Expiration}.
   */
  timeToLive?: number;
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
   * @property {Dictionary<any>} [userProperties] The application specific properties which can be
   * used for custom message metadata.
   */
  userProperties?: Dictionary<any>;
}

export module SendableMessageInfo {
  export function validate(msg: SendableMessageInfo): void {
    if (!msg) {
      throw new Error("'msg' cannot be null or undefined.");
    }

    if (msg.contentType != undefined && typeof msg.contentType !== "string") {
      throw new Error("'contentType' must be of type 'string'");
    }

    if (msg.label != undefined && typeof msg.label !== "string") {
      throw new Error("'label' must be of type 'string'");
    }

    if (msg.to != undefined && typeof msg.to !== "string") {
      throw new Error("'to' must be of type 'string'");
    }

    if (msg.replyToSessionId != undefined && typeof msg.replyToSessionId !== "string") {
      throw new Error("'replyToSessionId' must be of type 'string'");
    }

    if (msg.timeToLive != undefined && typeof msg.timeToLive !== "number") {
      throw new Error("'timeToLive' must be of type 'number'.");
    }

    if (
      msg.scheduledEnqueueTimeUtc &&
      !(msg.scheduledEnqueueTimeUtc instanceof Date) &&
      msg.scheduledEnqueueTimeUtc!.toString() === "Invalid Date"
    ) {
      throw new Error("'scheduledEnqueueTimeUtc' must be an instance of a valid 'Date'.");
    }

    if (
      (msg.partitionKey != undefined && typeof msg.partitionKey !== "string") ||
      (typeof msg.partitionKey === "string" &&
        msg.partitionKey.length > Constants.maxPartitionKeyLength)
    ) {
      throw new Error(
        "'partitionKey' must be of type 'string' with a length less than 128 characters."
      );
    }

    if (
      (msg.viaPartitionKey != undefined && typeof msg.viaPartitionKey !== "string") ||
      (typeof msg.partitionKey === "string" &&
        msg.partitionKey.length > Constants.maxPartitionKeyLength)
    ) {
      throw new Error(
        "'viaPartitionKey' must be of type 'string' with a length less than 128 characters."
      );
    }

    if (msg.sessionId != undefined && typeof msg.sessionId !== "string") {
      throw new Error("'sessionId' must be of type 'string'");
    }

    if (
      msg.sessionId != undefined &&
      typeof msg.sessionId === "string" &&
      msg.sessionId.length > Constants.maxSessionIdLength
    ) {
      throw new Error(
        "Length of 'sessionId' of type 'string' cannot be greater than 128 characters."
      );
    }

    if (
      msg.messageId != undefined &&
      typeof msg.messageId !== "string" &&
      typeof msg.messageId !== "number" &&
      !Buffer.isBuffer(msg.messageId)
    ) {
      throw new Error("'messageId' must be of type 'string' | 'number' | Buffer.");
    }

    if (
      msg.messageId != undefined &&
      typeof msg.messageId === "string" &&
      msg.messageId.length > Constants.maxMessageIdLength
    ) {
      throw new Error(
        "Length of 'messageId' of type 'string' cannot be greater than 128 characters."
      );
    }

    if (
      msg.correlationId != undefined &&
      typeof msg.correlationId !== "string" &&
      typeof msg.correlationId !== "number" &&
      !Buffer.isBuffer(msg.correlationId)
    ) {
      throw new Error("'correlationId' must be of type 'string' | 'number' | Buffer.");
    }
  }

  export function toAmqpMessage(msg: SendableMessageInfo): AmqpMessage {
    validate(msg);
    const amqpMsg: AmqpMessage = {
      body: msg.body,
      message_annotations: {}
    };
    if (msg.userProperties != undefined) {
      amqpMsg.application_properties = msg.userProperties;
    }
    if (msg.contentType != undefined) {
      amqpMsg.content_type = msg.contentType;
    }
    if (msg.sessionId != undefined) {
      amqpMsg.group_id = msg.sessionId;
    }
    if (msg.replyTo != undefined) {
      amqpMsg.reply_to = msg.replyTo;
    }
    if (msg.to != undefined) {
      amqpMsg.to = msg.to;
    }
    if (msg.label != undefined) {
      amqpMsg.subject = msg.label;
    }
    if (msg.messageId != undefined) {
      amqpMsg.message_id = msg.messageId;
    }
    if (msg.correlationId != undefined) {
      amqpMsg.correlation_id = msg.correlationId;
    }
    if (msg.replyToSessionId != undefined) {
      amqpMsg.reply_to_group_id = msg.replyToSessionId;
    }
    if (msg.timeToLive != undefined && msg.timeToLive !== Constants.maxDurationValue) {
      amqpMsg.ttl = msg.timeToLive;
      amqpMsg.creation_time = Date.now();
      if (Constants.maxAbsoluteExpiryTime - amqpMsg.creation_time > amqpMsg.ttl) {
        amqpMsg.absolute_expiry_time = amqpMsg.creation_time + amqpMsg.ttl;
      } else {
        amqpMsg.absolute_expiry_time = Constants.maxAbsoluteExpiryTime;
      }
    }
    if (msg.partitionKey != undefined) {
      amqpMsg.message_annotations![Constants.partitionKey] = msg.partitionKey;
    }
    if (msg.viaPartitionKey != undefined) {
      amqpMsg.message_annotations![Constants.viaPartitionKey] = msg.viaPartitionKey;
    }
    if (msg.scheduledEnqueueTimeUtc != undefined) {
      amqpMsg.message_annotations![Constants.scheduledEnqueueTime] = msg.scheduledEnqueueTimeUtc;
    }
    log.message("SBMessage to AmqpMessage: %O", amqpMsg);
    return amqpMsg;
  }

  export function fromAmqpMessage(msg: AmqpMessage): SendableMessageInfo {
    if (!msg) {
      throw new Error("'msg' cannot be null or undefined.");
    }
    const sbmsg: SendableMessageInfo = {
      body: msg.body
    };

    if (msg.application_properties != undefined) {
      sbmsg.userProperties = msg.application_properties;
    }
    if (msg.content_type != undefined) {
      sbmsg.contentType = msg.content_type;
    }
    if (msg.group_id != undefined) {
      sbmsg.sessionId = msg.group_id;
    }
    if (msg.reply_to != undefined) {
      sbmsg.replyTo = msg.reply_to;
    }
    if (msg.to != undefined) {
      sbmsg.to = msg.to;
    }
    if (msg.ttl != undefined) {
      sbmsg.timeToLive = msg.ttl;
    }
    if (msg.subject != undefined) {
      sbmsg.label = msg.subject;
    }
    if (msg.message_id != undefined) {
      sbmsg.messageId = msg.message_id;
    }
    if (msg.correlation_id != undefined) {
      sbmsg.correlationId = msg.correlation_id;
    }
    if (msg.reply_to_group_id != undefined) {
      sbmsg.replyToSessionId = msg.reply_to_group_id;
    }

    if (msg.message_annotations != undefined) {
      if (msg.message_annotations[Constants.partitionKey] != undefined) {
        sbmsg.partitionKey = msg.message_annotations[Constants.partitionKey];
      }
      if (msg.message_annotations[Constants.viaPartitionKey] != undefined) {
        sbmsg.viaPartitionKey = msg.message_annotations[Constants.viaPartitionKey];
      }
      if (msg.message_annotations[Constants.scheduledEnqueueTime] != undefined) {
        sbmsg.scheduledEnqueueTimeUtc = msg.message_annotations[Constants.scheduledEnqueueTime];
      }
    }
    log.message("AmqpMessage to SBMessage: %O", sbmsg);
    return sbmsg;
  }
}

/**
 * Describes the message received from ServiceBus.
 * @class ReceivedSBMessage
 */
export interface ReceivedMessageInfo extends SendableMessageInfo {
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
   */
  lockedUntilUtc?: Date;
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
   *
   * **Max safe integer** that Javascript currently supports is `2^53 - 1`. The sequence number
   * is an AMQP `Long` type which can be upto 64 bits long. To represent that we are using a
   * library named {@link https://github.com/dcodeIO/long.js long.js}. We expect customers
   * to use the **`Long`** type exported by this library.
   * @readonly
   */
  readonly sequenceNumber?: Long;
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
}

/**
 * Describes the module that is responsible for converting the message received from ServiceBus
 * to/from AmqpMessage.
 */
export module ReceivedMessageInfo {
  export function validate(msg: ReceivedMessageInfo): void {
    SendableMessageInfo.validate(msg);
    if (msg.lockToken != undefined && typeof msg.lockToken !== "string") {
      throw new Error("'lockToken' must be of type 'string'.");
    }

    if (msg.deliveryCount != undefined && typeof msg.deliveryCount !== "number") {
      throw new Error("'deliveryCount' must be of type 'number'.");
    }

    if (msg.sequenceNumber != undefined && !Long.isLong(msg.sequenceNumber)) {
      throw new Error("'sequenceNumber' must be an instance of 'Long' .");
    }

    if (msg.enqueuedSequenceNumber != undefined && typeof msg.enqueuedSequenceNumber !== "number") {
      throw new Error("'enqueuedSequenceNumber' must be of type 'number'.");
    }

    if (
      msg.enqueuedTimeUtc &&
      !(msg.enqueuedTimeUtc instanceof Date) &&
      msg.enqueuedTimeUtc!.toString() === "Invalid Date"
    ) {
      throw new Error("'enqueuedTimeUtc' must be an instance of a valid 'Date'.");
    }

    if (
      msg.expiresAtUtc &&
      !(msg.expiresAtUtc instanceof Date) &&
      msg.expiresAtUtc!.toString() === "Invalid Date"
    ) {
      throw new Error("'expiresAtUtc' must be an instance of a valid 'Date'.");
    }

    if (
      msg.lockedUntilUtc &&
      !(msg.lockedUntilUtc instanceof Date) &&
      msg.lockedUntilUtc!.toString() === "Invalid Date"
    ) {
      throw new Error("'lockedUntilUtc' must be an instance of a valid 'Date'.");
    }
  }

  export function toAmqpMessage(msg: ReceivedMessageInfo): AmqpMessage {
    ReceivedMessageInfo.validate(msg);
    const amqpMsg: AmqpMessage = SendableMessageInfo.toAmqpMessage(msg);
    if (msg.deliveryCount != undefined) {
      amqpMsg.delivery_count = msg.deliveryCount;
    }
    if (!amqpMsg.message_annotations) {
      amqpMsg.message_annotations = {};
    }
    if (msg.deadLetterSource != undefined) {
      amqpMsg.message_annotations[Constants.deadLetterSource] = msg.deadLetterSource;
    }
    if (msg.enqueuedSequenceNumber != undefined) {
      amqpMsg.message_annotations[Constants.enqueueSequenceNumber] = msg.enqueuedSequenceNumber;
    }
    if (msg.sequenceNumber != undefined) {
      amqpMsg.message_annotations[Constants.sequenceNumber] = msg.sequenceNumber;
    }
    if (msg.enqueuedTimeUtc != undefined) {
      amqpMsg.message_annotations[Constants.enqueuedTime] = msg.enqueuedTimeUtc;
    }
    if (msg.lockedUntilUtc != undefined) {
      amqpMsg.message_annotations[Constants.lockedUntil] = msg.lockedUntilUtc;
    }
    log.message("ReceivedSBMessage to AmqpMessage: %O", amqpMsg);
    return amqpMsg;
  }

  export function fromAmqpMessage(msg: AmqpMessage, delivery?: Delivery): ReceivedMessageInfo {
    const sbmsg: SendableMessageInfo = SendableMessageInfo.fromAmqpMessage(msg);
    const props: any = {};
    if (msg.message_annotations != undefined) {
      if (msg.message_annotations[Constants.deadLetterSource] != undefined) {
        props.deadLetterSource = msg.message_annotations[Constants.deadLetterSource];
      }
      if (msg.message_annotations[Constants.enqueueSequenceNumber] != undefined) {
        props.enqueuedSequenceNumber = msg.message_annotations[Constants.enqueueSequenceNumber];
      }
      if (msg.message_annotations[Constants.sequenceNumber] != undefined) {
        if (Buffer.isBuffer(msg.message_annotations[Constants.sequenceNumber])) {
          props.sequenceNumber = Long.fromBytesBE(
            msg.message_annotations[Constants.sequenceNumber]
          );
        } else {
          props.sequenceNumber = Long.fromNumber(msg.message_annotations[Constants.sequenceNumber]);
        }
      }
      if (msg.message_annotations[Constants.enqueuedTime] != undefined) {
        props.enqueuedTimeUtc = new Date(msg.message_annotations[Constants.enqueuedTime] as number);
      }
      if (msg.message_annotations[Constants.lockedUntil] != undefined) {
        props.lockedUntilUtc = new Date(msg.message_annotations[Constants.lockedUntil] as number);
      }
    }
    if (
      msg.ttl != undefined &&
      msg.ttl >= Constants.maxDurationValue - props.enqueuedTimeUtc.getTime()
    ) {
      props.expiresAtUtc = new Date(Constants.maxDurationValue);
    } else {
      props.expiresAtUtc = new Date(props.enqueuedTimeUtc.getTime() + msg.ttl!);
    }
    const rcvdsbmsg: ReceivedMessageInfo = {
      _amqpMessage: msg,
      _delivery: delivery,
      deliveryCount: msg.delivery_count,
      lockToken: delivery
        ? uuid_to_string(
            typeof delivery.tag === "string" ? Buffer.from(delivery.tag) : delivery.tag
          )
        : undefined,
      ...sbmsg,
      ...props
    };

    log.message("AmqpMessage to ReceivedSBMessage: %O", rcvdsbmsg);
    return rcvdsbmsg;
  }
}

/**
 * Describes the message received from ServiceBus.
 * @interface ReceivedMessage
 */
export interface ReceivedMessage extends ReceivedMessageInfo {
  /**
   * Completes a message using its lock token. This will delete the message from ServiceBus.
   * @returns Promise<void>.
   */
  complete(): Promise<void>;
  /**
   * Abandons a message using its lock token. This will make the message available again for
   * processing.
   * @param {Dictionary<any>} [propertiesToModify] The properties of the message to modify while
   * abandoning the message. Abandoning a message will increase the delivery count on the message.
   * @return Promise<void>.
   */
  abandon(propertiesToModify?: Dictionary<any>): Promise<void>;
  /**
   * Indicates that the receiver wants to defer the processing for the message. In order to receive
   * this message again in the future, you will need to save the `sequenceNumber` and receive it
   * using `client.receiveDeferredMessage(sequenceNumber)`. Deferring messages does not impact
   * message's expiration, meaning that deferred messages can still expire.
   * @param {Dictionary<any>} [propertiesToModify] The properties of the message to modify while
   * deferring the message
   * @return Promise<void>.
   */
  defer(propertiesToModify?: Dictionary<any>): Promise<void>;
  /**
   * Moves the message to the deadletter sub-queue.
   * @param {DeadLetterOptions} [options] The DeadLetter options that can be provided while rejecting
   * the message.
   * @returns Promise<void>
   */
  deadLetter(options?: DeadLetterOptions): Promise<void>;
}

/**
 * Describes the message received from ServiceBus.
 * @class ServiceBusMessage
 */
export class ServiceBusMessage implements ReceivedMessage {
  /**
   * @property {any} body - The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * @property {Dictionary<any>} [userProperties] The application specific properties.
   */
  userProperties?: Dictionary<any>;
  /**
   * @property {string | number | Buffer} [messageId] The message identifier is an
   * application-defined value that uniquely identifies the message and its payload. The identifier
   * is a free-form string and can reflect a GUID or an identifier derived from the application
   * context. If enabled, the
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/duplicate-detection duplicate detection}
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
   * @property {number} [timeToLive] The message’s time to live value. This value is the relative
   * duration after which the message expires, starting from the instant the message has been
   * accepted and stored by the broker, as captured in `enqueuedTimeUtc`. When not set explicitly,
   * the assumed value is the DefaultTimeToLive for the respective queue or topic. A message-level
   * `timeToLive` value cannot be longer than the entity's DefaultTimeToLive setting and it is
   * silently adjusted if it does. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-expiration Expiration}.
   */
  timeToLive?: number;
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
   */
  lockedUntilUtc?: Date;
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
  readonly sequenceNumber?: Long;
  /**
   * @property {string} [deadLetterSource] The name of the queue or subscription that this message
   * was enqueued on, before it was deadlettered. Only set in messages that have been dead-lettered
   * and subsequently auto-forwarded from the dead-letter queue to another entity. Indicates the
   * entity in which the message was dead-lettered.
   * @readonly
   */
  readonly deadLetterSource?: string;
  /**
   * The associated delivery of the received message.
   */
  readonly delivery: Delivery;
  /**
   * @property {AmqpMessage} _amqpMessage The underlying raw amqp message.
   * @readonly
   */
  readonly _amqpMessage: AmqpMessage;
  /**
   * @property {ClientEntityContext} _context The client entity context.
   * @readonly
   */
  private readonly _context: ClientEntityContext;

  constructor(context: ClientEntityContext, msg: AmqpMessage, delivery: Delivery) {
    Object.assign(this, ReceivedMessageInfo.fromAmqpMessage(msg, delivery));
    this._context = context;
    if (msg.body) {
      this.body = this._context.namespace.dataTransformer.decode(msg.body);
    }
    this._amqpMessage = msg;
    this.delivery = delivery;
  }

  /**
   * Completes a message using it's lock token. This will delete the message from ServiceBus.
   * @returns Promise<void>.
   */
  async complete(): Promise<void> {
    log.message(
      "[%s] Completing the message with id '%s'.",
      this._context.namespace.connectionId,
      this.messageId
    );
    if (this._context.requestResponseLockedMessages.has(this.lockToken!)) {
      await this._context.managementClient!.updateDispositionStatus(
        [this.lockToken!],
        DispositionStatus.completed
      );

      // Remove the message from the internal map of deferred messages
      this._context.requestResponseLockedMessages.delete(this.lockToken!);
      return;
    }
    const receiver = this._context.getReceiver(this.delivery.link.name, this.sessionId);
    if (receiver) {
      if (receiver.receiveMode !== ReceiveMode.peekLock) {
        throw new Error("The operation is only supported in 'PeekLock' receive mode.");
      }
      if (this.delivery.remote_settled) {
        throw new Error("This message has been already settled.");
      }
      return receiver.settleMessage(this, DispositionType.complete);
    } else {
      throw new Error(`Cannot find the receiver with name '${this.delivery.link.name}'.`);
    }
  }
  /**
   * Abandons a message using it's lock token. This will make the message available again for
   * processing.
   * @param {Dictionary<any>} propertiesToModify The properties of the message to modify while
   * abandoning the message. Abandoning a message will increase the delivery count on the message.
   * @return Promise<void>.
   */
  async abandon(propertiesToModify?: Dictionary<any>): Promise<void> {
    // TODO: Figure out a mechanism to convert specified properties to message_annotations.
    log.message(
      "[%s] Abandoning the message with id '%s'.",
      this._context.namespace.connectionId,
      this.messageId
    );
    if (this._context.requestResponseLockedMessages.has(this.lockToken!)) {
      await this._context.managementClient!.updateDispositionStatus(
        [this.lockToken!],
        DispositionStatus.abandoned,
        { propertiesToModify: propertiesToModify }
      );

      // Remove the message from the internal map of deferred messages
      this._context.requestResponseLockedMessages.delete(this.lockToken!);
      return;
    }
    const receiver = this._context.getReceiver(this.delivery.link.name, this.sessionId);
    if (receiver) {
      if (receiver.receiveMode !== ReceiveMode.peekLock) {
        throw new Error("The operation is only supported in 'PeekLock' receive mode.");
      }
      if (this.delivery.remote_settled) {
        throw new Error("This message has been already settled.");
      }
      return receiver.settleMessage(this, DispositionType.abandon, {
        propertiesToModify: propertiesToModify
      });
    } else {
      throw new Error(`Cannot find the receiver with name '${this.delivery.link.name}'.`);
    }
  }

  /**
   * Indicates that the receiver wants to defer the processing for the message. In order to receive
   * this message again in the future, you will need to save the `sequenceNumber` and receive it
   * using `receiveDeferredMessage(sequenceNumber)`. Deferring messages does not impact message's
   * expiration, meaning that deferred messages can still expire.
   * @param [propertiesToModify] The properties of the message to modify while
   * deferring the message
   * @returns Promise<void>
   */
  async defer(propertiesToModify?: Dictionary<any>): Promise<void> {
    log.message(
      "[%s] Deferring the message with id '%s'.",
      this._context.namespace.connectionId,
      this.messageId
    );
    if (this._context.requestResponseLockedMessages.has(this.lockToken!)) {
      await this._context.managementClient!.updateDispositionStatus(
        [this.lockToken!],
        DispositionStatus.defered,
        { propertiesToModify: propertiesToModify }
      );

      // Remove the message from the internal map of deferred messages
      this._context.requestResponseLockedMessages.delete(this.lockToken!);
      return;
    }
    const receiver = this._context.getReceiver(this.delivery.link.name, this.sessionId);
    if (receiver) {
      if (receiver.receiveMode !== ReceiveMode.peekLock) {
        throw new Error("The operation is only supported in 'PeekLock' receive mode.");
      }
      if (this.delivery.remote_settled) {
        throw new Error("This message has been already settled.");
      }
      return receiver.settleMessage(this, DispositionType.defer, {
        propertiesToModify: propertiesToModify
      });
    } else {
      throw new Error(`Cannot find the receiver with name '${this.delivery.link.name}'.`);
    }
  }

  /**
   * Moves the message to the deadletter sub-queue.
   * @param [options] The DeadLetter options that can be provided while
   * rejecting the message.
   * @returns Promise<void>
   */
  async deadLetter(options?: DeadLetterOptions): Promise<void> {
    const error: AmqpError = {
      condition: Constants.deadLetterName
    };
    if (options) {
      error.info = {
        DeadLetterReason: options.deadletterReason,
        DeadLetterErrorDescription: options.deadLetterErrorDescription
      };
    }
    log.message(
      "[%s] Deadlettering the message with id '%s'.",
      this._context.namespace.connectionId,
      this.messageId
    );
    if (this._context.requestResponseLockedMessages.has(this.lockToken!)) {
      await this._context.managementClient!.updateDispositionStatus(
        [this.lockToken!],
        DispositionStatus.suspended,
        {
          deadLetterReason: error.condition,
          deadLetterDescription: error.description
        }
      );

      // Remove the message from the internal map of deferred messages
      this._context.requestResponseLockedMessages.delete(this.lockToken!);
      return;
    }
    const receiver = this._context.getReceiver(this.delivery.link.name, this.sessionId);
    if (receiver) {
      if (receiver.receiveMode !== ReceiveMode.peekLock) {
        throw new Error("The operation is only supported in 'PeekLock' receive mode.");
      }
      if (this.delivery.remote_settled) {
        throw new Error("This message has been already settled.");
      }
      return receiver.settleMessage(this, DispositionType.deadletter, {
        error: error
      });
    } else {
      throw new Error(`Cannot find the receiver with name '${this.delivery.link.name}'.`);
    }
  }

  /**
   * Creates a clone of the current message to allow it to be re-sent to the queue
   * @returns ServiceBusMessage
   */
  clone(): SendableMessageInfo {
    // We are returning a SendableMessageInfo object because that object can then be sent to ServiceBus
    const clone: SendableMessageInfo = {
      body: this.body,
      contentType: this.contentType,
      correlationId: this.correlationId,
      label: this.label,
      messageId: this.messageId,
      partitionKey: this.partitionKey,
      replyTo: this.replyTo,
      replyToSessionId: this.replyToSessionId,
      scheduledEnqueueTimeUtc: this.scheduledEnqueueTimeUtc,
      sessionId: this.sessionId,
      timeToLive: this.timeToLive,
      to: this.to,
      userProperties: this.userProperties,
      viaPartitionKey: this.viaPartitionKey
    };

    return clone;
  }
}
