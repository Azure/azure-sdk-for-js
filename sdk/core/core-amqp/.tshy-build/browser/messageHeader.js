// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable eqeqeq */
import { logger } from "./log.js";
/**
 * Describes the operations that can be performed on the message header.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- renaming constant would be a breaking change.
export const AmqpMessageHeader = {
    /**
     * Converts MessageHeader to RheaMessageHeader.
     *
     * @param props - Message header.
     * @returns RheaMessageHeader
     */
    toRheaMessageHeader(props) {
        const amqpHeader = {};
        if (props.deliveryCount != undefined) {
            amqpHeader.delivery_count = props.deliveryCount;
        }
        if (props.durable != undefined)
            amqpHeader.durable = props.durable;
        if (props.firstAcquirer != undefined) {
            amqpHeader.first_acquirer = props.firstAcquirer;
        }
        if (props.priority != undefined) {
            amqpHeader.priority = props.priority;
        }
        if (props.timeToLive != undefined) {
            amqpHeader.ttl = props.timeToLive;
        }
        logger.verbose("To RheaMessageHeader: %O", amqpHeader);
        return amqpHeader;
    },
    /**
     * Converts RheaMessageHeader to MessageHeader.
     *
     * @param props - Amqp Message Header
     * @returns MessageHeader.
     */
    fromRheaMessageHeader(props) {
        const msgHeader = {};
        if (props.delivery_count != undefined) {
            msgHeader.deliveryCount = props.delivery_count;
        }
        if (props.durable != undefined) {
            msgHeader.durable = props.durable;
        }
        if (props.first_acquirer != undefined) {
            msgHeader.firstAcquirer = props.first_acquirer;
        }
        if (props.priority != undefined) {
            msgHeader.priority = props.priority;
        }
        if (props.ttl != undefined) {
            msgHeader.timeToLive = props.ttl;
        }
        logger.verbose("From RheaMessageHeader: %O", msgHeader);
        return msgHeader;
    },
};
//# sourceMappingURL=messageHeader.js.map