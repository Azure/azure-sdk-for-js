// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __rest } from "tslib";
import { AmqpAnnotatedMessage, Constants } from "@azure/core-amqp";
import { Buffer } from "buffer";
import Long from "long";
import { uuid_to_string } from "rhea-promise";
import { defaultDataTransformer } from "./dataTransformer.js";
import { messageLogger as logger } from "./log.js";
import { isDefined, isObjectWithProperties } from "@azure/core-util";
import { reorderLockToken } from "./util/utils.js";
/**
 * @internal
 */
export var DispositionType;
(function (DispositionType) {
    DispositionType["complete"] = "complete";
    DispositionType["deadletter"] = "deadletter";
    DispositionType["abandon"] = "abandon";
    DispositionType["defer"] = "defer";
})(DispositionType || (DispositionType = {}));
/**
 * @internal
 * Gets the error message for when a property on given message is not of expected type
 */
export function getMessagePropertyTypeMismatchError(msg) {
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
    if (msg.messageId != null &&
        typeof msg.messageId !== "string" &&
        typeof msg.messageId !== "number" &&
        !Buffer.isBuffer(msg.messageId)) {
        return new TypeError("The property 'messageId' on the message must be of type string, number or Buffer");
    }
    if (msg.correlationId != null &&
        typeof msg.correlationId !== "string" &&
        typeof msg.correlationId !== "number" &&
        !Buffer.isBuffer(msg.correlationId)) {
        return new TypeError("The property 'correlationId' on the message must be of type string, number or Buffer");
    }
    return;
}
/**
 * @internal
 * Converts given ServiceBusMessage to RheaMessage
 */
export function toRheaMessage(msg, encoder) {
    var _a, _b;
    let amqpMsg;
    if (isAmqpAnnotatedMessage(msg)) {
        amqpMsg = Object.assign(Object.assign({}, AmqpAnnotatedMessage.toRheaMessage(msg)), { body: encoder.encode(msg.body, (_a = msg.bodyType) !== null && _a !== void 0 ? _a : "data") });
    }
    else {
        let bodyType = "data";
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
            bodyType = (_b = msg._rawAmqpMessage.bodyType) !== null && _b !== void 0 ? _b : "data";
        }
        // TODO: it seems sensible that we'd also do this for AMQPAnnotated message.
        const validationError = getMessagePropertyTypeMismatchError(msg);
        if (validationError) {
            throw validationError;
        }
        amqpMsg = {
            body: encoder.encode(msg.body, bodyType),
            message_annotations: {},
        };
        if (msg.timeToLive) {
            amqpMsg.ttl = Math.min(msg.timeToLive, Constants.maxUint32Value);
            amqpMsg.creation_time = new Date();
            amqpMsg.absolute_expiry_time = new Date(Math.min(amqpMsg.creation_time.getTime() + amqpMsg.ttl, Constants.maxAbsoluteExpiryTime));
        }
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
            throw new Error("Length of 'sessionId' property on the message cannot be greater than 128 characters.");
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
            throw new Error("Length of 'partitionKey' property on the message cannot be greater than 128 characters.");
        }
        amqpMsg.message_annotations[Constants.partitionKey] = msg.partitionKey;
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
export function updateMessageId(rheaMessage, messageId) {
    if (messageId != null) {
        if (typeof messageId === "string" && messageId.length > Constants.maxMessageIdLength) {
            throw new Error(`Length of 'messageId' property on the message cannot be greater than ${Constants.maxMessageIdLength} characters.`);
        }
        rheaMessage.message_id = messageId;
    }
}
/** @internal */
export function updateScheduledTime(rheaMessage, scheduledEnqueuedTimeUtc) {
    var _a;
    if (scheduledEnqueuedTimeUtc != null) {
        rheaMessage.message_annotations = (_a = rheaMessage.message_annotations) !== null && _a !== void 0 ? _a : {};
        rheaMessage.message_annotations[Constants.scheduledEnqueueTime] = scheduledEnqueuedTimeUtc;
    }
}
/**
 * @internal
 * Converts given RheaMessage to ServiceBusReceivedMessage
 */
