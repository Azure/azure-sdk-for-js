import type { MessageProperties as RheaMessageProperties } from "rhea-promise";
/**
 * Describes the defined set of standard properties of the message.
 */
export interface AmqpMessageProperties {
    /**
     * The application message identifier that uniquely identifies a message.
     * The user is responsible for making sure that this is unique in the given context. Guids usually make a good fit.
     */
    messageId?: string | number | Buffer;
    /**
     * The address of the node to send replies to.
     */
    replyTo?: string;
    /**
     * The address of the node the message is destined for.
     */
    to?: string;
    /**
     * The id that can be used to mark or identify messages between clients.
     */
    correlationId?: string | number | Buffer;
    /**
     * MIME type for the message.
     */
    contentType?: string;
    /**
     * The content-encoding property is used as a modifier to the content-type.
     * When present, its value indicates what additional content encodings have been applied to the application-data.
     */
    contentEncoding?: string;
    /**
     * The time when this message is considered expired.
     */
    absoluteExpiryTime?: number;
    /**
     * The time this message was created.
     */
    creationTime?: number;
    /**
     * The group this message belongs to.
     */
    groupId?: string;
    /**
     * The sequence number of this message with its group.
     */
    groupSequence?: number;
    /**
     * The group the reply message belongs to.
     */
    replyToGroupId?: string;
    /**
     * A common field for summary information about the message
     * content and purpose.
     */
    subject?: string;
}
/**
 * Describes the operations that can be performed on the amqp message properties.
 */
export declare const AmqpMessageProperties: {
    /**
     * Converts MessageProperties to RheaMessageProperties.
     * @param props - Message properties.
     * @returns RheaMessageProperties.
     */
    toRheaMessageProperties(props: AmqpMessageProperties): RheaMessageProperties;
    /**
     * Converts RheaMessageProperties to MessageProperties.
     * @param props - Amqp message properties.
     * @returns MessageProperties.
     */
    fromRheaMessageProperties(props: RheaMessageProperties): AmqpMessageProperties;
};
//# sourceMappingURL=messageProperties.d.ts.map