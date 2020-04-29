// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import Long from "long";
import { Delivery, uuid_to_string, MessageAnnotations, DeliveryAnnotations } from "rhea-promise";
import { Constants, AmqpMessage, translate, ErrorNameConditionMapper } from "@azure/amqp-common";
import * as log from "./log";
import { ClientEntityContext } from "./clientEntityContext";
import { reorderLockToken, getDispositionType } from "../src/util/utils";
import { MessageReceiver } from "../src/core/messageReceiver";
import { MessageSession } from "../src/session/messageSession";
import { getErrorMessageNotSupportedInReceiveAndDeleteMode } from "./util/errors";
import { Buffer } from "buffer";
import { DispositionStatusOptions } from "./core/managementClient";

/**
 * The mode in which messages should be received. The 2 modes are `peekLock` and `receiveAndDelete`.
 */
export enum ReceiveMode {
  /**
   * Once a message is received in this mode, the receiver has a lock on the message for a
   * particular duration. If the message is not settled by this time, it lands back on Service Bus
   * to be fetched by the next receive operation.
   * @type {Number}
   */
  peekLock = 1,

  /**
   * Messages received in this mode get automatically removed from Service Bus.
   * @type {Number}
   */
  receiveAndDelete = 2
}

/**
 * @internal
 */
export enum DispositionType {
  complete = "complete",
  deadletter = "deadletter",
  abandon = "abandon",
  defer = "defer"
}

/**
 * @internal
 */
export enum DispositionStatus {
  completed = "completed",
  defered = "defered",
  suspended = "suspended",
  abandoned = "abandoned",
  renewed = "renewed"
}

/**
 * @internal
 * Describes the delivery annotations for Service Bus.
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
 * @internal
 * Describes the message annotations for Service Bus.
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
 * Describes the reason and error description for dead lettering a message using the `deadLetter()`
 * method on the message received from Service Bus.
 * @interface DeadLetterOptions
 */
export interface DeadLetterOptions {
  /**
   * @property The reason for deadlettering the message.
   */
  deadletterReason: string;
  /**
   * @property The error description for deadlettering the message.
   */
  deadLetterErrorDescription: string;
}

/**
 * Describes the message to be sent to Service Bus.
 * @interface SendableMessageInfo.
 */
export interface SendableMessageInfo {
  /**
   * @property The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * @property The message identifier is an
   * application-defined value that uniquely identifies the message and its payload.
   *
   * Note: Numbers that are not whole integers are not allowed.
   */
  messageId?: string | number | Buffer;
  /**
   * @property The content type of the message. Optionally describes
   * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
   * example "application/json".
   */
  contentType?: string;
  /**
   * @property The correlation identifier that allows an
   * application to specify a context for the message for the purposes of correlation, for example
   * reflecting the MessageId of a message that is being replied to.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  correlationId?: string | number | Buffer;
  /**
   * @property The partition key for sending a message to a partitioned entity.
   * Maximum length is 128 characters. For {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-partitioning partitioned entities},
   * setting this value enables assigning related messages to the same internal partition,
   * so that submission sequence order is correctly recorded. The partition is chosen by a hash
   * function over this value and cannot be chosen directly.
   * - For session-aware entities, the `sessionId` property overrides this value.
   * - For non partitioned entities, partition key will be ignored
   *
   */
  partitionKey?: string;
  /**
   * @property The partition key for sending a message into an entity
   * via a partitioned transfer queue. Maximum length is 128 characters. If a message is sent via a
   * transfer queue in the scope of a transaction, this value selects the transfer queue partition:
   * This is functionally equivalent to `partitionKey` property and ensures that messages are kept
   * together and in order as they are transferred.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-transactions#transfers-and-send-via Transfers and Send Via}.
   */
  viaPartitionKey?: string;
  /**
   * @property The session identifier for a session-aware entity. Maximum
   * length is 128 characters. For session-aware entities, this application-defined value specifies
   * the session affiliation of the message. Messages with the same session identifier are subject
   * to summary locking and enable exact in-order processing and demultiplexing. For
   * session-unaware entities, this value is ignored.
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions Message Sessions}.
   */
  sessionId?: string;
  /**
   * @property The session identifier augmenting the `replyTo` address.
   * Maximum length is 128 characters. This value augments the ReplyTo information and specifies
   * which SessionId should be set for the reply when sent to the reply entity.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  replyToSessionId?: string;
  /**
   * @property The message’s time to live value. This value is the relative
   * duration after which the message expires, starting from the instant the message has been
   * accepted and stored by the broker, as captured in `enqueuedTimeUtc`. When not set explicitly,
   * the assumed value is the DefaultTimeToLive for the respective queue or topic. A message-level
   * `timeToLive` value cannot be longer than the entity's DefaultTimeToLive setting and it is
   * silently adjusted if it does. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-expiration Expiration}.
   */
  timeToLive?: number;
  /**
   * @property The application specific label. This property enables the
   * application to indicate the purpose of the message to the receiver in a standardized. fashion,
   * similar to an email subject line. The mapped AMQP property is "subject".
   */
  label?: string;
  /**
   * @property The "to" address. This property is reserved for future use in routing
   * scenarios and presently ignored by the broker itself. Applications can use this value in
   * rule-driven {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-auto-forwarding auto-forward chaining}
   * scenarios to indicate the intended logical destination of the message.
   */
  to?: string;
  /**
   * @property The address of an entity to send replies to. This optional and
   * application-defined value is a standard way to express a reply path to the receiver of the
   * message. When a sender expects a reply, it sets the value to the absolute or relative path of
   * the queue or topic it expects the reply to be sent to. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  replyTo?: string;
  /**
   * @property The date and time in UTC at which the message will
   * be enqueued. This property returns the time in UTC; when setting the property, the
   * supplied DateTime value must also be in UTC. This value is for delayed message sending.
   * It is utilized to delay messages sending to a specific time in the future. Message enqueuing
   * time does not mean that the message will be sent at the same time. It will get enqueued,
   * but the actual sending time depends on the queue's workload and its state.
   */
  scheduledEnqueueTimeUtc?: Date;
  /**
   * @property The application specific properties which can be
   * used for custom message metadata.
   */
  userProperties?: { [key: string]: any };
}

