// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AmqpAnnotatedMessage, Constants } from "@azure/core-amqp";
import { defaultDataTransformer } from "./dataTransformer.js";
import { types } from "rhea-promise";
import { isDefined, isObjectWithProperties, objectHasProperty } from "@azure/core-util";
import { idempotentProducerAmqpPropertyNames } from "./util/constants.js";
import isBuffer from "is-buffer";
const messagePropertiesMap = {
    message_id: "messageId",
    user_id: "userId",
    to: "to",
    subject: "subject",
    reply_to: "replyTo",
    correlation_id: "correlationId",
    content_type: "contentType",
    content_encoding: "contentEncoding",
    absolute_expiry_time: "absoluteExpiryTime",
    creation_time: "creationTime",
    group_id: "groupId",
    group_sequence: "groupSequence",
    reply_to_group_id: "replyToGroupId",
};
/**
 * Converts the AMQP message to an EventData.
 * @param msg - The AMQP message that needs to be converted to EventData.
 * @param skipParsingBodyAsJson - Boolean to skip running JSON.parse() on message body when body type is `content`.
 * @internal
 */
export function fromRheaMessage(msg, skipParsingBodyAsJson) {
    const rawMessage = AmqpAnnotatedMessage.fromRheaMessage(msg);
    const { body, bodyType } = defaultDataTransformer.decode(msg.body, skipParsingBodyAsJson);
    rawMessage.bodyType = bodyType;
    const data = {
        body,
        getRawAmqpMessage() {
            return rawMessage;
        },
    };
    if (msg.message_annotations) {
        for (const annotationKey of Object.keys(msg.message_annotations)) {
            switch (annotationKey) {
                case Constants.partitionKey:
                    data.partitionKey = msg.message_annotations[annotationKey];
                    break;
                case Constants.sequenceNumber:
                    data.sequenceNumber = msg.message_annotations[annotationKey];
                    break;
                case Constants.enqueuedTime:
                    data.enqueuedTimeUtc = new Date(msg.message_annotations[annotationKey]);
                    break;
                case Constants.offset:
                    data.offset = msg.message_annotations[annotationKey];
                    break;
                default:
                    if (!data.systemProperties) {
                        data.systemProperties = {};
                    }
                    data.systemProperties[annotationKey] = convertDatesToNumbers(msg.message_annotations[annotationKey]);
                    break;
            }
        }
    }
    if (msg.application_properties) {
        data.properties = convertDatesToNumbers(msg.application_properties);
    }
    if (msg.delivery_annotations) {
        data.lastEnqueuedOffset = msg.delivery_annotations.last_enqueued_offset;
        data.lastSequenceNumber = msg.delivery_annotations.last_enqueued_sequence_number;
        data.lastEnqueuedTime = new Date(msg.delivery_annotations.last_enqueued_time_utc);
        data.retrievalTime = new Date(msg.delivery_annotations.runtime_info_retrieval_time_utc);
    }
    const messageProperties = Object.keys(messagePropertiesMap);
    for (const messageProperty of messageProperties) {
        if (!data.systemProperties) {
            data.systemProperties = {};
        }
        if (msg[messageProperty] != null) {
            data.systemProperties[messagePropertiesMap[messageProperty]] = convertDatesToNumbers(msg[messageProperty]);
        }
    }
    if (msg.content_type != null) {
        data.contentType = msg.content_type;
    }
    if (msg.correlation_id != null) {
        data.correlationId = msg.correlation_id;
    }
    if (msg.message_id != null) {
        data.messageId = msg.message_id;
    }
    return data;
}
/**
 * Converts an EventData object to an AMQP message.
 * @param data - The EventData object that needs to be converted to an AMQP message.
 * @param partitionKey - An optional key to determine the partition that this event should land in.
 * @internal
 */
