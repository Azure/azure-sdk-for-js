"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmqpAnnotatedMessage = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const messageHeader_js_1 = require("./messageHeader.js");
const messageProperties_js_1 = require("./messageProperties.js");
const constants_js_1 = require("./util/constants.js");
/**
 * Describes the operations that can be performed on(or to get) the AmqpAnnotatedMessage.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- renaming constant would be a breaking change.
exports.AmqpAnnotatedMessage = {
    /**
     * Takes RheaMessage(`Message` type from "rhea") and returns it in the AmqpAnnotatedMessage format.
     */
    fromRheaMessage(msg) {
        const amqpMsg = {
            header: messageHeader_js_1.AmqpMessageHeader.fromRheaMessageHeader(msg),
            footer: msg.footer,
            messageAnnotations: msg.message_annotations,
            deliveryAnnotations: msg.delivery_annotations,
            applicationProperties: msg.application_properties,
            properties: messageProperties_js_1.AmqpMessageProperties.fromRheaMessageProperties(msg),
            body: msg.body,
        };
        if (msg.absolute_expiry_time) {
            const absoluteExpiryTime = msg.absolute_expiry_time.getTime();
            amqpMsg.properties.absoluteExpiryTime = Math.min(absoluteExpiryTime, constants_js_1.Constants.maxAbsoluteExpiryTime);
            // The TTL from the header can be at most approximately 49 days (uint32
            // max value milliseconds) due to the AMQP spec. In order to allow for
            // larger TTLs set by the user, we take the difference of the
            // absolute_expiry_time and the creation_time (if both are set). If either of
            // those properties is not set, we fall back to the TTL from the header.
            if (msg.creation_time) {
                amqpMsg.header.timeToLive =
                    amqpMsg.properties.absoluteExpiryTime - msg.creation_time.getTime();
            }
        }
        return amqpMsg;
    },
    /**
     * Takes AmqpAnnotatedMessage and returns it in the RheaMessage(`Message` type from "rhea") format.
     */
    toRheaMessage(msg) {
        var _a, _b;
        const rhMsg = Object.assign(Object.assign(Object.assign({}, messageProperties_js_1.AmqpMessageProperties.toRheaMessageProperties(msg.properties || {})), messageHeader_js_1.AmqpMessageHeader.toRheaMessageHeader(msg.header || {})), { body: msg.body, message_annotations: msg.messageAnnotations, delivery_annotations: msg.deliveryAnnotations, application_properties: msg.applicationProperties, footer: msg.footer });
        // There is a loss of fidelity in the TTL header if larger than uint32 max value. As a workaround
        // we set the absolute_expiry_time and creation_time on the message based on the TTL. These
        // values are then used to reconstruct the accurate TTL for received messages.
        if ((_a = msg.header) === null || _a === void 0 ? void 0 : _a.timeToLive) {
            const ttl = msg.header.timeToLive;
            rhMsg.ttl = Math.min(ttl, constants_js_1.Constants.maxUint32Value);
            rhMsg.creation_time = (_b = rhMsg.creation_time) !== null && _b !== void 0 ? _b : new Date();
            rhMsg.absolute_expiry_time = new Date(Math.min(rhMsg.creation_time.getTime() + ttl, constants_js_1.Constants.maxAbsoluteExpiryTime));
        }
        return rhMsg;
    },
};
//# sourceMappingURL=amqpAnnotatedMessage.js.map