export function fromRheaMessage(rheaMessage, options) {
    var _a, _b, _c, _d, _e;
    if (!rheaMessage) {
        rheaMessage = {
            body: undefined,
        };
    }
    const { skipParsingBodyAsJson, delivery, shouldReorderLockToken, skipConvertingDate = false, } = options;
    const { body, bodyType } = defaultDataTransformer.decodeWithType(rheaMessage.body, skipParsingBodyAsJson);
    const sbmsg = {
        body: body,
    };
    if (rheaMessage.application_properties != null) {
        sbmsg.applicationProperties = skipConvertingDate
            ? rheaMessage.application_properties
            : convertDatesToNumbers(rheaMessage.application_properties);
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
    const props = { state: "active" };
    if (rheaMessage.message_annotations != null) {
        if (rheaMessage.message_annotations[Constants.deadLetterSource] != null) {
            props.deadLetterSource = rheaMessage.message_annotations[Constants.deadLetterSource];
        }
        const messageState = rheaMessage.message_annotations[Constants.messageState];
        if (messageState === 1) {
            props.state = "deferred";
        }
        else if (messageState === 2) {
            props.state = "scheduled";
        }
        if (rheaMessage.message_annotations[Constants.enqueueSequenceNumber] != null) {
            props.enqueuedSequenceNumber =
                rheaMessage.message_annotations[Constants.enqueueSequenceNumber];
        }
        if (rheaMessage.message_annotations[Constants.sequenceNumber] != null) {
            if (Buffer.isBuffer(rheaMessage.message_annotations[Constants.sequenceNumber])) {
                props.sequenceNumber = Long.fromBytesBE(rheaMessage.message_annotations[Constants.sequenceNumber]);
            }
            else {
                props.sequenceNumber = Long.fromNumber(rheaMessage.message_annotations[Constants.sequenceNumber]);
            }
        }
        if (rheaMessage.message_annotations[Constants.enqueuedTime] != null) {
            props.enqueuedTimeUtc = new Date(rheaMessage.message_annotations[Constants.enqueuedTime]);
        }
        if (rheaMessage.message_annotations[Constants.lockedUntil] != null) {
            props.lockedUntilUtc = new Date(rheaMessage.message_annotations[Constants.lockedUntil]);
        }
    }
    const rawMessage = AmqpAnnotatedMessage.fromRheaMessage(rheaMessage);
    rawMessage.bodyType = bodyType;
    if (rheaMessage.ttl == null) {
        rheaMessage.ttl = (_b = (_a = rawMessage.header) === null || _a === void 0 ? void 0 : _a.timeToLive) !== null && _b !== void 0 ? _b : Constants.maxDurationValue;
    }
    if (props.enqueuedTimeUtc) {
        props.expiresAtUtc = new Date(Math.min(props.enqueuedTimeUtc.getTime() + rheaMessage.ttl, Constants.maxDurationValue));
    }
    if (rawMessage.applicationProperties) {
        rawMessage.applicationProperties = skipConvertingDate
            ? rawMessage.applicationProperties
            : convertDatesToNumbers(rawMessage.applicationProperties);
    }
    if (rawMessage.deliveryAnnotations) {
        rawMessage.deliveryAnnotations = skipConvertingDate
            ? rawMessage.deliveryAnnotations
            : convertDatesToNumbers(rawMessage.deliveryAnnotations);
    }
    if (rawMessage.messageAnnotations) {
        rawMessage.messageAnnotations = skipConvertingDate
            ? rawMessage.messageAnnotations
            : convertDatesToNumbers(rawMessage.messageAnnotations);
    }
    if ((_c = rawMessage.header) === null || _c === void 0 ? void 0 : _c.timeToLive) {
        sbmsg.timeToLive = rawMessage.header.timeToLive;
    }
    const rcvdsbmsg = Object.assign(Object.assign(Object.assign({ _rawAmqpMessage: rawMessage, deliveryCount: rheaMessage.delivery_count, lockToken: delivery && delivery.tag && delivery.tag.length !== 0
            ? uuid_to_string(shouldReorderLockToken === true
                ? reorderLockToken(typeof delivery.tag === "string" ? Buffer.from(delivery.tag) : delivery.tag)
                : typeof delivery.tag === "string"
                    ? Buffer.from(delivery.tag)
                    : delivery.tag)
            : undefined }, sbmsg), props), { deadLetterReason: (_d = sbmsg.applicationProperties) === null || _d === void 0 ? void 0 : _d.DeadLetterReason, deadLetterErrorDescription: (_e = sbmsg.applicationProperties) === null || _e === void 0 ? void 0 : _e.DeadLetterErrorDescription });
    logger.verbose("AmqpMessage to ServiceBusReceivedMessage: %O", rcvdsbmsg);
    return rcvdsbmsg;
}
/**
 * @internal
 */
export function isServiceBusMessage(possible) {
    return isObjectWithProperties(possible, ["body"]);
}
/**
 * @internal
 */
export function isAmqpAnnotatedMessage(possible) {
    return (isObjectWithProperties(possible, ["body", "bodyType"]) &&
        possible.constructor.name !== ServiceBusMessageImpl.name);
}
/**
 * @internal
 */
export function isServiceBusReceivedMessage(possible) {
    return isServiceBusMessage(possible) && "_rawAmqpMessage" in possible;
}
/**
 * Describes the message received from Service Bus.
 *
 * @internal
 */
export class ServiceBusMessageImpl {
    /**
     * @internal
     */
    constructor(msg, delivery, shouldReorderLockToken, receiveMode, skipParsingBodyAsJson, skipConvertingDate) {
        const _a = fromRheaMessage(msg, { skipParsingBodyAsJson, delivery, shouldReorderLockToken, skipConvertingDate }), { _rawAmqpMessage } = _a, restOfMessageProps = __rest(_a, ["_rawAmqpMessage"]);
        this._rawAmqpMessage = _rawAmqpMessage; // need to initialize _rawAmqpMessage property to make compiler happy
        Object.assign(this, restOfMessageProps);
        this.state = restOfMessageProps.state; // to suppress error TS2564: Property 'state' has no initializer and is not definitely assigned in the constructor.
        // Lock on a message is applicable only in peekLock mode, but the service sets
        // the lock token even in receiveAndDelete mode if the entity in question is partitioned.
        if (receiveMode === "receiveAndDelete") {
            this.lockToken = undefined;
        }
        this.delivery = delivery;
    }
    /**
     * Creates a clone of the current message to allow it to be re-sent to the queue
     * @returns ServiceBusMessage
     */
    clone() {
        // We are returning a ServiceBusMessage object because that object can then be sent to Service Bus
        const clone = {
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
            applicationProperties: this.applicationProperties,
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
function convertDatesToNumbers(thing) {
    // fast exit
    if (!isDefined(thing))
        return thing;
    // When 'thing' is a Date, return the number representation
    if (typeof thing === "object" &&
        isObjectWithProperties(thing, ["getTime"]) &&
        typeof thing.getTime === "function") {
        return thing.getTime();
    }
    /*
      Examples:
      [0, 'foo', new Date(), { nested: new Date()}]
    */
    if (Array.isArray(thing)) {
        const result = [];
        for (const element of thing) {
            result.push(convertDatesToNumbers(element));
        }
        return result;
    }
    /*
      Examples:
      { foo: new Date(), children: { nested: new Date() }}
    */
    if (typeof thing === "object" && isDefined(thing)) {
        const thingShallowCopy = Object.assign({}, thing);
        for (const key of Object.keys(thingShallowCopy)) {
            thingShallowCopy[key] = convertDatesToNumbers(thingShallowCopy[key]);
        }
        return thingShallowCopy;
    }
    return thing;
}
//# sourceMappingURL=serviceBusMessage.js.map