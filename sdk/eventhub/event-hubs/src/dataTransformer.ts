// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logErrorStackTrace, logger } from "./log";
import { Buffer } from "buffer";
import isBuffer from "is-buffer";
import { message } from "rhea-promise";

/**
 * The allowed AMQP message body types.
 * @internal
 */
export type BodyTypes = "data" | "value" | "sequence";

/** @internal */
export const dataSectionTypeCode = 0x75 as const;
/** @internal */
export const sequenceSectionTypeCode = 0x76 as const;
/** @internal */
export const valueSectionTypeCode = 0x77 as const;

/**
 * The default data transformer that will be used by the Azure SDK.
 * @internal
 */
export const defaultDataTransformer = {
  /**
   * A function that takes the body property from an EventData object
   * and returns an encoded body (some form of AMQP type).
   *
   * @param body - The AMQP message body
   * @param bodyType - The AMQP section to story the body in.
   * @returns The encoded AMQP message body as an AMQP Data/Sequence/Value section.
   */
  encode(body: unknown, bodyType: BodyTypes): any {
    let result: any;
    // string, undefined, null, boolean, array, object, number should end up here
    // coercing undefined to null as that will ensure that null value will be given to the
    // customer on receive.
    if (body === undefined) body = null;

    if (bodyType === "value") {
      // TODO: Expose value_section from `rhea` similar to the data_section and sequence_section.
      // Right now there isn't a way to create a value section officially.
      result = message.data_section(body);
      result.typecode = valueSectionTypeCode;
    } else if (bodyType === "sequence") {
      result = message.sequence_section(body);
    } else if (isBuffer(body) || body instanceof Uint8Array) {
      result = message.data_section(body);
    } else if (body === null && bodyType === "data") {
      result = message.data_section(null);
    } else {
      try {
        const bodyStr = JSON.stringify(body);
        result = message.data_section(Buffer.from(bodyStr, "utf8"));
      } catch (err) {
        const msg =
          `An error occurred while executing JSON.stringify() on the given body ` +
          body +
          `${err ? err.stack : JSON.stringify(err)}`;
        logger.warning("[encode] " + msg);
        logErrorStackTrace(err);
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
  decode(
    body: unknown | RheaAmqpSection,
    skipParsingBodyAsJson: boolean
  ): { body: unknown; bodyType: BodyTypes } {
    try {
      if (isRheaAmqpSection(body)) {
        switch (body.typecode) {
          case dataSectionTypeCode:
            return {
              body: skipParsingBodyAsJson ? body.content : tryToJsonDecode(body.content),
              bodyType: "data",
            };
          case sequenceSectionTypeCode:
            return { body: body.content, bodyType: "sequence" };
          case valueSectionTypeCode:
            return { body: body.content, bodyType: "value" };
        }
      } else {
        if (isBuffer(body)) {
          return { body: skipParsingBodyAsJson ? body : tryToJsonDecode(body), bodyType: "data" };
        }

        return { body, bodyType: "value" };
      }
    } catch (err) {
      logger.verbose(
        "[decode] An error occurred while decoding the received message body. The error is: %O",
        err
      );
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
function tryToJsonDecode(body: unknown): unknown {
  let processedBody: any = body;
  try {
    // Trying to stringify and JSON.parse() anything else will fail flat and we shall return
    // the original type back
    const bodyStr: string = processedBody.toString("utf8");
    processedBody = JSON.parse(bodyStr);
  } catch (err) {
    logger.verbose(
      "[decode] An error occurred while trying JSON.parse() on the received body. The error is %O",
      err
    );
  }
  return processedBody;
}

/**
 * Mirror of the internal Section interface in rhea.
 *
 * @internal
 */
export interface RheaAmqpSection {
  typecode:
    | typeof dataSectionTypeCode
    | typeof sequenceSectionTypeCode
    | typeof valueSectionTypeCode;
  content: any;
}

/** @internal */
export function isRheaAmqpSection(
  possibleSection: any | RheaAmqpSection
): possibleSection is RheaAmqpSection {
  return (
    possibleSection != null &&
    typeof possibleSection.typecode === "number" &&
    (possibleSection.typecode === dataSectionTypeCode ||
      possibleSection.typecode === valueSectionTypeCode ||
      possibleSection.typecode === sequenceSectionTypeCode)
  );
}