export function toRheaMessage(data, partitionKey) {
    let rheaMessage;
    if (isAmqpAnnotatedMessage(data)) {
        rheaMessage = {
            ...AmqpAnnotatedMessage.toRheaMessage(data),
            body: defaultDataTransformer.encode(data.body, data.bodyType ?? "data"),
        };
    }
    else {
        let bodyType = "data";
        if (typeof data.getRawAmqpMessage === "function") {
            /*
              If the event is being round-tripped, then we respect the `bodyType` of the
              underlying AMQP message.
            */
            bodyType = data.getRawAmqpMessage().bodyType ?? "data";
        }
        rheaMessage = {
            body: defaultDataTransformer.encode(data.body, bodyType),
        };
        // As per the AMQP 1.0 spec If the message-annotations or delivery-annotations section is omitted,
        // it is equivalent to a message-annotations section containing empty map of annotations.
        rheaMessage.message_annotations = {};
        if (data.properties) {
            rheaMessage.application_properties = data.properties;
        }
        if (isDefined(partitionKey)) {
            rheaMessage.message_annotations[Constants.partitionKey] = partitionKey;
            // Event Hub service cannot route messages to a specific partition based on the partition key
            // if AMQP message header is an empty object. Hence we make sure that header is always present
            // with atleast one property. Setting durable to true, helps us achieve that.
            rheaMessage.durable = true;
        }
        if (data.contentType != null) {
            rheaMessage.content_type = data.contentType;
        }
        if (data.correlationId != null) {
            rheaMessage.correlation_id = data.correlationId;
        }
        if (data.messageId != null) {
            if (typeof data.messageId === "string" &&
                data.messageId.length > Constants.maxMessageIdLength) {
                throw new Error(`Length of 'messageId' property on the event cannot be greater than ${Constants.maxMessageIdLength} characters.`);
            }
            rheaMessage.message_id = data.messageId;
        }
    }
    return rheaMessage;
}
/**
 * Asserts that the provided data conforms to the `EventData` interface.
 *
 * This function performs runtime checks on the `data` object to ensure it matches the expected
 * structure and types defined in the `EventData` interface. If any of the checks fail, it throws
 * an error with a descriptive message indicating the mismatch.
 *
 * @param data - The data object to validate as `EventData`.
 * @throws \{Error\} Throws an error if the data does not conform to the `EventData` interface.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function assertIsEventData(data) {
    if (data.contentType != null && typeof data.contentType !== "string") {
        throw new Error(`Invalid 'contentType': expected 'string' or 'undefined', but received '${typeof data.contentType}'.`);
    }
    if (data.correlationId != null &&
        typeof data.correlationId !== "string" &&
        typeof data.correlationId !== "number" &&
        !isBuffer(data.correlationId)) {
        throw new Error(`Invalid 'correlationId': expected 'string', 'number', 'Buffer', or 'undefined', but received '${typeof data.correlationId}'.`);
    }
    if (data.messageId != null &&
        typeof data.messageId !== "string" &&
        typeof data.messageId !== "number" &&
        !isBuffer(data.messageId)) {
        throw new Error(`Invalid 'messageId': expected 'string', 'number', 'Buffer', or 'undefined', but received '${typeof data.messageId}'.`);
    }
    if (data.properties !== undefined &&
        (typeof data.properties !== "object" || Array.isArray(data.properties))) {
        const actualType = Array.isArray(data.properties) ? "array" : typeof data.properties;
        throw new Error(`Invalid 'properties': expected an object or 'undefined', but received '${actualType}'.`);
    }
}
/**
 * @internal
 */
export function isAmqpAnnotatedMessage(possible) {
    return (isObjectWithProperties(possible, ["body", "bodyType"]) &&
        !objectHasProperty(possible, "getRawAmqpMessage"));
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
        objectHasProperty(thing, "getTime") &&
        typeof thing.getTime === "function") {
        return thing.getTime();
    }
    /*
      Examples:
      [0, 'foo', new Date(), { nested: new Date()}]
    */
    if (Array.isArray(thing)) {
        return thing.map(convertDatesToNumbers);
    }
    /*
      Examples:
      { foo: new Date(), children: { nested: new Date() }}
    */
    if (typeof thing === "object" && isDefined(thing)) {
        const thingShallowCopy = { ...thing };
        for (const key of Object.keys(thingShallowCopy)) {
            thingShallowCopy[key] = convertDatesToNumbers(thingShallowCopy[key]);
        }
        return thingShallowCopy;
    }
    return thing;
}
/**
 * Populates a rhea message with idempotent producer properties.
 * @internal
 */
export function populateIdempotentMessageAnnotations(rheaMessage, { isIdempotentPublishingEnabled, ownerLevel, producerGroupId, publishSequenceNumber, }) {
    if (!isIdempotentPublishingEnabled) {
        return;
    }
    const messageAnnotations = rheaMessage.message_annotations || {};
    if (!rheaMessage.message_annotations) {
        rheaMessage.message_annotations = messageAnnotations;
    }
    if (isDefined(ownerLevel)) {
        messageAnnotations[idempotentProducerAmqpPropertyNames.epoch] = types.wrap_short(ownerLevel);
    }
    if (isDefined(producerGroupId)) {
        messageAnnotations[idempotentProducerAmqpPropertyNames.producerId] =
            types.wrap_long(producerGroupId);
    }
    if (isDefined(publishSequenceNumber)) {
        messageAnnotations[idempotentProducerAmqpPropertyNames.producerSequenceNumber] =
            types.wrap_int(publishSequenceNumber);
    }
}
//# sourceMappingURL=eventData.js.map