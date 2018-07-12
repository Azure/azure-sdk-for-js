// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as chai from "chai";
chai.should();

import * as Errors from "../lib/amqp-common/errors";

class AMQPError {
  name = "AmqpProtocolError";
  condition: string;
  description: string;
  constructor(conditionStr: string, description: string) {
    this.name = "AmqpProtocolError";
    this.condition = conditionStr;
    this.description = description;
  }
}

describe("Errors", function () {
  describe("translate", function () {
    it("acts as a passthrough if the input is not an AmqpProtocolError", function () {
      const MyError = function () { };
      const err: any = new MyError();
      const msg: any = undefined;
      const ehError = new Errors.MessagingError(msg);
      const translatedError = Errors.translate(err);
      translatedError.name.should.equal(ehError.name);
      translatedError.retryable.should.equal(ehError.retryable);
      translatedError.message.should.equal(ehError.message);
    });

    [
      { from: "amqp:not-found", to: "ServiceCommunicationError", message: "some message" },
      { from: "com.microsoft:server-busy", to: "ServerBusyError", message: "some message" },
      { from: "com.microsoft:argument-out-of-range", to: "ArgumentOutOfRangeError", message: "some message" },
      { from: "<unknown>", to: "MessagingError" }
    ]
      .forEach(function (mapping) {
        it("translates " + mapping.from + " into " + mapping.to, function () {
          const err: any = new AMQPError(mapping.from, mapping.message);
          const translatedError = Errors.translate(err);
          translatedError.name.should.equal(mapping.to);
          if (translatedError.name === "ServerBusyError") {
            translatedError.retryable.should.equal(true);
          } else {
            translatedError.retryable.should.equal(false);
          }
        });
      });
  });
});