/**
 * @internal
 * Gets the error message for when a property on given message is not of expected type
 */
export function getMessagePropertyTypeMismatchError(msg: SendableMessageInfo): Error | undefined {
  if (msg.contentType != null && typeof msg.contentType !== "string") {
    return new TypeError("The property 'contentType' on the message must be of type 'string'");
  }

  if (msg.label != null && typeof msg.label !== "string") {
    return new TypeError("The property 'label' on the message must be of type 'string'");
  }

  if (msg.to != null && typeof msg.to !== "string") {
    return new TypeError("The property 'to' on the message must be of type 'string'");
  }

  if (msg.replyTo != null && typeof msg.replyTo !== "string") {
    return new TypeError("The property 'replyTo' on the message must be of type 'string'");
  }

  if (msg.replyToSessionId != null && typeof msg.replyToSessionId !== "string") {
    return new TypeError("The property 'replyToSessionId' on the message must be of type 'string'");
  }

  if (msg.timeToLive != null && typeof msg.timeToLive !== "number") {
    return new TypeError("The property 'timeToLive' on the message must be of type 'number'");
  }

  if (msg.sessionId != null && typeof msg.sessionId !== "string") {
    return new TypeError("The property 'sessionId' on the message must be of type 'string'");
  }

  if (
    msg.messageId != null &&
    typeof msg.messageId !== "string" &&
    typeof msg.messageId !== "number" &&
    !Buffer.isBuffer(msg.messageId)
  ) {
    return new TypeError(
      "The property 'messageId' on the message must be of type string, number or Buffer"
    );
  }

  if (
    msg.correlationId != null &&
    typeof msg.correlationId !== "string" &&
    typeof msg.correlationId !== "number" &&
    !Buffer.isBuffer(msg.correlationId)
  ) {
    return new TypeError(
      "The property 'correlationId' on the message must be of type string, number or Buffer"
    );
  }
  return;
}

/**
 * @internal
 * Converts given SendableMessageInfo to AmqpMessage
 */
