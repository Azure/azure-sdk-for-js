/**
 * The allowed AMQP message body types.
 * @internal
 */
export type BodyTypes = "data" | "value" | "sequence";
/** @internal */
export declare const dataSectionTypeCode: 117;
/** @internal */
export declare const sequenceSectionTypeCode: 118;
/** @internal */
export declare const valueSectionTypeCode: 119;
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
     * @param bodyType - The AMQP section to story the body in.
     * @returns The encoded AMQP message body as an AMQP Data/Sequence/Value section.
     */
    encode(body: unknown, bodyType: BodyTypes): any;
    /**
     * A function that takes the body property from an AMQP message, which can come from either
     * the 'data', 'value' or 'sequence' sections of an AMQP message.
     *
     * If the body is not a JSON string the the raw contents will be returned, along with the bodyType
     * indicating which part of the AMQP message the body was decoded from.
     *
     * @param body - The AMQP message body as received from rhea.
     * @param skipParsingBodyAsJson - Boolean to skip running JSON.parse() on message body when body type is `content`.
     * @returns The decoded/raw body and the body type.
     */
    decode(body: unknown | RheaAmqpSection, skipParsingBodyAsJson: boolean): {
        body: unknown;
        bodyType: BodyTypes;
    };
};
/**
 * Mirror of the internal Section interface in rhea.
 *
 * @internal
 */
export interface RheaAmqpSection {
    typecode: typeof dataSectionTypeCode | typeof sequenceSectionTypeCode | typeof valueSectionTypeCode;
    content: any;
}
/** @internal */
export declare function isRheaAmqpSection(possibleSection: any | RheaAmqpSection): possibleSection is RheaAmqpSection;
//# sourceMappingURL=dataTransformer.d.ts.map