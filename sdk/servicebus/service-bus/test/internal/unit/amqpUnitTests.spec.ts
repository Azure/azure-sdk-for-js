// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  isAmqpAnnotatedMessage,
  isServiceBusMessage,
  ServiceBusMessage,
  ServiceBusMessageImpl,
  ServiceBusReceivedMessage,
  toRheaMessage,
} from "../../../src/serviceBusMessage";
import * as chai from "chai";
import { Delivery, Message } from "rhea-promise";
import { AmqpAnnotatedMessage, Constants } from "@azure/core-amqp";
import {
  dataSectionTypeCode,
  defaultDataTransformer,
  isRheaAmqpSection,
  valueSectionTypeCode,
} from "../../../src/dataTransformer";
import {
  errorInvalidMessageTypeSingle,
  errorInvalidMessageTypeSingleOrArray,
} from "../../../src/util/errors";
const assert = chai.assert;

describe("AMQP message encoding", () => {
  beforeEach(() => {
    assert.equal(
      "Provided value for 'messages' must be of type: ServiceBusMessage, AmqpAnnotatedMessage, ServiceBusMessageBatch or an array of type ServiceBusMessage or AmqpAnnotatedMessage.",
      errorInvalidMessageTypeSingleOrArray
    );

    assert.equal(
      "Provided value for 'message' must be of type: ServiceBusMessage or AmqpAnnotatedMessage.",
      errorInvalidMessageTypeSingle
    );
  });

  const exampleReceivedMessage: () => ServiceBusReceivedMessage = () =>
    new ServiceBusMessageImpl(
      {
        message_annotations: {
          [Constants.enqueuedTime]: Date.now(),
        },
      } as any as Message,
      {} as Delivery,
      false,
      "receiveAndDelete",
      false
    );

  it("isAmqpAnnotatedMessage", () => {
    assert.isFalse(isAmqpAnnotatedMessage({}));
    assert.isFalse(isAmqpAnnotatedMessage({ body: "hello world" }));
    assert.isFalse(isAmqpAnnotatedMessage(exampleReceivedMessage()));

    assert.isTrue(
      isAmqpAnnotatedMessage({
        body: "hello world",
        bodyType: "sequence",
      })
    );
    assert.isTrue(
      isAmqpAnnotatedMessage({
        body: "hello world",
        bodyType: "value",
      })
    );
    assert.isTrue(
      isAmqpAnnotatedMessage({
        body: "hello world",
        bodyType: "data",
      })
    );

    assert.isTrue(
      isAmqpAnnotatedMessage({
        body: "hello world",
        bodyType: undefined, // the property _must_ exist, but undefined is fine. We'll default to 'data'
      })
    );
  });

  it("isServiceBusMessage", () => {
    assert.isTrue(
      isServiceBusMessage({ body: undefined }),
      "object with undefined 'body' should be a ServiceBusMessage"
    ); // no field is really required for a Service Bus message.
    assert.isTrue(isServiceBusMessage({ body: "hello world" }), "object has a 'body' field"); // no field is really required for a Service Bus message.
    assert.isTrue(
      isServiceBusMessage(exampleReceivedMessage()),
      "a ServiceBusReceivedMessage is also a sendable ServiceBusMessage"
    );
  });

  describe("toRheaMessage", () => {
    it("AmqpAnnotatedMessage (explicit type)", () => {
      const amqpAnnotatedMessage: AmqpAnnotatedMessage = {
        body: "hello",
        bodyType: "value",
      };

      const rheaMessage = toRheaMessage(amqpAnnotatedMessage, defaultDataTransformer);

      if (!isRheaAmqpSection(rheaMessage.body)) {
        throw new Error("rheaMessage.body was not a rhea section");
      }

      assert.equal(rheaMessage.body.typecode, valueSectionTypeCode);
    });

    it("AmqpAnnotatedMessage (implicit type)", () => {
      const amqpAnnotatedMessage: AmqpAnnotatedMessage = {
        body: "hello",
        bodyType: undefined,
      };

      const rheaMessage = toRheaMessage(amqpAnnotatedMessage, defaultDataTransformer);

      if (!isRheaAmqpSection(rheaMessage.body)) {
        throw new Error("rheaMessage.body was not a rhea section");
      }

      assert.equal(rheaMessage.body.typecode, dataSectionTypeCode);
    });

    it("ServiceBusMessage", () => {
      const serviceBusMessage: ServiceBusMessage = {
        body: "hello",
      };

      const rheaMessage = toRheaMessage(serviceBusMessage, defaultDataTransformer);

      if (!isRheaAmqpSection(rheaMessage.body)) {
        throw new Error("rheaMessage.body was not a rhea section");
      }

      assert.equal(rheaMessage.body.typecode, dataSectionTypeCode);
    });

    it("ServiceBusReceivedMessage", () => {
      const serviceBusReceivedMessage = exampleReceivedMessage();

      (serviceBusReceivedMessage as Record<keyof ServiceBusReceivedMessage, any>)[
        "_rawAmqpMessage"
      ] = {
        bodyType: "data",
      };

      const rheaMessage = toRheaMessage(serviceBusReceivedMessage, defaultDataTransformer);

      if (!isRheaAmqpSection(rheaMessage.body)) {
        throw new Error("rheaMessage.body was not a rhea section");
      }

      assert.equal(rheaMessage.body.typecode, dataSectionTypeCode);
    });

    it("ServiceBusReceivedMessage (but was decoded from 'value')", () => {
      const serviceBusReceivedMessage = exampleReceivedMessage();

      (serviceBusReceivedMessage as Record<keyof ServiceBusReceivedMessage, any>)[
        "_rawAmqpMessage"
      ] = {
        bodyType: "value",
      };

      const rheaMessage = toRheaMessage(serviceBusReceivedMessage, defaultDataTransformer);

      if (!isRheaAmqpSection(rheaMessage.body)) {
        throw new Error("rheaMessage.body was not a rhea section");
      }

      assert.equal(rheaMessage.body.typecode, valueSectionTypeCode);
    });
  });
});