export function toAmqpMessage(msg: SendableMessageInfo): AmqpMessage {
  const amqpMsg: AmqpMessage = {
    body: msg.body,
    message_annotations: {}
  };
  if (msg.userProperties != null) {
    amqpMsg.application_properties = msg.userProperties;
  }
  if (msg.contentType != null) {
    amqpMsg.content_type = msg.contentType;
  }
  if (msg.sessionId != null) {
    if (msg.sessionId.length > Constants.maxSessionIdLength) {
      throw new Error(
        "Length of 'sessionId' property on the message cannot be greater than 128 characters."
      );
    }
    amqpMsg.group_id = msg.sessionId;
  }
  if (msg.replyTo != null) {
    amqpMsg.reply_to = msg.replyTo;
  }
  if (msg.to != null) {
    amqpMsg.to = msg.to;
  }
  if (msg.label != null) {
    amqpMsg.subject = msg.label;
  }
  if (msg.messageId != null) {
    if (typeof msg.messageId === "string" && msg.messageId.length > Constants.maxMessageIdLength) {
      throw new Error(
        "Length of 'messageId' property on the message cannot be greater than 128 characters."
      );
    }
    amqpMsg.message_id = msg.messageId;
  }
  if (msg.correlationId != null) {
    amqpMsg.correlation_id = msg.correlationId;
  }
  if (msg.replyToSessionId != null) {
    amqpMsg.reply_to_group_id = msg.replyToSessionId;
  }
  if (msg.timeToLive != null && msg.timeToLive !== Constants.maxDurationValue) {
    amqpMsg.ttl = msg.timeToLive;
    amqpMsg.creation_time = Date.now();
    if (Constants.maxAbsoluteExpiryTime - amqpMsg.creation_time > amqpMsg.ttl) {
      amqpMsg.absolute_expiry_time = amqpMsg.creation_time + amqpMsg.ttl;
    } else {
      amqpMsg.absolute_expiry_time = Constants.maxAbsoluteExpiryTime;
    }
  }
  if (msg.partitionKey != null) {
    if (msg.partitionKey.length > Constants.maxPartitionKeyLength) {
      throw new Error(
        "Length of 'partitionKey' property on the message cannot be greater than 128 characters."
      );
    }
    amqpMsg.message_annotations![Constants.partitionKey] = msg.partitionKey;
  }
  if (msg.viaPartitionKey != null) {
    if (msg.viaPartitionKey.length > Constants.maxPartitionKeyLength) {
      throw new Error(
        "Length of 'viaPartitionKey' property on the message cannot be greater than 128 characters."
      );
    }
    amqpMsg.message_annotations![Constants.viaPartitionKey] = msg.viaPartitionKey;
  }
  if (msg.scheduledEnqueueTimeUtc != null) {
    amqpMsg.message_annotations![Constants.scheduledEnqueueTime] = msg.scheduledEnqueueTimeUtc;
  }
  log.message("SBMessage to AmqpMessage: %O", amqpMsg);
  return amqpMsg;
}

/**
 * Describes the message received from Service Bus during peek operations and so cannot be settled.
 * @class ReceivedSBMessage
 */
