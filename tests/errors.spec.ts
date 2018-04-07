// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
chai.should();

import { Errors } from "../lib";

class AMQPError {
  name = "AmqpProtocolError";
  condition: string;
  constructor(conditionStr: string) {
    this.name = "AmqpProtocolError";
    this.condition = conditionStr;
  }
}

describe("Errors", function () {
  describe("translate", function () {
    it("acts as a passthrough if the input is not an AmqpProtocolError", function () {
      const MyError = function () { };
      const err = new MyError();
      Errors.translate(err).should.equal(err);
    });

    [
      { from: "amqp:not-found", to: "EventHubsCommunicationError" },
      { from: "com.microsoft:argument-out-of-range", to: "ArgumentOutOfRangeError" },
      { from: "<unknown>", to: "Error" }
    ]
      .forEach(function (mapping) {
        it("translates " + mapping.from + " into " + mapping.to, function () {
          const err = new AMQPError(mapping.from);
          const errorClass = Errors.translate(err).constructor.name;
          errorClass.should.equal(mapping.to);
        });
      });
  });
});
