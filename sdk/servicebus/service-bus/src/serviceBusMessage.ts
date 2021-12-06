// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AmqpAnnotatedMessage, Constants } from "@azure/core-amqp";
import { Buffer } from "buffer";
import Long from "long";
import {
  Delivery,
  DeliveryAnnotations,
  MessageAnnotations,
  uuid_to_string,
  Message as RheaMessage
} from "rhea-promise";
import { defaultDataTransformer } from "./dataTransformer";
import { messageLogger as logger } from "./log";
import { ReceiveMode } from "./models";
import { isDefined, isObjectWithProperties } from "./util/typeGuards";
import { reorderLockToken } from "./util/utils";

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
 * Describes the delivery annotations for Service Bus.
 */
export interface ServiceBusDeliveryAnnotations extends DeliveryAnnotations {
  /**
   * The offset of the last event.
   */
  last_enqueued_offset?: string;
  /**
   * The sequence number of the last event.
   */
  last_enqueued_sequence_number?: number;
  /**
   * The enqueued time of the last event.
   */
  last_enqueued_time_utc?: number;
  /**
   * The retrieval time of the last event.
   */
  runtime_info_retrieval_time_utc?: number;
  /**
   * Any unknown delivery annotations.
   */
  [x: string]: any;
}

/**
 * @internal
 * Describes the message annotations for Service Bus.
 */
export interface ServiceBusMessageAnnotations extends MessageAnnotations {
  /**
   * Annotation for the partition key set for the event.
   */
  "x-opt-partition-key"?: string | null;
  /**
   * Annontation for the sequence number of the event.
   */
  "x-opt-sequence-number"?: number;
  /**
   * Annotation for the enqueued time of the event.
   */
  "x-opt-enqueued-time"?: number;
  /**
   * Annotation for the offset of the event.
   */
  "x-opt-offset"?: string;
  /**
   * Annotation for the message being locked until.
   */
  "x-opt-locked-until"?: Date | number;
  /**
   * Annotation for the message state.
   */
  "x-opt-message-state"?: number;
}

/**
 * Describes the reason and error description for dead lettering a message using the `deadLetter()`
 * method on the message received from Service Bus.
 */
export interface DeadLetterOptions {
  /**
   * The reason for deadlettering the message.
   */
  deadLetterReason: string;
  /**
   * The error description for deadlettering the message.
   */
  deadLetterErrorDescription: string;
}

/**
 * Describes the message to be sent to Service Bus.
 */
export interface ServiceBusMessage {
  /**
   * The message body that needs to be sent or is received.
   * If the application receiving the message is not using this SDK,
   * convert your body payload to a byte array or Buffer for better
   * cross-language compatibility.
   */
  body: any;
  /**
   * The message identifier is an
   * application-defined value that uniquely identifies the message and its payload.
   *
   * Note: Numbers that are not whole integers are not allowed.
   */
  messageId?: string | number | Buffer;
  /**
   * The content type of the message. Optionally describes
   * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
   * example "application/json".
   */
  contentType?: string;
  /**
   * The correlation identifier that allows an
   * application to specify a context for the message for the purposes of correlation, for example
   * reflecting the MessageId of a message that is being replied to.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation | Message Routing and Correlation}.
   */
  correlationId?: string | number | Buffer;
  /**
   * The partition key for sending a message to a partitioned entity.
   * Maximum length is 128 characters. For {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-partitioning | partitioned entities},
   * setting this value enables assigning related messages to the same internal partition,
   * so that submission sequence order is correctly recorded. The partition is chosen by a hash
   * function over this value and cannot be chosen directly.
   * - For session-aware entities, the `sessionId` property overrides this value.
   * - For non partitioned entities, partition key will be ignored
   *
   */
  partitionKey?: string;
  /**
   * The partition key for sending a message into an entity
   * via a partitioned transfer queue. Maximum length is 128 characters. If a message is sent via a
   * transfer queue in the scope of a transaction, this value selects the transfer queue partition:
   * This is functionally equivalent to `partitionKey` property and ensures that messages are kept
   * together and in order as they are transferred.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-transactions#transfers-and-send-via | Transfers and Send Via}.
   */

