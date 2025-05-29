import type { MessageHeader as RheaMessageHeader } from "rhea-promise";
/**
 * Describes the defined set of standard header properties of the message.
 */
export interface AmqpMessageHeader {
    /**
     * If this value is true, then this message has not been
     * acquired by any other link. If this value is false, then this message MAY have previously
     * been acquired by another link or links.
     */
    firstAcquirer?: boolean;
    /**
     * The number of prior unsuccessful delivery attempts.
     */
    deliveryCount?: number;
    /**
     * time to live in ms.
     */
    timeToLive?: number;
    /**
     * Specifies durability requirements.
     */
    durable?: boolean;
    /**
     * The relative message priority. Higher numbers indicate higher
     * priority messages.
     */
    priority?: number;
}
/**
 * Describes the operations that can be performed on the message header.
 */
export declare const AmqpMessageHeader: {
    /**
     * Converts MessageHeader to RheaMessageHeader.
     *
     * @param props - Message header.
     * @returns RheaMessageHeader
     */
    toRheaMessageHeader(props: AmqpMessageHeader): RheaMessageHeader;
    /**
     * Converts RheaMessageHeader to MessageHeader.
     *
     * @param props - Amqp Message Header
     * @returns MessageHeader.
     */
    fromRheaMessageHeader(props: RheaMessageHeader): AmqpMessageHeader;
};
//# sourceMappingURL=messageHeader.d.ts.map