export interface ReceivedMessageInfo extends SendableMessageInfo {
  /**
   * @property The lock token is a reference to the lock that is being held by the broker in
   * `ReceiveMode.PeekLock` mode. Locks are used internally settle messages as explained in the
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement product documentation in more detail}
   * - Not applicable when the message is received in `ReceiveMode.receiveAndDelete`
   * mode.
   * @readonly
   */
  readonly lockToken?: string;
  /**
   * @property Number of deliveries that have been attempted for this message. The count is
   * incremented when a message lock expires, or the message is explicitly abandoned using the
   * `abandon()` method on the message.
   * @readonly
   */
  readonly deliveryCount?: number;
  /**
   * @property The UTC instant at which the message has been accepted and stored in Service Bus.
   * @readonly
   */
  readonly enqueuedTimeUtc?: Date;
  /**
   * @property The UTC instant at which the message is marked for removal and no longer available for
   * retrieval from the entity due to expiration. This property is computed from 2 other properties
   * on the message: `enqueuedTimeUtc` + `timeToLive`.
   */
  readonly expiresAtUtc?: Date;
  /**
   * @property The UTC instant until which the message is held locked in the queue/subscription.
   * When the lock expires, the `deliveryCount` is incremented and the message is again available
   * for retrieval.
   * - Not applicable when the message is received in `ReceiveMode.receiveAndDelete`
   * mode.
   */
  lockedUntilUtc?: Date;
  /**
   * @property The original sequence number of the message. For
   * messages that have been auto-forwarded, this property reflects the sequence number that had
   * first been assigned to the message at its original point of submission.
   * @readonly
   */
  readonly enqueuedSequenceNumber?: number;
  /**
   * @property The unique number assigned to a message by Service Bus.
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
   * and subsequently auto-forwarded from the dead-letter sub-queue to another entity. Indicates the
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
 * @ignore
 * Converts given AmqpMessage to ReceivedMessageInfo
 */
export function fromAmqpMessage(
  msg: AmqpMessage,
  delivery?: Delivery,
  shouldReorderLockToken?: boolean
): ReceivedMessageInfo {
  if (!msg) {
    msg = {
      body: undefined
    };
  }
  const sbmsg: SendableMessageInfo = {
    body: msg.body
  };

  if (msg.application_properties != null) {
    sbmsg.userProperties = msg.application_properties;
  }
  if (msg.content_type != null) {
    sbmsg.contentType = msg.content_type;
  }
  if (msg.group_id != null) {
    sbmsg.sessionId = msg.group_id;
  }
  if (msg.reply_to != null) {
    sbmsg.replyTo = msg.reply_to;
  }
  if (msg.to != null) {
    sbmsg.to = msg.to;
  }
  if (msg.ttl != null) {
    sbmsg.timeToLive = msg.ttl;
  }
  if (msg.subject != null) {
    sbmsg.label = msg.subject;
  }
  if (msg.message_id != null) {
    sbmsg.messageId = msg.message_id;
  }
  if (msg.correlation_id != null) {
    sbmsg.correlationId = msg.correlation_id;
  }
  if (msg.reply_to_group_id != null) {
    sbmsg.replyToSessionId = msg.reply_to_group_id;
  }

  if (msg.message_annotations != null) {
    if (msg.message_annotations[Constants.partitionKey] != null) {
      sbmsg.partitionKey = msg.message_annotations[Constants.partitionKey];
    }
    if (msg.message_annotations[Constants.viaPartitionKey] != null) {
      sbmsg.viaPartitionKey = msg.message_annotations[Constants.viaPartitionKey];
    }
    if (msg.message_annotations[Constants.scheduledEnqueueTime] != null) {
      sbmsg.scheduledEnqueueTimeUtc = msg.message_annotations[Constants.scheduledEnqueueTime];
    }
  }

  const props: any = {};
  if (msg.message_annotations != null) {
    if (msg.message_annotations[Constants.deadLetterSource] != null) {
      props.deadLetterSource = msg.message_annotations[Constants.deadLetterSource];
    }
    if (msg.message_annotations[Constants.enqueueSequenceNumber] != null) {
      props.enqueuedSequenceNumber = msg.message_annotations[Constants.enqueueSequenceNumber];
    }
    if (msg.message_annotations[Constants.sequenceNumber] != null) {
      if (Buffer.isBuffer(msg.message_annotations[Constants.sequenceNumber])) {
        props.sequenceNumber = Long.fromBytesBE(msg.message_annotations[Constants.sequenceNumber]);
      } else {
        props.sequenceNumber = Long.fromNumber(msg.message_annotations[Constants.sequenceNumber]);
      }
    }
    if (msg.message_annotations[Constants.enqueuedTime] != null) {
      props.enqueuedTimeUtc = new Date(msg.message_annotations[Constants.enqueuedTime] as number);
    }
    if (msg.message_annotations[Constants.lockedUntil] != null) {
      props.lockedUntilUtc = new Date(msg.message_annotations[Constants.lockedUntil] as number);
    }
  }
  if (msg.ttl != null && msg.ttl >= Constants.maxDurationValue - props.enqueuedTimeUtc.getTime()) {
    props.expiresAtUtc = new Date(Constants.maxDurationValue);
  } else {
    props.expiresAtUtc = new Date(props.enqueuedTimeUtc.getTime() + msg.ttl!);
  }

  const rcvdsbmsg: ReceivedMessageInfo = {
    _amqpMessage: msg,
    _delivery: delivery,
    deliveryCount: msg.delivery_count,
    lockToken:
      delivery && delivery.tag && delivery.tag.length !== 0
        ? uuid_to_string(
            shouldReorderLockToken === true
              ? reorderLockToken(
                  typeof delivery.tag === "string" ? Buffer.from(delivery.tag) : delivery.tag
                )
              : typeof delivery.tag === "string"
              ? Buffer.from(delivery.tag)
              : delivery.tag
          )
        : undefined,
    ...sbmsg,
    ...props
  };

  log.message("AmqpMessage to ReceivedSBMessage: %O", rcvdsbmsg);
  return rcvdsbmsg;
}

/**
 * Describes the message received from Service Bus.
 * @interface ReceivedMessage
 */
interface ReceivedMessage extends ReceivedMessageInfo {
  /**
   * Removes the message from Service Bus.
   * @returns Promise<void>.
   */
  complete(): Promise<void>;