  // Will be required later for implementing Transactions
  // viaPartitionKey?: string;

  /**
   * The session identifier for a session-aware entity. Maximum
   * length is 128 characters. For session-aware entities, this application-defined value specifies
   * the session affiliation of the message. Messages with the same session identifier are subject
   * to summary locking and enable exact in-order processing and demultiplexing. For
   * session-unaware entities, this value is ignored.
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions | Message Sessions}.
   */
  sessionId?: string;
  /**
   * The session identifier augmenting the `replyTo` address.
   * Maximum length is 128 characters. This value augments the ReplyTo information and specifies
   * which SessionId should be set for the reply when sent to the reply entity.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation | Message Routing and Correlation}.
   */
  replyToSessionId?: string;
  /**
   * The message’s time to live value. This value is the relative
   * duration after which the message expires, starting from the instant the message has been
   * accepted and stored by the broker, as captured in `enqueuedTimeUtc`. When not set explicitly,
   * the assumed value is the DefaultTimeToLive for the respective queue or topic. A message-level
   * `timeToLive` value cannot be longer than the entity's DefaultTimeToLive setting and it is
   * silently adjusted if it does. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-expiration | Expiration}.
   */
  timeToLive?: number;
  /**
   * The application specific label. This property enables the
   * application to indicate the purpose of the message to the receiver in a standardized. fashion,
   * similar to an email subject line. The mapped AMQP property is "subject".
   */
  subject?: string;
  /**
   * The "to" address. This property is reserved for future use in routing
   * scenarios and presently ignored by the broker itself. Applications can use this value in
   * rule-driven {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-auto-forwarding | auto-forward chaining}
   * scenarios to indicate the intended logical destination of the message.
   */
  to?: string;
  /**
   * The address of an entity to send replies to. This optional and
   * application-defined value is a standard way to express a reply path to the receiver of the
   * message. When a sender expects a reply, it sets the value to the absolute or relative path of
   * the queue or topic it expects the reply to be sent to. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation | Message Routing and Correlation}.
   */
  replyTo?: string;
  /**
   * The date and time in UTC at which the message will
   * be enqueued. This property returns the time in UTC; when setting the property, the
   * supplied DateTime value must also be in UTC. This value is for delayed message sending.
   * It is utilized to delay messages sending to a specific time in the future. Message enqueuing
   * time does not mean that the message will be sent at the same time. It will get enqueued,
   * but the actual sending time depends on the queue's workload and its state.
   */
  scheduledEnqueueTimeUtc?: Date;
  /**
   * The application specific properties which can be
   * used for custom message metadata.
   */
  applicationProperties?: { [key: string]: number | boolean | string | Date | null };
}

/**
 * @internal
 * Gets the error message for when a property on given message is not of expected type
 */
