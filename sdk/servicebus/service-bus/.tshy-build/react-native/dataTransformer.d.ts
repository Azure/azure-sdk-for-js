/** @internal */
export declare const dataSectionTypeCode: 117;
/** @internal */
export declare const sequenceSectionTypeCode: 118;
/** @internal */
export declare const valueSectionTypeCode: 119;
/**
 * Mirror of the internal Section interface in rhea.
 *
 * @internal
 */
export interface RheaAmqpSection {
    typecode: typeof dataSectionTypeCode | typeof sequenceSectionTypeCode | typeof valueSectionTypeCode;
    content: any;
}
/**
 * The default data transformer that will be used by the Azure SDK.
 * @internal
 */
export declare const defaultDataTransformer: {
    /**
     * A function that takes the body property from an EventData object
     * and returns an encoded body (some form of AMQP type).
     *
     * @param body - The AMQP message body
     * @returns The encoded AMQP message body as an AMQP Data type
     * (data section in rhea terms). Section object with following properties:
     * - typecode: 117 (0x75)
     * - content: The given AMQP message body as a Buffer.
     * - multiple: true | undefined.
     */
    encode(body: unknown, bodyType: "data" | "value" | "sequence"): any;
    /**
     * A function that takes the body property from an AMQP message
     * (an AMQP Data type (data section in rhea terms)) and returns the decoded message body.
     * If it cannot decode the body then it returns the body
     * as-is.
     *
     * NOTE: Use this to decode a message body when you know that the entire contents are _only_ contained
     * in the 'data' section of the message (for instance, messages from the $mgmt link). Otherwise
     * use 'defaultDataTransformer.decodeWithType', which can handle data coming from separate sections
     * of the AMQP mesage.
     *
     * @param body - The AMQP message body
     * @param skipParsingBodyAsJson - Boolean to skip running JSON.parse() on message body content.
     * @returns decoded body or the given body as-is.
     */
    decode(body: unknown, skipParsingBodyAsJson: boolean): unknown;
    /**
     * A function that takes the body property from an AMQP message, which can come from either
     * the 'data', 'value' or 'sequence' sections of an AMQP message.
     *
     * If the body is not a JSON string the the raw contents will be returned, along with the bodyType
     * indicating which part of the AMQP message the body was decoded from.
     *
     * @param body - The AMQP message body as received from rhea.
     * @param skipParsingBodyAsJson - Boolean to skip running JSON.parse() on message body.
     * @returns The decoded/raw body and the body type.
     */
    decodeWithType(body: unknown | RheaAmqpSection, skipParsingBodyAsJson: boolean): {
        body: unknown;
        bodyType: "data" | "sequence" | "value";
    };
};
/** @internal */
export declare function isRheaAmqpSection(possibleSection: any | RheaAmqpSection): possibleSection is RheaAmqpSection;
/**
 * Attempts to decode 'body' as a JSON string. If it fails it returns body
 * verbatim.
 *
 * @param body - An AMQP message body.
 * @returns A JSON decoded object, or body if body was not a JSON string.
 *
 * @internal
 */
export declare function tryToJsonDecode(body: any): any;
//# sourceMappingURL=dataTransformer.d.ts.map