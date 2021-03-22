// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, testEnv } from "./utils/recordedClient";

import { TestTracer, setTracer } from "@azure/core-tracing";

import { AzureKeyCredential, EventGridPublisherClient } from "../src/index";

import {
  convertEventGridEventToModelType,
  convertCloudEventToModelType
} from "../src/eventGridClient";
import { FullOperationResponse } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";

describe("EventGridPublisherClient", /** @this */ function() {
  let recorder: Recorder;
  let res: FullOperationResponse | undefined;

  this.timeout(10000);

  beforeEach(function() {
    res = undefined;
  });

  describe("#send (EventGrid schema)", function() {
    let client: EventGridPublisherClient<"EventGrid">;

    beforeEach(/** @this */ function() {
      ({ client, recorder } = createRecordedClient(
        this,
        testEnv.EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT,
        "EventGrid",
        new AzureKeyCredential(testEnv.EVENT_GRID_EVENT_GRID_SCHEMA_API_KEY)
      ));
    });

    afterEach(async function() {
      await recorder.stop();
    });

    it("sends a single event", async () => {
      await client.send(
        [
          {
            eventTime: recorder.newDate("singleEventDate"),
            id: recorder.getUniqueName("singleEventId"),
            eventType: "Azure.Sdk.TestEvent1",
            subject: "Single 1",
            dataVersion: "1.0",
            data: {
              hello: "world"
            }
          }
        ],
        { onResponse: (response) => (res = response) }
      );

      assert.equal(res?.status, 200);
    });

    it("sends multiple events", async () => {
      await client.send(
        [
          {
            eventTime: recorder.newDate("multiEventDate1"),
            id: recorder.getUniqueName("multiEventId1"),
            eventType: "Azure.Sdk.TestEvent1",
            subject: "Multiple 1",
            dataVersion: "1.0",
            data: {
              hello: "world"
            }
          },
          {
            eventTime: recorder.newDate("multiEventDate2"),
            id: recorder.getUniqueName("multiEventId2"),
            eventType: "Azure.Sdk.TestEvent1",
            subject: "Multiple 2",
            dataVersion: "1.0",
            data: {
              hello: "world"
            }
          }
        ],
        { onResponse: (response) => (res = response) }
      );

      assert.equal(res?.status, 200);
    });
  });

  describe("#send error cases (EventGrid schema)", function() {
    let client: EventGridPublisherClient<"EventGrid">;

    beforeEach(/** @this */ function() {
      ({ client, recorder } = createRecordedClient(
        this,
        removeApiEventsSuffix(testEnv.EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT),
        "EventGrid",
        new AzureKeyCredential(testEnv.EVENT_GRID_CUSTOM_SCHEMA_API_KEY)
      ));
    });

    afterEach(async function() {
      await recorder.stop();
    });

    it("does not append /api/events", async () => {
      let rejected = true;

      try {
        await client.send([
          {
            eventTime: recorder.newDate("singleEventDate"),
            id: recorder.getUniqueName("singleEventId"),
            eventType: "Azure.Sdk.TestEvent1",
            subject: "Single 1",
            dataVersion: "1.0",
            data: {
              hello: "world"
            }
          }
        ]);

        rejected = false;
      } catch (error) {
        assert.isTrue(error instanceof RestError);
        assert.equal((error as RestError).statusCode, 404);
      }

      assert.isTrue(rejected);
    });
  });

  describe("#send (CloudEvent schema)", function() {
    let client: EventGridPublisherClient<"CloudEvent">;

    beforeEach(/** @this */ function() {
      ({ client, recorder } = createRecordedClient(
        this,
        testEnv.EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT,
        "CloudEvent",
        new AzureKeyCredential(testEnv.EVENT_GRID_CLOUD_EVENT_SCHEMA_API_KEY)
      ));
    });

    afterEach(async function() {
      await recorder.stop();
    });

    it("sends a single event", async () => {
      await client.send(
        [
          {
            type: "Azure.Sdk.TestEvent1",
            id: recorder.getUniqueName("cloudSingleEventId"),
            time: recorder.newDate("cloudSingleEventDate"),
            source: "/earth/unitedstates/washington/kirkland/finnhill",
            data: {
              hello: "world"
            }
          }
        ],
        { onResponse: (response) => (res = response) }
      );

      assert.equal(res?.status, 200);
    });

    it("sends multiple events", async () => {
      await client.send(
        [
          {
            type: "Azure.Sdk.TestEvent1",
            id: recorder.getUniqueName("cloudMultiEventId1"),
            time: recorder.newDate("cloudMultiEventDate1"),
            source: "/earth/unitedstates/washington/kirkland/finnhill",
            subject: "Multiple 1",
            data: {
              hello: "world"
            }
          },
          {
            type: "Azure.Sdk.TestEvent1",
            id: recorder.getUniqueName("cloudMultiEventId2"),
            time: recorder.newDate("cloudMultiEventDate2"),
            source: "/earth/unitedstates/washington/kirkland/finnhill",
            subject: "Multiple 2",
            data: {
              hello: "world"
            }
          }
        ],
        { onResponse: (response) => (res = response) }
      );

      assert.equal(res?.status, 200);
    });

    it("enriches events with distributed tracing information", async () => {
      const tracer = new TestTracer();
      setTracer(tracer);
      const rootSpan = tracer.startSpan("root");

      await client.send(
        [
          {
            type: "Azure.Sdk.TestEvent1",
            id: recorder.getUniqueName("cloudTracingEventId"),
            time: recorder.newDate("cloudTracingEventDate"),
            source: "/earth/unitedstates/washington/kirkland/finnhill",
            subject: "Single with Trace Parent",
            data: {
              hello: "world"
            }
          }
        ],
        {
          tracingOptions: {
            spanOptions: {
              parent: rootSpan.context()
            }
          },
          onResponse: (response) => (res = response)
        }
      );

      rootSpan.end();

      const parsedBody = JSON.parse(res?.request.body as string);

      assert.isArray(parsedBody);
      assert.equal(parsedBody[0].traceparent, "00-1-3-00");

      const spans = tracer.getKnownSpans();

      assert.equal(spans.length, 3);
      assert.equal(spans[0].name, "root");
      assert.equal(spans[1].name, "Azure.Data.EventGrid.EventGridPublisherClient-send");
      assert.equal(spans[2].name, "/api/events");
    });
  });

  describe("#send error cases (CloudEvent schema)", function() {
    let client: EventGridPublisherClient<"CloudEvent">;

    beforeEach(/** @this */ function() {
      ({ client, recorder } = createRecordedClient(
        this,
        removeApiEventsSuffix(testEnv.EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT),
        "CloudEvent",
        new AzureKeyCredential(testEnv.EVENT_GRID_CLOUD_EVENT_SCHEMA_API_KEY)
      ));
    });

    afterEach(async function() {
      await recorder.stop();
    });

    it("does not append /api/events", async () => {
      let rejected = true;

      try {
        await client.send([
          {
            type: "Azure.Sdk.TestEvent1",
            id: recorder.getUniqueName("cloudSingleEventId"),
            time: recorder.newDate("cloudSingleEventDate"),
            source: "/earth/unitedstates/washington/kirkland/finnhill",
            data: {
              hello: "world"
            }
          }
        ]);
        rejected = false;
      } catch (error) {
        assert.isTrue(error instanceof RestError);
        assert.equal((error as RestError).statusCode, 404);
      }

      assert.isTrue(rejected);
    });
  });

  describe("#send (Custom Event Schema)", function() {
    let client: EventGridPublisherClient<"Custom">;

    beforeEach(/** @this */ function() {
      ({ client, recorder } = createRecordedClient(
        this,
        testEnv.EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT,
        "Custom",
        new AzureKeyCredential(testEnv.EVENT_GRID_CUSTOM_SCHEMA_API_KEY)
      ));
    });

    afterEach(async function() {
      await recorder.stop();
    });

    it("sends a single event", async () => {
      await client.send(
        [
          {
            ver: "1.0",
            typ: "Azure.Sdk.TestEvent1",
            sub: "Single",
            payload: {
              hello: "world"
            }
          }
        ],
        { onResponse: (response) => (res = response) }
      );

      assert.equal(res?.status, 200);
    });

    it("sends multiple events", async () => {
      await client.send(
        [
          {
            ver: "1.0",
            typ: "Azure.Sdk.TestEvent1",
            sub: "Multiple 1",
            payload: {
              hello: "world"
            }
          },
          {
            ver: "1.0",
            typ: "Azure.Sdk.TestEvent1",
            sub: "Multiple 2",
            payload: {
              hello: "world"
            }
          }
        ],
        { onResponse: (response) => (res = response) }
      );

      assert.equal(res?.status, 200);
    });
  });

  describe("#send error cases (Custom Event Schema)", function() {
    let client: EventGridPublisherClient<"Custom">;

    beforeEach(/** @this */ function() {
      ({ client, recorder } = createRecordedClient(
        this,
        removeApiEventsSuffix(testEnv.EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT),
        "Custom",
        new AzureKeyCredential(testEnv.EVENT_GRID_CUSTOM_SCHEMA_API_KEY)
      ));
    });

    afterEach(async function() {
      await recorder.stop();
    });

    it("does not append /api/events", async () => {
      let rejected = true;

      try {
        await client.send([
          {
            ver: "1.0",
            typ: "Azure.Sdk.TestEvent1",
            sub: "Single",
            payload: {
              hello: "world"
            }
          }
        ]);

        rejected = false;
      } catch (error) {
        assert.isTrue(error instanceof RestError);
        assert.equal((error as RestError).statusCode, 404);
      }

      assert.isTrue(rejected);
    });
  });
});