  /**
   * The lock held on the message by the receiver is let go, making the message available again in
   * Service Bus for another receive operation.
   * @param propertiesToModify The properties of the message to modify while abandoning the message.
   *
   * @return Promise<void>.
   */
  abandon(propertiesToModify?: { [key: string]: any }): Promise<void>;

  /**
   * Defers the processing of the message. Save the `sequenceNumber` of the message, in order to
   * receive it message again in the future using the `receiveDeferredMessage` method.
   * @param propertiesToModify The properties of the message to modify while deferring the message
   *
   * @returns Promise<void>
   */
  defer(propertiesToModify?: { [key: string]: any }): Promise<void>;

  /**
   * Moves the message to the deadletter sub-queue. To receive a deadletted message, create a new
   * QueueClient/SubscriptionClient using the path for the deadletter sub-queue.
   * @param options The DeadLetter options that can be provided while
   * rejecting the message.
   *
   * @returns Promise<void>
   */
  deadLetter(options?: DeadLetterOptions): Promise<void>;
}

/**
 * Describes the message received from Service Bus.
 * @class ServiceBusMessage
 */
export class ServiceBusMessage implements ReceivedMessage {
  /**
   * @property The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * @property The application specific properties.
   */
  userProperties?: { [key: string]: any };
  /**
   * @property The message identifier is an
   * application-defined value that uniquely identifies the message and its payload. The identifier
   * is a free-form string and can reflect a GUID or an identifier derived from the application
   * context. If enabled, the
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/duplicate-detection duplicate detection}
   * identifies and removes second and further submissions of messages with the same MessageId.
   */
  messageId?: string | number | Buffer;
  /**
   * @property The content type of the message. Optionally describes
   * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
   * example "application/json".
   */
  contentType?: string;
  /**
   * @property The correlation identifier that allows an
   * application to specify a context for the message for the purposes of correlation, for example
   * reflecting the MessageId of a message that is being replied to.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  correlationId?: string | number | Buffer;
  /**
   * @property The partition key for sending a message to a
   * partitioned entity. Maximum length is 128 characters. For {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-partitioning partitioned entities},
   * setting this value enables assigning related messages to the same internal partition,
   * so that submission sequence order is correctly recorded. The partition is chosen by a hash
   * function over this value and cannot be chosen directly. For session-aware entities,
   * the `sessionId` property overrides this value.
   */
  partitionKey?: string;
  /**
   * @property The partition key for sending a message into an entity
   * via a partitioned transfer queue. Maximum length is 128 characters. If a message is sent via a
   * transfer queue in the scope of a transaction, this value selects the transfer queue partition:
   * This is functionally equivalent to `partitionKey` property and ensures that messages are kept
   * together and in order as they are transferred.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-transactions#transfers-and-send-via Transfers and Send Via}.
   */
  viaPartitionKey?: string;
  /**
   * @property The session identifier for a session-aware entity. Maximum
   * length is 128 characters. For session-aware entities, this application-defined value specifies
   * the session affiliation of the message. Messages with the same session identifier are subject
   * to summary locking and enable exact in-order processing and demultiplexing. For
   * session-unaware entities, this value is ignored.
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions Message Sessions}.
   */
  sessionId?: string;
  /**
   * @property The session identifier augmenting the `replyTo` address.
   * Maximum length is 128 characters. This value augments the ReplyTo information and specifies
   * which SessionId should be set for the reply when sent to the reply entity.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  replyToSessionId?: string;
  /**
   * @property The message’s time to live value. This value is the relative
   * duration after which the message expires, starting from the instant the message has been
   * accepted and stored by the broker, as captured in `enqueuedTimeUtc`. When not set explicitly,
   * the assumed value is the DefaultTimeToLive for the respective queue or topic. A message-level
   * `timeToLive` value cannot be longer than the entity's DefaultTimeToLive setting and it is
   * silently adjusted if it does. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-expiration Expiration}.
   */
  timeToLive?: number;
  /**
   * @property The application specific label. This property enables the
   * application to indicate the purpose of the message to the receiver in a standardized. fashion,
   * similar to an email subject line. The mapped AMQP property is "subject".
   */
  label?: string;
  /**
   * @property The "to" address. This property is reserved for future use in routing
   * scenarios and presently ignored by the broker itself. Applications can use this value in
   * rule-driven {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-auto-forwarding auto-forward chaining}
   * scenarios to indicate the intended logical destination of the message.
   */
  to?: string;
  /**
   * @property The address of an entity to send replies to. This optional and
   * application-defined value is a standard way to express a reply path to the receiver of the
   * message. When a sender expects a reply, it sets the value to the absolute or relative path of
   * the queue or topic it expects the reply to be sent to. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation Message Routing and Correlation}.
   */
  replyTo?: string;
  /**
   * @property The date and time in UTC at which the message will
   * be enqueued. This property returns the time in UTC; when setting the property, the
   * supplied DateTime value must also be in UTC. This value is for delayed message sending.
   * It is utilized to delay messages sending to a specific time in the future. Message enqueuing
   * time does not mean that the message will be sent at the same time. It will get enqueued,
   * but the actual sending time depends on the queue's workload and its state.
   */
  scheduledEnqueueTimeUtc?: Date;
  /**
   * @property The lock token is a reference to the lock that is being held by the broker in
   * `ReceiveMode.PeekLock` mode. Locks are used internally settle messages as explained in the
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement product documentation in more detail}
   * - Not applicable when the message is received in `ReceiveMode.receiveAndDelete`
   * mode.
   * @readonly
   */
  readonly lockToken?: string;
  /**
   * @property Number of deliveries that have been attempted for this message. The count is
   * incremented when a message lock expires, or the message is explicitly abandoned using the
   * `abandon()` method on the message.
   * @readonly
   */
  readonly deliveryCount?: number;
  /**
   * @property The UTC instant at which the message has been accepted and stored in Service Bus.
   * @readonly
   */
  readonly enqueuedTimeUtc?: Date;
  /**
   * @property The UTC instant at which the message is marked for removal and no longer available for
   * retrieval from the entity due to expiration. This property is computed from 2 other properties
   * on the message: `enqueuedTimeUtc` + `timeToLive`.
   */
  readonly expiresAtUtc?: Date;
  /**
   * @property The UTC instant until which the message is held locked in the queue/subscription.
   * When the lock expires, the `deliveryCount` is incremented and the message is again available
   * for retrieval.
   * - Not applicable when the message is received in `ReceiveMode.receiveAndDelete`
   * mode.
   */
  lockedUntilUtc?: Date;
  /**
   * @property The original sequence number of the message. For
   * messages that have been auto-forwarded, this property reflects the sequence number that had
   * first been assigned to the message at its original point of submission.
   * @readonly
   */
  readonly enqueuedSequenceNumber?: number;
  /**
   * @property The unique number assigned to a message by Service Bus.
   * The sequence number is a unique 64-bit integer assigned to a message as it is accepted
   * and stored by the broker and functions as its true identifier. For partitioned entities,
   * the topmost 16 bits reflect the partition identifier. Sequence numbers monotonically increase.
   * They roll over to 0 when the 48-64 bit range is exhausted.
   * @readonly
   */
  readonly sequenceNumber?: Long;
  /**
   * @property The name of the queue or subscription that this message
   * was enqueued on, before it was deadlettered. Only set in messages that have been dead-lettered
   * and subsequently auto-forwarded from the dead-letter sub-queue to another entity. Indicates the
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
   * @property Boolean denoting if the message has already been settled.
   * @readonly
   */
  public get isSettled(): boolean {
    return this.delivery.remote_settled;
  }
  /**
   * @property {ClientEntityContext} _context The client entity context.
   * @readonly
   */
  private readonly _context: ClientEntityContext;

