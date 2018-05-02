// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";

const isBuffer = require("is-buffer");
const debug = debugModule("azure:event-hubs:datatransformer");

export interface DataTransformer {
  /**
   * @property {Function} encode A function that takes the body property from an EventData object
   * and returns an encoded body (some form of AMQP type).
   */
  encode: (body: any) => any;
  /**
   * @property {Function} decode A function that takes the body property from an AMQP message
   * and returns the decoded message body. If it cannot decode the body then it returns the body
   * as-is.
   */
  decode: (body: any) => any;
}

/**
 * The default data transformer that will be used by the Azure SDK.
 */
export class DefaultDataTransformer implements DataTransformer {

  /**
   * A function that takes the body property from an EventData object
   * and returns an encoded body (some form of AMQP type).
   * @method
   * @param {*} body The AMQP message body
   * @return {DataSection} encodedBody - The encoded AMQP message body as an AMQP Data type
   * (data section in rhea terms). Section object with following properties:
   * - typecode: 117 (0x75)
   * - content: The given AMQP message body as a Buffer.
   * - multiple: true | undefined.
   */
  encode(body: any): any {
    let result: any;
    debug("The given message body that needs to be encoded is: ", body);
    if (body !== undefined) {
      if (isBuffer(body)) {
        result = rhea.message.data_section(body);
      } else if (typeof body === "string") {
        result = rhea.message.data_section(Buffer.from(`"${body}"`, "utf8"));
      } else {
        // null, boolean, array, object, number should end up here
        try {
          const bodyStr = JSON.stringify(body);
          result = rhea.message.data_section(Buffer.from(bodyStr, "utf8"));
        } catch (err) {
          const msg = `An error occurred while executing JSON.stringify() on the given body ` + body
            + `${err ? err.stack : JSON.stringify(err)}`;
          debug(msg);
          throw new Error(msg);
        }
      }
    } else {
      // convert undefined to empty string.
      result = rhea.message.data_section(Buffer.from("\"\"", "utf8"));
    }
    debug("The encoded message body is: %O.", result);
    return result;
  }

  /**
   * @property {Function} [decode] A function that takes the body property from an AMQP message
   * (an AMQP Data type (data section in rhea terms)) and returns the decoded message body.
   * If it cannot decode the body then it returns the body
   * as-is.
   * @param {DataSection} body The AMQP message body
   * @return {*} decoded body or the given body as-is.
   */
  decode(body: any): any {
    let processedBody: any = body;
    try {
      debug("Received message body for decoding is: %O", body);
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
        debug("An error occurred while trying JSON.stringify() on the received body. " +
          "The error is %O", err);
        // Ensuring that the original body will be returned by resetting the orignal body back.
        processedBody = body.content || body;
      }
    } catch (err) {
      debug("An error occurred while decoding the received message body. The error is: %O", err);
    }
    debug("The decoded message body is: %O", processedBody);
    return processedBody;
  }
}
