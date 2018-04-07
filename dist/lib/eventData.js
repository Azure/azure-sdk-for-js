"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const Constants = require("./util/constants");
var EventData;
(function (EventData) {
    function fromAmqpMessage(msg) {
        // TODO: Look at how other sdks are encoding their payloads and copy them. This will ensure consistency across all the sdks.
        let data = {
            body: msg.body,
            _raw_amqp_mesage: msg
        };
        if (msg.message_annotations) {
            data.annotations = msg.message_annotations;
            data.partitionKey = msg.message_annotations[Constants.partitionKey];
            data.sequenceNumber = msg.message_annotations[Constants.sequenceNumber];
            data.enqueuedTimeUtc = new Date(msg.message_annotations[Constants.enqueuedTime]);
            data.offset = msg.message_annotations[Constants.offset];
        }
        if (msg.properties) {
            data.properties = msg.properties;
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
    function toAmqpMessage(data) {
        let msg = {
            body: data.body
        };
        if (data.annotations) {
            msg.message_annotations = data.annotations;
        }
        if (data.properties) {
            msg.properties = data.properties;
        }
        if (data.applicationProperties) {
            msg.application_properties = data.applicationProperties;
        }
        if (data.partitionKey) {
            if (!msg.message_annotations)
                msg.message_annotations = {};
            msg.message_annotations[Constants.partitionKey] = data.partitionKey;
        }
        if (data.sequenceNumber) {
            if (!msg.message_annotations)
                msg.message_annotations = {};
            msg.message_annotations[Constants.sequenceNumber] = data.sequenceNumber;
        }
        if (data.enqueuedTimeUtc) {
            if (!msg.message_annotations)
                msg.message_annotations = {};
            msg.message_annotations[Constants.enqueuedTime] = data.enqueuedTimeUtc.getTime();
        }
        if (data.offset) {
            if (!msg.message_annotations)
                msg.message_annotations = {};
            msg.message_annotations[Constants.offset] = data.offset;
        }
        if (data.lastEnqueuedOffset) {
            if (!msg.delivery_annotations)
                msg.delivery_annotations = {};
            msg.delivery_annotations.last_enqueued_offset = data.lastEnqueuedOffset;
        }
        if (data.lastSequenceNumber) {
            if (!msg.delivery_annotations)
                msg.delivery_annotations = {};
            msg.delivery_annotations.last_enqueued_sequence_number = data.lastSequenceNumber;
        }
        if (data.lastEnqueuedTime) {
            if (!msg.delivery_annotations)
                msg.delivery_annotations = {};
            msg.delivery_annotations.last_enqueued_time_utc = data.lastEnqueuedTime.getTime();
        }
        if (data.retrievalTime) {
            if (!msg.delivery_annotations)
                msg.delivery_annotations = {};
            msg.delivery_annotations.runtime_info_retrieval_time_utc = data.retrievalTime.getTime();
        }
        return msg;
    }
    EventData.toAmqpMessage = toAmqpMessage;
})(EventData = exports.EventData || (exports.EventData = {}));
//# sourceMappingURL=eventData.js.map