  /**
   * @internal
   */
  constructor(
    context: ClientEntityContext,
    msg: AmqpMessage,
    delivery: Delivery,
    shouldReorderLockToken: boolean
  ) {
    Object.assign(this, fromAmqpMessage(msg, delivery, shouldReorderLockToken));
    this._context = context;
    if (msg.body) {
      this.body = this._context.namespace.dataTransformer.decode(msg.body);
    }
    this._amqpMessage = msg;
    this.delivery = delivery;
  }

  /**
   * Removes the message from Service Bus.
   *
   * @throws Error with name `SessionLockLostError` (for messages from a Queue/Subscription with sessions enabled)
   * if the AMQP link with which the message was received is no longer alive. This can
   * happen either because the lock on the session expired or the receiver was explicitly closed by
   * the user or the AMQP link got closed by the library due to network loss or service error.
   * @throws Error with name `MessageLockLostError` (for messages from a Queue/Subscription with sessions not enabled)
   * if the lock on the message has expired or the AMQP link with which the message was received is
   * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
   * AMQP link got closed by the library due to network loss or service error.
   * @throws Error if the message is already settled. To avoid this error check the `isSettled`
   * property on the message if you are not sure whether the message is settled.
   * @throws Error if used in `ReceiveAndDelete` mode because all messages received in this mode
   * are pre-settled. To avoid this error, update your code to not settle a message which is received
   * in this mode.
   * @throws Error with name `ServiceUnavailableError` if Service Bus does not acknowledge the request to settle
   * the message in time. The message may or may not have been settled successfully.
   *
   * @returns Promise<void>.
   */
  async complete(): Promise<void> {
    log.message(
      "[%s] Completing the message with id '%s'.",
      this._context.namespace.connectionId,
      this.messageId
    );
    return this.settleMessage(DispositionStatus.completed);
  }

