// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { AmqpError } from "rhea-promise";
import { MessagingError } from "../../src";
import { translateError } from "../../src/util/error";
const should = chai.should();

describe("translateError", function () {
  it("doesn't convert TypeError or RangeError JavaScript errors", function () {
    const typeError = new TypeError("Don't try to change me, you're not my type!");
    const rangeError = new RangeError("Changing me is way outside your range!");

    const unchangedTypeError = translateError(typeError);
    const unchangedRangeError = translateError(rangeError);

    should.equal(unchangedTypeError, typeError, "Expected TypeError to be unchanged.");
    should.equal(unchangedRangeError, rangeError, "Expected RangeError to be unchanged.");
  });

  it("converts AMQP errors to MessagingErrors", function () {
    const amqpError: AmqpError = {
      condition: "identity issues",
      description: "Azure SDK Error remodel!",
    };
    const translatedError = translateError(amqpError);

    should.equal(translatedError.name, "MessagingError");
    should.equal(translatedError.message, "Azure SDK Error remodel!");
  });

  it("converts 'com.microsoft:out-of-order-sequence' amqp error to non-retryable MessagingError 'SequenceOutOfOrderError'", function () {
    const amqpErrorDescription = "0, 1, 1, 2, 3, 5, 8, 13";
    const amqpError: AmqpError = {
      condition: "com.microsoft:out-of-order-sequence",
      description: amqpErrorDescription,
    };
    const translatedError = translateError(amqpError) as MessagingError;

    should.equal(translatedError.name, "MessagingError");
    should.equal(translatedError.message, amqpErrorDescription);
    should.equal(translatedError.retryable, false, "SequenceOutOfOrder should not be retryable.");
    should.equal(translatedError.code, "SequenceOutOfOrderError");
  });

  it("converts 'com.microsoft:producer-epoch-stolen' amqp error to non-retryable MessagingError 'ProducerDisconnectedError'", function () {
    const amqpErrorDescription = "They've stolen the means of production!";
    const amqpError: AmqpError = {
      condition: "com.microsoft:producer-epoch-stolen",
      description: amqpErrorDescription,
    };
    const translatedError = translateError(amqpError) as MessagingError;

    should.equal(translatedError.name, "MessagingError");
    should.equal(translatedError.message, amqpErrorDescription);
    should.equal(
      translatedError.retryable,
      false,
      "ProducerDisconnectedError should not be retryable."
    );
    should.equal(translatedError.code, "ProducerDisconnectedError");
  });
});
