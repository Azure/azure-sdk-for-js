"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDataTransformer = exports.valueSectionTypeCode = exports.sequenceSectionTypeCode = exports.dataSectionTypeCode = void 0;
exports.isRheaAmqpSection = isRheaAmqpSection;
const tslib_1 = require("tslib");
const logger_js_1 = require("./logger.js");
const buffer_1 = require("buffer");
const is_buffer_1 = tslib_1.__importDefault(require("is-buffer"));
const rhea_promise_1 = require("rhea-promise");
/** @internal */
exports.dataSectionTypeCode = 0x75;
/** @internal */
exports.sequenceSectionTypeCode = 0x76;
/** @internal */
exports.valueSectionTypeCode = 0x77;
/**
 * The default data transformer that will be used by the Azure SDK.
 * @internal
 */
exports.defaultDataTransformer = {
    /**
     * A function that takes the body property from an EventData object
     * and returns an encoded body (some form of AMQP type).
     *
     * @param body - The AMQP message body
     * @param bodyType - The AMQP section to story the body in.
     * @returns The encoded AMQP message body as an AMQP Data/Sequence/Value section.
     */
    encode(body, bodyType) {
        let result;
        // string, undefined, null, boolean, array, object, number should end up here
        // coercing undefined to null as that will ensure that null value will be given to the
        // customer on receive.
        if (body === undefined)
            body = null;
        if (bodyType === "value") {
            // TODO: Expose value_section from `rhea` similar to the data_section and sequence_section.
            // Right now there isn't a way to create a value section officially.
            result = rhea_promise_1.message.data_section(body);
            result.typecode = exports.valueSectionTypeCode;
        }
        else if (bodyType === "sequence") {
            result = rhea_promise_1.message.sequence_section(body);
        }
        else if ((0, is_buffer_1.default)(body) || body instanceof Uint8Array) {
            result = rhea_promise_1.message.data_section(body);
        }
        else if (body === null && bodyType === "data") {
            result = rhea_promise_1.message.data_section(null);
        }
        else {
            try {
                const bodyStr = JSON.stringify(body);
                result = rhea_promise_1.message.data_section(buffer_1.Buffer.from(bodyStr, "utf8"));
            }
            catch (err) {
                const msg = `An error occurred while executing JSON.stringify() on the given body ` +
                    body +
                    `${err ? err.stack : JSON.stringify(err)}`;
                logger_js_1.logger.warning("[encode] " + msg);
                (0, logger_js_1.logErrorStackTrace)(err);
                throw new Error(msg);
            }
        }
        return result;
    },
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
    decode(body, skipParsingBodyAsJson) {
        try {
            if (isRheaAmqpSection(body)) {
                switch (body.typecode) {
                    case exports.dataSectionTypeCode:
                        return {
                            body: skipParsingBodyAsJson ? body.content : tryToJsonDecode(body.content),
                            bodyType: "data",
                        };
                    case exports.sequenceSectionTypeCode:
                        return { body: body.content, bodyType: "sequence" };
                    case exports.valueSectionTypeCode:
                        return { body: body.content, bodyType: "value" };
                }
            }
            else {
                if ((0, is_buffer_1.default)(body)) {
                    return { body: skipParsingBodyAsJson ? body : tryToJsonDecode(body), bodyType: "data" };
                }
                return { body, bodyType: "value" };
            }
        }
        catch (err) {
            logger_js_1.logger.verbose("[decode] An error occurred while decoding the received message body. The error is: %O", err);
            throw err;
        }
    },
};
/**
 * Attempts to decode 'body' as a JSON string. If it fails it returns body
 * verbatim.
 *
 * @param body - An AMQP message body.
 * @returns A JSON decoded object, or body if body was not a JSON string.
 *
 * @internal
 */
function tryToJsonDecode(body) {
    let processedBody = body;
    try {
        // Trying to stringify and JSON.parse() anything else will fail flat and we shall return
        // the original type back
        const bodyStr = processedBody.toString("utf8");
        processedBody = JSON.parse(bodyStr);
    }
    catch (err) {
        logger_js_1.logger.verbose("[decode] An error occurred while trying JSON.parse() on the received body. The error is %O", err);
    }
    return processedBody;
}
/** @internal */
function isRheaAmqpSection(possibleSection) {
    return (possibleSection != null &&
        typeof possibleSection.typecode === "number" &&
        (possibleSection.typecode === exports.dataSectionTypeCode ||
            possibleSection.typecode === exports.valueSectionTypeCode ||
            possibleSection.typecode === exports.sequenceSectionTypeCode));
}
//# sourceMappingURL=dataTransformer.js.map