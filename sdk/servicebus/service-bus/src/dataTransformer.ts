// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { message } from "rhea-promise";
import isBuffer from "is-buffer";
import { Buffer } from "buffer";
import { logErrorStackTrace, logger } from "./log";

/**
 * The default data transformer that will be used by the Azure SDK.
 * @internal
 */
export const defaultDataTransformer = {
  /**
   * A function that takes the body property from an EventData object
   * and returns an encoded body (some form of AMQP type).
   *
   * @param body The AMQP message body
   * @return {DataSection} encodedBody - The encoded AMQP message body as an AMQP Data type
   * (data section in rhea terms). Section object with following properties:
   * - typecode: 117 (0x75)
   * - content: The given AMQP message body as a Buffer.
   * - multiple: true | undefined.
   */
  encode(body: any): any {
    let result: any;
    if (isBuffer(body)) {
      result = message.data_section(body);
    } else {
      // string, undefined, null, boolean, array, object, number should end up here
      // coercing undefined to null as that will ensure that null value will be given to the
      // customer on receive.
      if (body === undefined) body = null; // tslint:disable-line
      try {
        const bodyStr = JSON.stringify(body);
        result = message.data_section(Buffer.from(bodyStr, "utf8"));
      } catch (err) {
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
   * @param body The AMQP message body
   * @return {*} decoded body or the given body as-is.
   */
  decode(body: any): any {
    let processedBody: any = body;
    try {
      if (body.content && isBuffer(body.content)) {
        // This indicates that we are getting the AMQP described type. Let us try decoding it.
        processedBody = body.content;
      }
      try {
        // Trying to stringify and JSON.parse() anything else will fail flat and we shall return
        // the original type back
        const bodyStr: string = processedBody.toString("utf8");
        processedBody = JSON.parse(bodyStr);
      } catch (err) {
        logger.verbose(
          "[decode] An error occurred while trying JSON.parse() on the received body. " +
            "The error is %O",
          err
        );
      }
    } catch (err) {
      logger.verbose(
        "[decode] An error occurred while decoding the received message body. The error is: %O",
        err
      );
    }
    return processedBody;
  }
};
