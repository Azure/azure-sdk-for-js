"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromRheaMessage = fromRheaMessage;
exports.toRheaMessage = toRheaMessage;
exports.assertIsEventData = assertIsEventData;
exports.isAmqpAnnotatedMessage = isAmqpAnnotatedMessage;
exports.populateIdempotentMessageAnnotations = populateIdempotentMessageAnnotations;
const tslib_1 = require("tslib");
const core_amqp_1 = require("@azure/core-amqp");
const dataTransformer_js_1 = require("./dataTransformer.js");
const rhea_promise_1 = require("rhea-promise");
const core_util_1 = require("@azure/core-util");
const constants_js_1 = require("./util/constants.js");
const is_buffer_1 = tslib_1.__importDefault(require("is-buffer"));
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
function fromRheaMessage(msg, skipParsingBodyAsJson) {
    const rawMessage = core_amqp_1.AmqpAnnotatedMessage.fromRheaMessage(msg);
    const { body, bodyType } = dataTransformer_js_1.defaultDataTransformer.decode(msg.body, skipParsingBodyAsJson);
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
                case core_amqp_1.Constants.partitionKey:
                    data.partitionKey = msg.message_annotations[annotationKey];
                    break;
                case core_amqp_1.Constants.sequenceNumber:
                    data.sequenceNumber = msg.message_annotations[annotationKey];
                    break;
                case core_amqp_1.Constants.enqueuedTime:
                    data.enqueuedTimeUtc = new Date(msg.message_annotations[annotationKey]);
                    break;
                case core_amqp_1.Constants.offset:
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
function toRheaMessage(data, partitionKey) {
    var _a, _b;
    let rheaMessage;
    if (isAmqpAnnotatedMessage(data)) {
        rheaMessage = Object.assign(Object.assign({}, core_amqp_1.AmqpAnnotatedMessage.toRheaMessage(data)), { body: dataTransformer_js_1.defaultDataTransformer.encode(data.body, (_a = data.bodyType) !== null && _a !== void 0 ? _a : "data") });
    }
    else {
        let bodyType = "data";
        if (typeof data.getRawAmqpMessage === "function") {
            /*
              If the event is being round-tripped, then we respect the `bodyType` of the
              underlying AMQP message.
            */
            bodyType = (_b = data.getRawAmqpMessage().bodyType) !== null && _b !== void 0 ? _b : "data";
        }
        rheaMessage = {
            body: dataTransformer_js_1.defaultDataTransformer.encode(data.body, bodyType),
        };
        // As per the AMQP 1.0 spec If the message-annotations or delivery-annotations section is omitted,
        // it is equivalent to a message-annotations section containing empty map of annotations.
        rheaMessage.message_annotations = {};
        if (data.properties) {
            rheaMessage.application_properties = data.properties;
        }
        if ((0, core_util_1.isDefined)(partitionKey)) {
            rheaMessage.message_annotations[core_amqp_1.Constants.partitionKey] = partitionKey;
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
                data.messageId.length > core_amqp_1.Constants.maxMessageIdLength) {
                throw new Error(`Length of 'messageId' property on the event cannot be greater than ${core_amqp_1.Constants.maxMessageIdLength} characters.`);
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
function assertIsEventData(data) {
    if (data.contentType != null && typeof data.contentType !== "string") {
        throw new Error(`Invalid 'contentType': expected 'string' or 'undefined', but received '${typeof data.contentType}'.`);
    }
    if (data.correlationId != null &&
        typeof data.correlationId !== "string" &&
        typeof data.correlationId !== "number" &&
        !(0, is_buffer_1.default)(data.correlationId)) {
        throw new Error(`Invalid 'correlationId': expected 'string', 'number', 'Buffer', or 'undefined', but received '${typeof data.correlationId}'.`);
    }
    if (data.messageId != null &&
        typeof data.messageId !== "string" &&
        typeof data.messageId !== "number" &&
        !(0, is_buffer_1.default)(data.messageId)) {
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
function isAmqpAnnotatedMessage(possible) {
    return ((0, core_util_1.isObjectWithProperties)(possible, ["body", "bodyType"]) &&
        !(0, core_util_1.objectHasProperty)(possible, "getRawAmqpMessage"));
}
/**
 * Converts any Date objects into a number representing date.getTime().
 * Recursively checks for any Date objects in arrays and objects.
 * @internal
 */
function convertDatesToNumbers(thing) {
    // fast exit
    if (!(0, core_util_1.isDefined)(thing))
        return thing;
    // When 'thing' is a Date, return the number representation
    if (typeof thing === "object" &&
        (0, core_util_1.objectHasProperty)(thing, "getTime") &&
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
    if (typeof thing === "object" && (0, core_util_1.isDefined)(thing)) {
        const thingShallowCopy = Object.assign({}, thing);
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
function populateIdempotentMessageAnnotations(rheaMessage, { isIdempotentPublishingEnabled, ownerLevel, producerGroupId, publishSequenceNumber, }) {
    if (!isIdempotentPublishingEnabled) {
        return;
    }
    const messageAnnotations = rheaMessage.message_annotations || {};
    if (!rheaMessage.message_annotations) {
        rheaMessage.message_annotations = messageAnnotations;
    }
    if ((0, core_util_1.isDefined)(ownerLevel)) {
        messageAnnotations[constants_js_1.idempotentProducerAmqpPropertyNames.epoch] = rhea_promise_1.types.wrap_short(ownerLevel);
    }
    if ((0, core_util_1.isDefined)(producerGroupId)) {
        messageAnnotations[constants_js_1.idempotentProducerAmqpPropertyNames.producerId] =
            rhea_promise_1.types.wrap_long(producerGroupId);
    }
    if ((0, core_util_1.isDefined)(publishSequenceNumber)) {
        messageAnnotations[constants_js_1.idempotentProducerAmqpPropertyNames.producerSequenceNumber] =
            rhea_promise_1.types.wrap_int(publishSequenceNumber);
    }
}
//# sourceMappingURL=eventData.js.map