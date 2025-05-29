import { AmqpMessageHeader } from "./messageHeader.js";
import { AmqpMessageProperties } from "./messageProperties.js";
import type { Message as RheaMessage } from "rhea-promise";
/**
 * Describes the AmqpAnnotatedMessage, part of the ServiceBusReceivedMessage(as `amqpAnnotatedMessage` property).
 */
export interface AmqpAnnotatedMessage {
    /**
     * Describes the defined set of standard header properties of the message.
     */
    header?: AmqpMessageHeader;
    /**
     * Describes set of footer properties of the message.
     */
    footer?: {
        [key: string]: any;
    };
    /**
     * A dictionary containing message attributes that will be held in the message header
     */
    messageAnnotations?: {
        [key: string]: any;
    };
    /**
     * A dictionary used for delivery-specific
     * non-standard properties at the head of the message.
     */
    deliveryAnnotations?: {
        [key: string]: any;
    };
    /**
     * A dictionary containing application specific message properties.
     */
    applicationProperties?: {
        [key: string]: any;
    };
    /**
     *  Describes the defined set of standard properties of the message.
     */
    properties?: AmqpMessageProperties;
    /**
     * The message body.
     */
    body: any;
    /**
     * The AMQP section where the data was decoded from.
     */
    bodyType?: "data" | "sequence" | "value";
}
/**
 * Describes the operations that can be performed on(or to get) the AmqpAnnotatedMessage.
 */
export declare const AmqpAnnotatedMessage: {
    /**
     * Takes RheaMessage(`Message` type from "rhea") and returns it in the AmqpAnnotatedMessage format.
     */
    fromRheaMessage(msg: RheaMessage): AmqpAnnotatedMessage;
    /**
     * Takes AmqpAnnotatedMessage and returns it in the RheaMessage(`Message` type from "rhea") format.
     */
    toRheaMessage(msg: AmqpAnnotatedMessage): RheaMessage;
};
//# sourceMappingURL=amqpAnnotatedMessage.d.ts.map