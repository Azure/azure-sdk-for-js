"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable eqeqeq */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmqpMessageProperties = void 0;
const log_js_1 = require("./log.js");
/**
 * Describes the operations that can be performed on the amqp message properties.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- renaming constant would be a breaking change.
exports.AmqpMessageProperties = {
    /**
     * Converts MessageProperties to RheaMessageProperties.
     * @param props - Message properties.
     * @returns RheaMessageProperties.
     */
    toRheaMessageProperties(props) {
        const amqpProperties = {};
        if (props.absoluteExpiryTime != undefined) {
            amqpProperties.absolute_expiry_time = new Date(props.absoluteExpiryTime);
        }
        if (props.contentEncoding != undefined) {
            amqpProperties.content_encoding = props.contentEncoding;
        }
        if (props.contentType != undefined) {
            amqpProperties.content_type = props.contentType;
        }
        if (props.correlationId != undefined) {
            amqpProperties.correlation_id = props.correlationId;
        }
        if (props.creationTime != undefined) {
            amqpProperties.creation_time = new Date(props.creationTime);
        }
        if (props.groupId != undefined) {
            amqpProperties.group_id = props.groupId;
        }
        if (props.groupSequence != undefined) {
            amqpProperties.group_sequence = props.groupSequence;
        }
        if (props.messageId != undefined) {
            amqpProperties.message_id = props.messageId;
        }
        if (props.replyTo != undefined) {
            amqpProperties.reply_to = props.replyTo;
        }
        if (props.replyToGroupId != undefined) {
            amqpProperties.reply_to_group_id = props.replyToGroupId;
        }
        if (props.subject != undefined) {
            amqpProperties.subject = props.subject;
        }
        if (props.to != undefined) {
            amqpProperties.to = props.to;
        }
        // if (props.userId != undefined) {
        //   amqpProperties.user_id = props.userId;
        // }
        log_js_1.logger.verbose("To RheaMessageProperties: %O", amqpProperties);
        return amqpProperties;
    },
    /**
     * Converts RheaMessageProperties to MessageProperties.
     * @param props - Amqp message properties.
     * @returns MessageProperties.
     */
    fromRheaMessageProperties(props) {
        const msgProperties = {};
        if (props.absolute_expiry_time != undefined) {
            msgProperties.absoluteExpiryTime = props.absolute_expiry_time.getTime();
        }
        if (props.content_encoding != undefined) {
            msgProperties.contentEncoding = props.content_encoding;
        }
        if (props.content_type != undefined) {
            msgProperties.contentType = props.content_type;
        }
        if (props.correlation_id != undefined) {
            msgProperties.correlationId = props.correlation_id;
        }
        if (props.creation_time != undefined) {
            msgProperties.creationTime = props.creation_time.getTime();
        }
        if (props.group_id != undefined) {
            msgProperties.groupId = props.group_id;
        }
        if (props.group_sequence != undefined) {
            msgProperties.groupSequence = props.group_sequence;
        }
        if (props.message_id != undefined) {
            msgProperties.messageId = props.message_id;
        }
        if (props.reply_to != undefined) {
            msgProperties.replyTo = props.reply_to;
        }
        if (props.reply_to_group_id != undefined) {
            msgProperties.replyToGroupId = props.reply_to_group_id;
        }
        if (props.subject != undefined) {
            msgProperties.subject = props.subject;
        }
        if (props.to != undefined) {
            msgProperties.to = props.to;
        }
        // if (props.user_id != undefined) {
        //   msgProperties.userId = props.user_id;
        // }
        log_js_1.logger.verbose("From RheaMessageProperties: %O", msgProperties);
        return msgProperties;
    },
};
//# sourceMappingURL=messageProperties.js.map