  /**
   * The lock held on the message by the receiver is let go, making the message available again in
   * Service Bus for another receive operation.
   *
   * @throws Error with name `SessionLockLostError` (for messages from a Queue/Subscription with sessions enabled)
   * if the AMQP link with which the message was received is no longer alive. This can
   * happen either because the lock on the session expired or the receiver was explicitly closed by
   * the user or the AMQP link got closed by the library due to network loss or service error.
   * @throws Error with name `MessageLockLostError` (for messages from a Queue/Subscription with sessions not enabled)
   * if the lock on the message has expired or the AMQP link with which the message was received is
   * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
   * AMQP link got closed by the library due to network loss or service error.
   * @throws Error if the message is already settled. To avoid this error check the `isSettled`
   * property on the message if you are not sure whether the message is settled.
   * @throws Error if used in `ReceiveAndDelete` mode because all messages received in this mode
   * are pre-settled. To avoid this error, update your code to not settle a message which is received
   * in this mode.
   * @throws Error with name `ServiceUnavailableError` if Service Bus does not acknowledge the request to settle
   * the message in time. The message may or may not have been settled successfully.
   *
   * @param propertiesToModify The properties of the message to modify while abandoning the message.
   *
   * @return Promise<void>.
   */
  async abandon(propertiesToModify?: { [key: string]: any }): Promise<void> {
    // TODO: Figure out a mechanism to convert specified properties to message_annotations.
    log.message(
      "[%s] Abandoning the message with id '%s'.",
      this._context.namespace.connectionId,
      this.messageId
    );
    return this.settleMessage(DispositionStatus.abandoned, {
      propertiesToModify: propertiesToModify
    });
  }

  /**
   * Defers the processing of the message. Save the `sequenceNumber` of the message, in order to
   * receive it message again in the future using the `receiveDeferredMessage` method.
   *
   * @throws Error with name `SessionLockLostError` (for messages from a Queue/Subscription with sessions enabled)
   * if the AMQP link with which the message was received is no longer alive. This can
   * happen either because the lock on the session expired or the receiver was explicitly closed by
   * the user or the AMQP link got closed by the library due to network loss or service error.
   * @throws Error with name `MessageLockLostError` (for messages from a Queue/Subscription with sessions not enabled)
   * if the lock on the message has expired or the AMQP link with which the message was received is
   * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
   * AMQP link got closed by the library due to network loss or service error.
   * @throws Error if the message is already settled. To avoid this error check the `isSettled`
   * property on the message if you are not sure whether the message is settled.
   * @throws Error if used in `ReceiveAndDelete` mode because all messages received in this mode
   * are pre-settled. To avoid this error, update your code to not settle a message which is received
   * in this mode.
   * @throws Error with name `ServiceUnavailableError` if Service Bus does not acknowledge the request to settle
   * the message in time. The message may or may not have been settled successfully.
   *
   * @param propertiesToModify The properties of the message to modify while deferring the message
   *
   * @returns Promise<void>
   */
  async defer(propertiesToModify?: { [key: string]: any }): Promise<void> {
    log.message(
      "[%s] Deferring the message with id '%s'.",
      this._context.namespace.connectionId,
      this.messageId
    );
    return this.settleMessage(DispositionStatus.defered, {
      propertiesToModify: propertiesToModify
    });
  }

