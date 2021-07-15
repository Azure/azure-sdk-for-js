// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { Constants } from "@azure/core-amqp";
import { fromRheaMessage, isAmqpAnnotatedMessage } from "../../src/eventData";
const assert = chai.assert;

describe("AMQP message encoding", () => {
  it("isAmqpAnnotatedMessage", () => {
    assert.isFalse(isAmqpAnnotatedMessage({}));
    assert.isFalse(isAmqpAnnotatedMessage({ body: "hello world" }));
    assert.isFalse(
      isAmqpAnnotatedMessage(
        fromRheaMessage({
          message_annotations: {
            [Constants.enqueuedTime]: Date.now()
          },
          body: undefined
        })
      )
    );

    assert.isTrue(
      isAmqpAnnotatedMessage(
        fromRheaMessage({
          message_annotations: {
            [Constants.enqueuedTime]: Date.now()
          },
          body: undefined
        }).getRawAmqpMessage()
      )
    );

    assert.isTrue(
      isAmqpAnnotatedMessage({
        body: "hello world",
        bodyType: "sequence"
      })
    );
    assert.isTrue(
      isAmqpAnnotatedMessage({
        body: "hello world",
        bodyType: "value"
      })
    );
    assert.isTrue(
      isAmqpAnnotatedMessage({
        body: "hello world",
        bodyType: "data"
      })
    );

    assert.isTrue(
      isAmqpAnnotatedMessage({
        body: "hello world",
        bodyType: undefined // the property _must_ exist, but undefined is fine. We'll default to 'data'
      })
    );
  });
});
