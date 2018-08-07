// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as log from "./log";

const isBuffer = require("is-buffer");

/**
 * Describes the transformations that can be performed to encode/decode the data before sending it
 * on (or receiving it from) the wire.
 * @interface DataTransformer
 */
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
   *
   * @param {*} body The AMQP message body
   * @return {DataSection} encodedBody - The encoded AMQP message body as an AMQP Data type
   * (data section in rhea terms). Section object with following properties:
   * - typecode: 117 (0x75)
   * - content: The given AMQP message body as a Buffer.
   * - multiple: true | undefined.
   */
  encode(body: any): any {
    let result: any;
    log.transformer("[encode] The given message body that needs to be encoded is: ", body);
    if (isBuffer(body)) {
      result = rhea.message.data_section(body);
    } else {
      // string, undefined, null, boolean, array, object, number should end up here
      // coercing undefined to null as that will ensure that null value will be given to the
      // customer on receive.
      if (body === undefined) body = null; // tslint:disable-line
      try {
        const bodyStr = JSON.stringify(body);
        result = rhea.message.data_section(Buffer.from(bodyStr, "utf8"));
      } catch (err) {
        const msg = `An error occurred while executing JSON.stringify() on the given body ` + body
          + `${err ? err.stack : JSON.stringify(err)}`;
        log.error("[encode] " + msg);
        throw new Error(msg);
      }
    }
    log.transformer("[encode] The encoded message body is: %O.", result);
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
      log.transformer("[decode] Received message body for decoding is: %O", body);
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
        log.error("[decode] An error occurred while trying JSON.parse() on the received body. " +
          "The error is %O", err);
      }
    } catch (err) {
      log.error("[decode] An error occurred while decoding the received message body. The error is: %O", err);
    }
    log.transformer("[decode] The decoded message body is: %O", processedBody);
    return processedBody;
  }
}