describe("convertEventGridEventToModelType", function() {
  it("sets a default ID if one is not provided", () => {
    const convertedEvent = convertEventGridEventToModelType({
      dataVersion: "1.0",
      eventType: "Azure.Sdk.TestEvent",
      subject: "Test Event",
      data: { hello: "world " }
    });

    assert.isDefined(convertedEvent.id);
  });

  it("sets a default event time if one is not provided", () => {
    const convertedEvent = convertEventGridEventToModelType({
      dataVersion: "1.0",
      eventType: "Azure.Sdk.TestEvent",
      subject: "Test Event",
      data: { hello: "world " }
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
      data: { hello: "world " }
    });

    assert.strictEqual(convertedEvent.id, id);
    assert.strictEqual(convertedEvent.eventTime, time);
  });
});

describe("convertCloudEventToModelType", function() {
  it("sets a default ID if one is not provided", () => {
    const convertedEvent = convertCloudEventToModelType({
      source: "/azure/sdk/tests",
      type: "Azure.Sdk.TestEvent"
    });

    assert.isDefined(convertedEvent.id);
  });

  it("sets a default event time if one is not provided", () => {
    const convertedEvent = convertCloudEventToModelType({
      source: "/azure/sdk/tests",
      type: "Azure.Sdk.TestEvent"
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
      type: "Azure.Sdk.TestEvent"
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
        tracestate
      }
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
      datacontenttype: "application/binary"
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
        data: binaryData
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
          source: "this-is-not-allowed"
        }
      });
    }, /invalid extension attribute name: source/);

    assert.throws(() => {
      convertCloudEventToModelType({
        source: "/azure/sdk/tests",
        type: "Azure.Sdk.TestEvent",
        extensionAttributes: {
          MiXedCasE: "this-is-not-allowed"
        }
      });
    }, /invalid extension attribute name: MiXedCasE/);

    assert.throws(() => {
      convertCloudEventToModelType({
        source: "/azure/sdk/tests",
        type: "Azure.Sdk.TestEvent",
        extensionAttributes: {
          data_base64: "this-is-not-allowed"
        }
      });
    }, /invalid extension attribute name: data_base64/);
  });
});

function removeApiEventsSuffix(endpoint: string): string {
  const suffix = "/api/events";

  if (!endpoint.endsWith(suffix)) {
    throw new Error(`${endpoint} does not end with ${suffix}`);
  }

  return endpoint.substring(0, endpoint.length - suffix.length);
}
