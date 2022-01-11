// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { assert } from "chai";

import {
  convertEventGridEventToModelType,
  convertCloudEventToModelType,
} from "../../src/eventGridClient";

describe("convertEventGridEventToModelType", function () {
  it("sets a default ID if one is not provided", () => {
    const convertedEvent = convertEventGridEventToModelType({
      dataVersion: "1.0",
      eventType: "Azure.Sdk.TestEvent",
      subject: "Test Event",
      data: { hello: "world " },
    });

    assert.isDefined(convertedEvent.id);
  });

  it("sets a default event time if one is not provided", () => {
    const convertedEvent = convertEventGridEventToModelType({
      dataVersion: "1.0",
      eventType: "Azure.Sdk.TestEvent",
      subject: "Test Event",
      data: { hello: "world " },
    });

    assert.isDefined(convertedEvent.eventTime);
  });

  it("does not change set values", () => {
    const time = new Date();
    const id = "272871ba-2496-4750-9a90-bedd1ea10191";

    const convertedEvent = convertEventGridEventToModelType({
      id: id,
      eventTime: time,
      dataVersion: "1.0",
      eventType: "Azure.Sdk.TestEvent",
      subject: "Test Event",
      data: { hello: "world " },
    });

    assert.strictEqual(convertedEvent.id, id);
    assert.strictEqual(convertedEvent.eventTime, time);
  });
});

describe("convertCloudEventToModelType", function () {
  it("sets a default ID if one is not provided", () => {
    const convertedEvent = convertCloudEventToModelType({
      source: "/azure/sdk/tests",
      type: "Azure.Sdk.TestEvent",
    });

    assert.isDefined(convertedEvent.id);
  });

  it("sets a default event time if one is not provided", () => {
    const convertedEvent = convertCloudEventToModelType({
      source: "/azure/sdk/tests",
      type: "Azure.Sdk.TestEvent",
    });

    assert.isDefined(convertedEvent.time);
  });

  it("does not change set values", () => {
    const time = new Date();
    const id = "272871ba-2496-4750-9a90-bedd1ea10191";

    const convertedEvent = convertCloudEventToModelType({
      id: id,
      time: time,
      source: "/azure/sdk/tests",
      type: "Azure.Sdk.TestEvent",
    });

    assert.strictEqual(convertedEvent.id, id);
    assert.strictEqual(convertedEvent.time, time);
  });

  it("promotes extension attributes", () => {
    const traceparent = "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01";
    const tracestate =
      "rojo=00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01,congo=lZWRzIHRoNhcm5hbCBwbGVhc3VyZS4";

    const convertedEvent = convertCloudEventToModelType({
      source: "/azure/sdk/tests",
      type: "Azure.Sdk.TestEvent",
      extensionAttributes: {
        traceparent,
        tracestate,
      },
    });

    // When converted to a model type to send over the wire, the extension attributes are promoted to be
    // properties on the envelope itself.
    assert.equal(convertedEvent["traceparent"], traceparent);
    assert.equal(convertedEvent["tracestate"], tracestate);
  });

  it("base64 encodes binary data", () => {
    const binaryData = new Uint8Array(10);
    for (let i = 0; i < binaryData.length; i++) {
      binaryData[i] = i;
    }

    const convertedEvent = convertCloudEventToModelType({
      source: "/azure/sdk/tests",
      type: "Azure.Sdk.TestEvent",
      data: binaryData,
      datacontenttype: "application/binary",
    });

    assert.isUndefined(convertedEvent.data);
    assert.strictEqual(convertedEvent.dataBase64, binaryData);
  });

  it("fails if data content type is missing for binary data", () => {
    const binaryData = new Uint8Array(10);
    for (let i = 0; i < binaryData.length; i++) {
      binaryData[i] = i;
    }

    assert.throws(() => {
      convertCloudEventToModelType({
        source: "/azure/sdk/tests",
        type: "Azure.Sdk.TestEvent",
        data: binaryData,
      });
    }, /data content type/);
  });

  it("fails if extenion attributes are invalid", () => {
    const binaryData = new Uint8Array(10);
    for (let i = 0; i < binaryData.length; i++) {
      binaryData[i] = i;
    }

    assert.throws(() => {
      convertCloudEventToModelType({
        source: "/azure/sdk/tests",
        type: "Azure.Sdk.TestEvent",
        extensionAttributes: {
          source: "this-is-not-allowed",
        },
      });
    }, /invalid extension attribute name: source/);

    assert.throws(() => {
      convertCloudEventToModelType({
        source: "/azure/sdk/tests",
        type: "Azure.Sdk.TestEvent",
        extensionAttributes: {
          MiXedCasE: "this-is-not-allowed",
        },
      });
    }, /invalid extension attribute name: MiXedCasE/);

    assert.throws(() => {
      convertCloudEventToModelType({
        source: "/azure/sdk/tests",
        type: "Azure.Sdk.TestEvent",
        extensionAttributes: {
          data_base64: "this-is-not-allowed",
        },
      });
    }, /invalid extension attribute name: data_base64/);
  });
});
