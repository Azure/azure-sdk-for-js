// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { message } from "rhea-promise";
import isBuffer from "is-buffer";
import { Buffer } from "buffer";
import { logErrorStackTrace, logger } from "./log";

/** @internal */
export const dataSectionTypeCode = 0x75 as const;
/** @internal */
export const sequenceSectionTypeCode = 0x76 as const;
/** @internal */
export const valueSectionTypeCode = 0x77 as const;

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
   * @returns The encoded AMQP message body as an AMQP Data type
   * (data section in rhea terms). Section object with following properties:
   * - typecode: 117 (0x75)
   * - content: The given AMQP message body as a Buffer.
   * - multiple: true | undefined.
   */
  encode(body: unknown, bodyType: "data" | "value" | "sequence"): any {
    let result: any;
    if (bodyType === "value") {
      // TODO: Expose value_section from `rhea` similar to the data_section and sequence_section. Right now there isn't a way to create a value section officially.
      result = message.data_section(body);
      result.typecode = valueSectionTypeCode;
    } else if (bodyType === "sequence") {
      result = message.sequence_section(body);
    } else if (isBuffer(body)) {
      result = message.data_section(body);
    } else {
      // string, undefined, null, boolean, array, object, number should end up here
      // coercing undefined to null as that will ensure that null value will be given to the
      // customer on receive.
      if (body === undefined) body = null; // tslint:disable-line
      try {
        const bodyStr = JSON.stringify(body);
        result = message.data_section(Buffer.from(bodyStr, "utf8"));
      } catch (err: any) {
        const msg =
          `An error occurred while executing JSON.stringify() on the given body ` +
          body +
          `${err ? err.stack : JSON.stringify(err)}`;
        logger.warning("[encode] " + msg);
        logErrorStackTrace(logger, err);
        throw new Error(msg);
      }
    }
    return result;
  },
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
  decode(body: unknown, skipParsingBodyAsJson: boolean): unknown {
    let actualContent = body;

    if (isRheaAmqpSection(body)) {
      actualContent = body.content;
    }

    return skipParsingBodyAsJson ? actualContent : tryToJsonDecode(actualContent);
  },
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
  decodeWithType(
    body: unknown | RheaAmqpSection,
    skipParsingBodyAsJson: boolean
  ): { body: unknown; bodyType: "data" | "sequence" | "value" } {
    try {
      if (isRheaAmqpSection(body)) {
        switch (body.typecode) {
          case dataSectionTypeCode:
            return {
              body: skipParsingBodyAsJson ? body.content : tryToJsonDecode(body.content),
              bodyType: "data",
            };
          case sequenceSectionTypeCode:
            // typecode:
            // handle sequences
            return { body: body.content, bodyType: "sequence" };
          case valueSectionTypeCode:
            // value
            return { body: body.content, bodyType: "value" };
        }
      } else {
        // not sure - we have to try to infer the proper bodyType and content
        if (isBuffer(body)) {
          // This indicates that we are getting the AMQP described type. Let us try decoding it.
          return { body: skipParsingBodyAsJson ? body : tryToJsonDecode(body), bodyType: "data" };
        } else {
          return { body: body, bodyType: "value" };
        }
      }
    } catch (err: any) {
      logger.verbose(
        "[decode] An error occurred while decoding the received message body. The error is: %O",
        err
      );
      throw err;
    }
  },
};

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

/**
 * Attempts to decode 'body' as a JSON string. If it fails it returns body
 * verbatim.
 *
 * @param body - An AMQP message body.
 * @returns A JSON decoded object, or body if body was not a JSON string.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function tryToJsonDecode(body: any): any {
  let processedBody = body;
  try {
    // Trying to stringify and JSON.parse() anything else will fail flat and we shall return
    // the original type back
    const bodyStr: string = processedBody.toString("utf8");
    processedBody = JSON.parse(bodyStr);
  } catch (err: any) {
    logger.verbose(
      "[decode] An error occurred while trying JSON.parse() on the received body. " +
        "The error is %O",
      err
    );
  }
  return processedBody;
}
