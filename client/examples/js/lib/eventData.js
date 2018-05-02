"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const Constants = require("./util/constants");
exports.messageProperties = [
    "message_id", "reply_to", "to", "correlation_id", "content_type", "absolute_expiry_time",
    "group_id", "group_sequence", "reply_to_group_id", "content_encoding", "creation_time"
];
/**
 * Describes the methods on the EventData interface.
 * @module EventData
 */
var EventData;
(function (EventData) {
    /**
     * Converts the AMQP message to an EventData.
     * @param {AmqpMessage} msg The AMQP message that needs to be converted to EventData.
     */
    function fromAmqpMessage(msg) {
        // TODO: Look at how other sdks are encoding their payloads and copy them. This will ensure consistency across all the sdks.
        const data = {
            body: msg.body,
            _raw_amqp_mesage: msg
        };
        if (msg.message_annotations) {
            data.annotations = msg.message_annotations;
            if (msg.message_annotations[Constants.partitionKey])
                data.partitionKey = msg.message_annotations[Constants.partitionKey];
            if (msg.message_annotations[Constants.sequenceNumber])
                data.sequenceNumber = msg.message_annotations[Constants.sequenceNumber];
            if (msg.message_annotations[Constants.enqueuedTime])
                data.enqueuedTimeUtc = new Date(msg.message_annotations[Constants.enqueuedTime]);
            if (msg.message_annotations[Constants.offset])
                data.offset = msg.message_annotations[Constants.offset];
        }
        // Since rhea expects message properties as top level properties we will look for them and unflatten them inside properties.
        for (const prop of exports.messageProperties) {
            if (msg[prop]) {
                if (!data.properties) {
                    data.properties = {};
                }
                data.properties[prop] = msg[prop];
            }
        }
        if (msg.application_properties) {
            data.applicationProperties = msg.application_properties;
        }
        if (msg.delivery_annotations) {
            data.lastEnqueuedOffset = msg.delivery_annotations.last_enqueued_offset;
            data.lastSequenceNumber = msg.delivery_annotations.last_enqueued_sequence_number;
            data.lastEnqueuedTime = new Date(msg.delivery_annotations.last_enqueued_time_utc);
            data.retrievalTime = new Date(msg.delivery_annotations.runtime_info_retrieval_time_utc);
        }
        return data;
    }
    EventData.fromAmqpMessage = fromAmqpMessage;
    /**
     * Converts an EventData object to an AMQP message.
     * @param {EventData} data The EventData object that needs to be converted to an AMQP message.
     */
    function toAmqpMessage(data) {
        const msg = {
            body: data.body,
        };
        // As per the AMQP 1.0 spec If the message-annotations or delivery-annotations section is omitted,
        // it is equivalent to a message-annotations section containing anempty map of annotations.
        msg.message_annotations = {};
        msg.delivery_annotations = {};
        if (data.annotations) {
            msg.message_annotations = data.annotations;
        }
        if (data.properties) {
            // Set amqp message properties as top level properties, since rhea sends them as top level properties.
            for (const prop in data.properties) {
                msg[prop] = data.properties[prop];
            }
        }
        if (data.applicationProperties) {
            msg.application_properties = data.applicationProperties;
        }
        if (data.partitionKey) {
            msg.message_annotations[Constants.partitionKey] = data.partitionKey;
        }
        if (data.sequenceNumber != undefined) {
            msg.message_annotations[Constants.sequenceNumber] = data.sequenceNumber;
        }
        if (data.enqueuedTimeUtc) {
            msg.message_annotations[Constants.enqueuedTime] = data.enqueuedTimeUtc.getTime();
        }
        if (data.offset != undefined) {
            msg.message_annotations[Constants.offset] = data.offset;
        }
        if (data.lastEnqueuedOffset != undefined) {
            msg.delivery_annotations.last_enqueued_offset = data.lastEnqueuedOffset;
        }
        if (data.lastSequenceNumber != undefined) {
            msg.delivery_annotations.last_enqueued_sequence_number = data.lastSequenceNumber;
        }
        if (data.lastEnqueuedTime) {
            msg.delivery_annotations.last_enqueued_time_utc = data.lastEnqueuedTime.getTime();
        }
        if (data.retrievalTime) {
            msg.delivery_annotations.runtime_info_retrieval_time_utc = data.retrievalTime.getTime();
        }
        return msg;
    }
    EventData.toAmqpMessage = toAmqpMessage;
})(EventData = exports.EventData || (exports.EventData = {}));