  /**
   * Moves the message to the deadletter sub-queue. To receive a deadletted message, create a new
   * QueueClient/SubscriptionClient using the path for the deadletter sub-queue.
   *
   * @throws Error with name `SessionLockLostError` (for messages from a Queue/Subscription with sessions enabled)
   * if the AMQP link with which the message was received is no longer alive. This can
   * happen either because the lock on the session expired or the receiver was explicitly closed by
   * the user or the AMQP link got closed by the library due to network loss or service error.
   * @throws Error with name `MessageLockLostError` (for messages from a Queue/Subscription with sessions not enabled)
   * if the lock on the message has expired or the AMQP link with which the message was received is
   * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
   * AMQP link got closed by the library due to network loss or service error.
   * @throws Error if the message is already settled. To avoid this error check the `isSettled`
   * property on the message if you are not sure whether the message is settled.
   * @throws Error if used in `ReceiveAndDelete` mode because all messages received in this mode
   * are pre-settled. To avoid this error, update your code to not settle a message which is received
   * in this mode.
   * @throws Error with name `ServiceUnavailableError` if Service Bus does not acknowledge the request to settle
   * the message in time. The message may or may not have been settled successfully.
   *
   * @param options The DeadLetter options that can be provided while
   * rejecting the message.
   *
   * @returns Promise<void>
   */
  async deadLetter(propertiesToModify?: DeadLetterOptions & { [key: string]: any }): Promise<void> {
    log.message(
      "[%s] Deadlettering the message with id '%s'.",
      this._context.namespace.connectionId,
      this.messageId
    );

    const actualPropertiesToModify: Partial<DeadLetterOptions> = {
      ...propertiesToModify
    };

    // these two fields are handled specially and don't need to be in here.
    delete actualPropertiesToModify.deadLetterErrorDescription;
    delete actualPropertiesToModify.deadletterReason;

    const dispositionStatusOptions: DispositionStatusOptions = {
      propertiesToModify: actualPropertiesToModify,
      deadLetterReason: propertiesToModify?.deadletterReason,
      deadLetterDescription: propertiesToModify?.deadLetterErrorDescription
    };
    return this.settleMessage(DispositionStatus.suspended, dispositionStatusOptions);
  }

  private async settleMessage(
    operation: DispositionStatus,
    options?: DispositionStatusOptions
  ): Promise<void> {
    const dispositionType = getDispositionType(operation);
    const isDeferredMessage = this._context.requestResponseLockedMessages.has(this.lockToken!);
    const receiver = isDeferredMessage
      ? undefined
      : this._context.getReceiver(this.delivery.link.name, this.sessionId);
    if (!isDeferredMessage) this.throwIfMessageCannotBeSettled(receiver, dispositionType!);

    // Message Settlement with managementLink
    // 1. If the received message is deferred as such messages can only be settled using managementLink
    // 2. If the associated receiver link is not available. This does not apply to messages from sessions as we need a lock on the session to do so.
    if (isDeferredMessage || ((!receiver || !receiver.isOpen()) && this.sessionId == undefined)) {
      await this._context.managementClient!.updateDispositionStatus(this.lockToken!, operation, {
        ...options,
        sessionId: this.sessionId
      });
      if (isDeferredMessage) {
        // Remove the message from the internal map of deferred messages
        this._context.requestResponseLockedMessages.delete(this.lockToken!);
      }
      return;
    }

    return receiver!.settleMessage(this, dispositionType!, options);
  }

  /**
   * Creates a clone of the current message to allow it to be re-sent to the queue
   * @returns ServiceBusMessage
   */
  clone(): SendableMessageInfo {
    // We are returning a SendableMessageInfo object because that object can then be sent to Service Bus
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

  /**
   * @private
   * Logs and Throws an error if the given message cannot be settled.
   * @param receiver Receiver to be used to settle this message
   * @param operation Settle operation: complete, abandon, defer or deadLetter
   */
  private throwIfMessageCannotBeSettled(
    receiver: MessageReceiver | MessageSession | undefined,
    operation: DispositionType
  ): void {
    let error: Error | undefined;

    if (receiver && receiver.receiveMode !== ReceiveMode.peekLock) {
      error = new Error(
        getErrorMessageNotSupportedInReceiveAndDeleteMode(`${operation} the message`)
      );
    } else if (this.delivery.remote_settled) {
      error = new Error(`Failed to ${operation} the message as this message is already settled.`);
    } else if ((!receiver || !receiver.isOpen()) && this.sessionId != undefined) {
      error = translate({
        description:
          `Failed to ${operation} the message as the AMQP link with which the message was ` +
          `received is no longer alive.`,
        condition: ErrorNameConditionMapper.SessionLockLostError
      });
    }
    if (!error) {
      return;
    }
    log.error(
      "[%s] An error occured when settling a message with id '%s'. " +
        "This message was received using the receiver %s which %s currently open: %O",
      this._context.namespace.connectionId,
      this.messageId,
      this.delivery.link.name,
      this.delivery.link.is_open() ? "is" : "is not",
      error
    );

    throw error;
  }
}