export function getMessagePropertyTypeMismatchError(msg: ServiceBusMessage): Error | undefined {
  if (msg.contentType != null && typeof msg.contentType !== "string") {
    return new TypeError("The property 'contentType' on the message must be of type 'string'");
  }

  if (msg.subject != null && typeof msg.subject !== "string") {
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
 * Converts given ServiceBusMessage to RheaMessage
 */
export function toRheaMessage(
  msg: ServiceBusMessage | ServiceBusReceivedMessage | AmqpAnnotatedMessage,
  encoder: Pick<typeof defaultDataTransformer, "encode">
): RheaMessage {
  let amqpMsg: RheaMessage;
  if (isAmqpAnnotatedMessage(msg)) {
    amqpMsg = {
      ...AmqpAnnotatedMessage.toRheaMessage(msg),
      body: encoder.encode(msg.body, msg.bodyType ?? "data")
    };
  } else {
    let bodyType: "data" | "sequence" | "value" = "data";

    if (isServiceBusReceivedMessage(msg)) {
      /*
       * TODO: this is a bit complicated.
       *
       * It seems reasonable to expect to be able to round-trip a message (ie,
       * receive a message, and then send it again, possibly to another queue / topic).
       * If the user does that we need to make sure to respect their original AMQP
       * type so when the message is re - encoded we don't put 'body' into the wrong spot.
       *
       * The complication is that we need to decide if we're okay with respecting a field
       * from the rawAmqpMessage, which up until now we've treated as just vestigial
       * information on send. My hope is that the use case of "alter the sb message in some
       * incompatible way with the underying _rawAmqpMessage.bodyType" is not common
       * enough for us to try to do anything more than what I'm doing here.
       */
      bodyType = msg._rawAmqpMessage.bodyType ?? "data";
    }

    // TODO: it seems sensible that we'd also do this for AMQPAnnotated message.
    const validationError = getMessagePropertyTypeMismatchError(msg);

    if (validationError) {
      throw validationError;
    }

    amqpMsg = {
      body: encoder.encode(msg.body, bodyType),
      message_annotations: {}
    };

    amqpMsg.ttl = msg.timeToLive;
  }

  if (amqpMsg.ttl != null && amqpMsg.ttl !== Constants.maxDurationValue) {
    amqpMsg.creation_time = new Date();
    amqpMsg.absolute_expiry_time = new Date(
      Math.min(Constants.maxAbsoluteExpiryTime, (amqpMsg.creation_time as any) + amqpMsg.ttl)
    );
  }

  if (isAmqpAnnotatedMessage(msg)) {
    return amqpMsg;
  }

  if (msg.applicationProperties != null) {
    amqpMsg.application_properties = msg.applicationProperties;
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
  if (msg.subject != null) {
    amqpMsg.subject = msg.subject;
  }

  updateMessageId(amqpMsg, msg.messageId);

  if (msg.correlationId != null) {
    amqpMsg.correlation_id = msg.correlationId;
  }
  if (msg.replyToSessionId != null) {
    amqpMsg.reply_to_group_id = msg.replyToSessionId;
  }
  if (msg.partitionKey != null) {
    if (msg.partitionKey.length > Constants.maxPartitionKeyLength) {
      throw new Error(
        "Length of 'partitionKey' property on the message cannot be greater than 128 characters."
      );
    }
    amqpMsg.message_annotations![Constants.partitionKey] = msg.partitionKey;
  }

  // Will be required later for implementing Transactions
  // if (msg.viaPartitionKey != null) {
  //   if (msg.viaPartitionKey.length > Constants.maxPartitionKeyLength) {
  //     throw new Error(
  //       "Length of 'viaPartitionKey' property on the message cannot be greater than 128 characters."
  //     );
  //   }
  //   amqpMsg.message_annotations![Constants.viaPartitionKey] = msg.viaPartitionKey;
  // }

  updateScheduledTime(amqpMsg, msg.scheduledEnqueueTimeUtc);

  logger.verbose("SBMessage to RheaMessage: %O", amqpMsg);
  return amqpMsg;
}

/** @internal */
export function updateMessageId(
  rheaMessage: RheaMessage,
  messageId: RheaMessage["message_id"]
): void {
  if (messageId != null) {
    if (typeof messageId === "string" && messageId.length > Constants.maxMessageIdLength) {
      throw new Error(
        `Length of 'messageId' property on the message cannot be greater than ${Constants.maxMessageIdLength} characters.`
      );
    }

    rheaMessage.message_id = messageId;
  }
}

/** @internal */
export function updateScheduledTime(
  rheaMessage: RheaMessage,
  scheduledEnqueuedTimeUtc: Date | undefined
): void {
  if (scheduledEnqueuedTimeUtc != null) {
    rheaMessage.message_annotations = rheaMessage.message_annotations ?? {};
    rheaMessage.message_annotations[Constants.scheduledEnqueueTime] = scheduledEnqueuedTimeUtc;
  }
}

/**
 * Describes the message received from Service Bus during peek operations and so cannot be settled.
 */
export interface ServiceBusReceivedMessage extends ServiceBusMessage {
  /**
   * The reason for deadlettering the message.
   * @readonly
   */
  readonly deadLetterReason?: string;
  /**
   * The error description for deadlettering the message.
   * @readonly
   */
  readonly deadLetterErrorDescription?: string;
  /**
   * The lock token is a reference to the lock that is being held by the broker in
   * `peekLock` receive mode. Locks are used internally settle messages as explained in the
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement | product documentation in more detail}
   * - Not applicable when the message is received in `receiveAndDelete` receive mode.
   * mode.
   * @readonly
   */
  readonly lockToken?: string;
  /**
   * Number of deliveries that have been attempted for this message. The count is
   * incremented when a message lock expires, or the message is explicitly abandoned using the
   * `abandon()` method on the message.
   * @readonly
   */
  readonly deliveryCount?: number;
  /**
   * The UTC instant at which the message has been accepted and stored in Service Bus.
   * @readonly
   */
  readonly enqueuedTimeUtc?: Date;
  /**
   * The UTC instant at which the message is marked for removal and no longer available for
   * retrieval from the entity due to expiration. This property is computed from 2 other properties
   * on the message: `enqueuedTimeUtc` + `timeToLive`.
   */
  readonly expiresAtUtc?: Date;
  /**
   * The UTC instant until which the message is held locked in the queue/subscription.
   * When the lock expires, the `deliveryCount` is incremented and the message is again available
   * for retrieval.
   * - Not applicable when the message is received in `receiveAndDelete` receive mode.
   * mode.
   */
  lockedUntilUtc?: Date;
  /**
   * The original sequence number of the message. For
   * messages that have been auto-forwarded, this property reflects the sequence number that had
   * first been assigned to the message at its original point of submission.
   * @readonly
   */
  readonly enqueuedSequenceNumber?: number;
  /**
   * The unique number assigned to a message by Service Bus.
   * The sequence number is a unique 64-bit integer assigned to a message as it is accepted
   * and stored by the broker and functions as its true identifier. For partitioned entities,
   * the topmost 16 bits reflect the partition identifier. Sequence numbers monotonically increase.
   * They roll over to 0 when the 48-64 bit range is exhausted.
   *
   * **Max safe integer** that Javascript currently supports is `2^53 - 1`. The sequence number
   * is an AMQP `Long` type which can be upto 64 bits long. To represent that we are using a
   * library named {@link https://github.com/dcodeIO/long.js | long.js}. We expect customers
   * to use the **`Long`** type exported by this library.
   * @readonly
   */
  readonly sequenceNumber?: Long;
  /**
   * The name of the queue or subscription that this message
   * was enqueued on, before it was deadlettered. Only set in messages that have been dead-lettered
   * and subsequently auto-forwarded from the dead-letter sub-queue to another entity. Indicates the
   * entity in which the message was dead-lettered.
   * @readonly
   */
  readonly deadLetterSource?: string;
  /**
   * State of the message can be active, deferred or scheduled. Deferred messages have deferred state,
   * scheduled messages have scheduled state, all other messages have active state.
   */
  readonly state: "active" | "deferred" | "scheduled";
  /**
   * The underlying raw amqp message.
   * @readonly
   */
  readonly _rawAmqpMessage: AmqpAnnotatedMessage;
}

/**
 * @internal
 * Converts given RheaMessage to ServiceBusReceivedMessage
 */
export function fromRheaMessage(
  rheaMessage: RheaMessage,
  delivery?: Delivery,
  shouldReorderLockToken?: boolean
): ServiceBusReceivedMessage {
  if (!rheaMessage) {
    rheaMessage = {
      body: undefined
    };
  }

  const { body, bodyType } = defaultDataTransformer.decodeWithType(rheaMessage.body);

  const sbmsg: ServiceBusMessage = {
    body: body
  };

  if (rheaMessage.application_properties != null) {
    sbmsg.applicationProperties = convertDatesToNumbers(rheaMessage.application_properties);
  }
  if (rheaMessage.content_type != null) {
    sbmsg.contentType = rheaMessage.content_type;
  }
  if (rheaMessage.group_id != null) {
    sbmsg.sessionId = rheaMessage.group_id;
  }
  if (rheaMessage.reply_to != null) {
    sbmsg.replyTo = rheaMessage.reply_to;
  }
  if (rheaMessage.to != null) {
    sbmsg.to = rheaMessage.to;
  }
  if (rheaMessage.ttl != null) {
    sbmsg.timeToLive = rheaMessage.ttl;
  }
  if (rheaMessage.subject != null) {
    sbmsg.subject = rheaMessage.subject;
  }
  if (rheaMessage.message_id != null) {
    sbmsg.messageId = rheaMessage.message_id;
  }
  if (rheaMessage.correlation_id != null) {
    sbmsg.correlationId = rheaMessage.correlation_id;
  }
  if (rheaMessage.reply_to_group_id != null) {
    sbmsg.replyToSessionId = rheaMessage.reply_to_group_id;
  }

  if (rheaMessage.message_annotations != null) {
    if (rheaMessage.message_annotations[Constants.partitionKey] != null) {
      sbmsg.partitionKey = rheaMessage.message_annotations[Constants.partitionKey];
    }

    // Will be required later for implementing Transactions
    // if (msg.message_annotations[Constants.viaPartitionKey] != null) {
    //   sbmsg.viaPartitionKey = msg.message_annotations[Constants.viaPartitionKey];
    // }

    if (rheaMessage.message_annotations[Constants.scheduledEnqueueTime] != null) {
      sbmsg.scheduledEnqueueTimeUtc =
        rheaMessage.message_annotations[Constants.scheduledEnqueueTime];
    }
  }

  type PartialWritable<T> = Partial<
    {
      -readonly [P in keyof T]: T[P];
    }
  >;
  const props: PartialWritable<ServiceBusReceivedMessage> & {
    state: "active" | "deferred" | "scheduled";
  } = { state: "active" };
  if (rheaMessage.message_annotations != null) {
    if (rheaMessage.message_annotations[Constants.deadLetterSource] != null) {
      props.deadLetterSource = rheaMessage.message_annotations[Constants.deadLetterSource];
    }
    const messageState = rheaMessage.message_annotations[Constants.messageState];
    if (messageState === 1) {
      props.state = "deferred";
    } else if (messageState === 2) {
      props.state = "scheduled";
    }
    if (rheaMessage.message_annotations[Constants.enqueueSequenceNumber] != null) {
      props.enqueuedSequenceNumber =
        rheaMessage.message_annotations[Constants.enqueueSequenceNumber];
    }
    if (rheaMessage.message_annotations[Constants.sequenceNumber] != null) {
      if (Buffer.isBuffer(rheaMessage.message_annotations[Constants.sequenceNumber])) {
        props.sequenceNumber = Long.fromBytesBE(
          rheaMessage.message_annotations[Constants.sequenceNumber]
        );
      } else {
        props.sequenceNumber = Long.fromNumber(
          rheaMessage.message_annotations[Constants.sequenceNumber]
        );
      }
    }
    if (rheaMessage.message_annotations[Constants.enqueuedTime] != null) {
      props.enqueuedTimeUtc = new Date(
        rheaMessage.message_annotations[Constants.enqueuedTime] as number
      );
    }
    if (rheaMessage.message_annotations[Constants.lockedUntil] != null) {
      props.lockedUntilUtc = new Date(
        rheaMessage.message_annotations[Constants.lockedUntil] as number
      );
    }
  }
  if (rheaMessage.ttl == null) rheaMessage.ttl = Constants.maxDurationValue;
  if (props.enqueuedTimeUtc) {
    props.expiresAtUtc = new Date(
      Math.min(props.enqueuedTimeUtc.getTime() + rheaMessage.ttl, Constants.maxDurationValue)
    );
  }

  const rawMessage = AmqpAnnotatedMessage.fromRheaMessage(rheaMessage);
  rawMessage.bodyType = bodyType;

  if (rawMessage.applicationProperties) {
    rawMessage.applicationProperties = convertDatesToNumbers(rawMessage.applicationProperties);
  }
  if (rawMessage.deliveryAnnotations) {
    rawMessage.deliveryAnnotations = convertDatesToNumbers(rawMessage.deliveryAnnotations);
  }
  if (rawMessage.messageAnnotations) {
    rawMessage.messageAnnotations = convertDatesToNumbers(rawMessage.messageAnnotations);
  }

  const rcvdsbmsg: ServiceBusReceivedMessage = {
    _rawAmqpMessage: rawMessage,
    deliveryCount: rheaMessage.delivery_count,
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
    ...props,
    deadLetterReason: sbmsg.applicationProperties?.DeadLetterReason as string | undefined,
    deadLetterErrorDescription: sbmsg.applicationProperties?.DeadLetterErrorDescription as
      | string
      | undefined
  };

  logger.verbose("AmqpMessage to ServiceBusReceivedMessage: %O", rcvdsbmsg);
  return rcvdsbmsg;
}

/**
 * @internal
 */
export function isServiceBusMessage(possible: unknown): possible is ServiceBusMessage {
  return isObjectWithProperties(possible, ["body"]);
}

/**
 * @internal
 */
export function isAmqpAnnotatedMessage(possible: unknown): possible is AmqpAnnotatedMessage {
  return (
    isObjectWithProperties(possible, ["body", "bodyType"]) &&
    possible.constructor.name !== ServiceBusMessageImpl.name
  );
}

/**
 * @internal
 */
export function isServiceBusReceivedMessage(
  possible: unknown
): possible is ServiceBusReceivedMessage {
  return isServiceBusMessage(possible) && "_rawAmqpMessage" in possible;
}

/**
 * Describes the message received from Service Bus.
 *
 * @internal
 */
export class ServiceBusMessageImpl implements ServiceBusReceivedMessage {
  /**
   * The message body that needs to be sent or is received.
   */
  body: any;
  /**
   * The application specific properties.
   */
  applicationProperties?: { [key: string]: any };
  /**
   * The message identifier is an
   * application-defined value that uniquely identifies the message and its payload. The identifier
   * is a free-form string and can reflect a GUID or an identifier derived from the application
   * context. If enabled, the
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/duplicate-detection | duplicate detection}
   * identifies and removes second and further submissions of messages with the same MessageId.
   */
  messageId?: string | number | Buffer;
  /**
   * The content type of the message. Optionally describes
   * the payload of the message, with a descriptor following the format of RFC2045, Section 5, for
   * example "application/json".
   */
  contentType?: string;
  /**
   * The correlation identifier that allows an
   * application to specify a context for the message for the purposes of correlation, for example
   * reflecting the MessageId of a message that is being replied to.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation | Message Routing and Correlation}.
   */
  correlationId?: string | number | Buffer;
  /**
   * The partition key for sending a message to a
   * partitioned entity. Maximum length is 128 characters. For {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-partitioning | partitioned entities},
   * setting this value enables assigning related messages to the same internal partition,
   * so that submission sequence order is correctly recorded. The partition is chosen by a hash
   * function over this value and cannot be chosen directly. For session-aware entities,
   * the `sessionId` property overrides this value.
   */
  partitionKey?: string;
  /**
   * The partition key for sending a message into an entity
   * via a partitioned transfer queue. Maximum length is 128 characters. If a message is sent via a
   * transfer queue in the scope of a transaction, this value selects the transfer queue partition:
   * This is functionally equivalent to `partitionKey` property and ensures that messages are kept
   * together and in order as they are transferred.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-transactions#transfers-and-send-via | Transfers and Send Via}.
   */
  // Will be required later for implementing Transactions
  // viaPartitionKey?: string;
  /**
   * The session identifier for a session-aware entity. Maximum
   * length is 128 characters. For session-aware entities, this application-defined value specifies
   * the session affiliation of the message. Messages with the same session identifier are subject
   * to summary locking and enable exact in-order processing and demultiplexing. For
   * session-unaware entities, this value is ignored.
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-sessions | Message Sessions}.
   */
  sessionId?: string;
  /**
   * The session identifier augmenting the `replyTo` address.
   * Maximum length is 128 characters. This value augments the ReplyTo information and specifies
   * which SessionId should be set for the reply when sent to the reply entity.
   * See {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation | Message Routing and Correlation}.
   */
  replyToSessionId?: string;
  /**
   * The message’s time to live value. This value is the relative
   * duration after which the message expires, starting from the instant the message has been
   * accepted and stored by the broker, as captured in `enqueuedTimeUtc`. When not set explicitly,
   * the assumed value is the DefaultTimeToLive for the respective queue or topic. A message-level
   * `timeToLive` value cannot be longer than the entity's DefaultTimeToLive setting and it is
   * silently adjusted if it does. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-expiration | Expiration}.
   */
  timeToLive?: number;
  /**
   * The application specific label. This property enables the
   * application to indicate the purpose of the message to the receiver in a standardized. fashion,
   * similar to an email subject line. The mapped AMQP property is "subject".
   */
  subject?: string;
  /**
   * The "to" address. This property is reserved for future use in routing
   * scenarios and presently ignored by the broker itself. Applications can use this value in
   * rule-driven {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-auto-forwarding | auto-forward chaining}
   * scenarios to indicate the intended logical destination of the message.
   */
  to?: string;
  /**
   * The address of an entity to send replies to. This optional and
   * application-defined value is a standard way to express a reply path to the receiver of the
   * message. When a sender expects a reply, it sets the value to the absolute or relative path of
   * the queue or topic it expects the reply to be sent to. See
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messages-payloads?#message-routing-and-correlation | Message Routing and Correlation}.
   */
  replyTo?: string;
  /**
   * The date and time in UTC at which the message will
   * be enqueued. This property returns the time in UTC; when setting the property, the
   * supplied DateTime value must also be in UTC. This value is for delayed message sending.
   * It is utilized to delay messages sending to a specific time in the future. Message enqueuing
   * time does not mean that the message will be sent at the same time. It will get enqueued,
   * but the actual sending time depends on the queue's workload and its state.
   */
  scheduledEnqueueTimeUtc?: Date;
  /**
   * The lock token is a reference to the lock that is being held by the broker in
   * `peekLock` receive mode. Locks are used internally settle messages as explained in the
   * {@link https://docs.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement | product documentation in more detail}
   * - Not applicable when the message is received in `receiveAndDelete` receive mode.
   * mode.
   * @readonly
   */
  readonly lockToken?: string;
  /**
   * Number of deliveries that have been attempted for this message. The count is
   * incremented when a message lock expires, or the message is explicitly abandoned using the
   * `abandon()` method on the message.
   * @readonly
   */
  readonly deliveryCount?: number;
  /**
   * The UTC instant at which the message has been accepted and stored in Service Bus.
   * @readonly
   */
  readonly enqueuedTimeUtc?: Date;
  /**
   * The UTC instant at which the message is marked for removal and no longer available for
   * retrieval from the entity due to expiration. This property is computed from 2 other properties
   * on the message: `enqueuedTimeUtc` + `timeToLive`.
   */
  readonly expiresAtUtc?: Date;
  /**
   * The UTC instant until which the message is held locked in the queue/subscription.
   * When the lock expires, the `deliveryCount` is incremented and the message is again available
   * for retrieval.
   * - Not applicable when the message is received in `receiveAndDelete` receive mode.
   * mode.
   */
  lockedUntilUtc?: Date;
  /**
   * The original sequence number of the message. For
   * messages that have been auto-forwarded, this property reflects the sequence number that had
   * first been assigned to the message at its original point of submission.
   * @readonly
   */
  readonly enqueuedSequenceNumber?: number;
  /**
   * The unique number assigned to a message by Service Bus.
   * The sequence number is a unique 64-bit integer assigned to a message as it is accepted
   * and stored by the broker and functions as its true identifier. For partitioned entities,
   * the topmost 16 bits reflect the partition identifier. Sequence numbers monotonically increase.
   * They roll over to 0 when the 48-64 bit range is exhausted.
   * @readonly
   */
  readonly sequenceNumber?: Long;
  /**
   * The name of the queue or subscription that this message
   * was enqueued on, before it was deadlettered. Only set in messages that have been dead-lettered
   * and subsequently auto-forwarded from the dead-letter sub-queue to another entity. Indicates the
   * entity in which the message was dead-lettered.
   * @readonly
   */
  readonly deadLetterSource?: string;
  /**
   * State of the message can be active, deferred or scheduled. Deferred messages have deferred state,
   * scheduled messages have scheduled state, all other messages have active state.
   */
  readonly state: "active" | "deferred" | "scheduled";
  /**
   * The associated delivery of the received message.
   */
  readonly delivery: Delivery;
  /**
   * The underlying raw amqp annotated message.
   * @readonly
   */
  readonly _rawAmqpMessage: AmqpAnnotatedMessage;
  /**
   * The reason for deadlettering the message.
   * @readonly
   */
  readonly deadLetterReason?: string;
  /**
   * The error description for deadlettering the message.
   * @readonly
   */
  readonly deadLetterErrorDescription?: string;
  /**
   * @internal
   */
  constructor(
    msg: RheaMessage,
    delivery: Delivery,
    shouldReorderLockToken: boolean,
    receiveMode: ReceiveMode
  ) {
    const { _rawAmqpMessage, ...restOfMessageProps } = fromRheaMessage(
      msg,
      delivery,
      shouldReorderLockToken
    );
    Object.assign(this, restOfMessageProps);
    this.state = restOfMessageProps.state; // to suppress error TS2564: Property 'state' has no initializer and is not definitely assigned in the constructor.

    // Lock on a message is applicable only in peekLock mode, but the service sets
    // the lock token even in receiveAndDelete mode if the entity in question is partitioned.
    if (receiveMode === "receiveAndDelete") {
      this.lockToken = undefined;
    }

    let actualBodyType:
      | ReturnType<typeof defaultDataTransformer["decodeWithType"]>["bodyType"]
      | undefined = undefined;

    if (msg.body) {
      try {
        const result = defaultDataTransformer.decodeWithType(msg.body);

        this.body = result.body;
        actualBodyType = result.bodyType;
      } catch (err) {
        this.body = undefined;
      }
    }
    this._rawAmqpMessage = _rawAmqpMessage;
    this._rawAmqpMessage.bodyType = actualBodyType;
    this.delivery = delivery;
  }

  /**
   * Creates a clone of the current message to allow it to be re-sent to the queue
   * @returns ServiceBusMessage
   */
  clone(): ServiceBusMessage {
    // We are returning a ServiceBusMessage object because that object can then be sent to Service Bus
    const clone: ServiceBusMessage = {
      body: this.body,
      contentType: this.contentType,
      correlationId: this.correlationId,
      subject: this.subject,
      messageId: this.messageId,
      partitionKey: this.partitionKey,
      replyTo: this.replyTo,
      replyToSessionId: this.replyToSessionId,
      scheduledEnqueueTimeUtc: this.scheduledEnqueueTimeUtc,
      sessionId: this.sessionId,
      timeToLive: this.timeToLive,
      to: this.to,
      applicationProperties: this.applicationProperties
      // Will be required later for implementing Transactions
      // viaPartitionKey: this.viaPartitionKey
    };

    return clone;
  }
}

/**
 * Converts any Date objects into a number representing date.getTime().
 * Recursively checks for any Date objects in arrays and objects.
 * @internal
 */
function convertDatesToNumbers<T = unknown>(thing: T): T {
  // fast exit
  if (!isDefined(thing)) return thing;

  // When 'thing' is a Date, return the number representation
  if (
    typeof thing === "object" &&
    isObjectWithProperties(thing, ["getTime"]) &&
    typeof thing.getTime === "function"
  ) {
    return thing.getTime();
  }

  /*
    Examples:
    [0, 'foo', new Date(), { nested: new Date()}]
  */
  if (Array.isArray(thing)) {
    return (thing.map(convertDatesToNumbers) as unknown) as T;
  }

  /*
    Examples:
    { foo: new Date(), children: { nested: new Date() }}
  */
  if (typeof thing === "object" && isDefined(thing)) {
    thing = { ...thing };
    for (const key of Object.keys(thing)) {
      (thing as any)[key] = convertDatesToNumbers((thing as any)[key]);
    }
  }

  return thing;
}
