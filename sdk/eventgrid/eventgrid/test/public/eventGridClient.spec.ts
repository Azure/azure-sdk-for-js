// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Suite, Context } from "mocha";

import { Recorder } from "@azure-tools/test-recorder";

import { createRecordedClient, testEnv } from "./utils/recordedClient";

import { resetTracer, setTracer } from "@azure/test-utils";

import { AzureKeyCredential, EventGridPublisherClient } from "../../src";

import { FullOperationResponse } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { setSpan, context } from "@azure/core-tracing";

describe("EventGridPublisherClient", function(this: Suite) {
  let recorder: Recorder;
  let res: FullOperationResponse | undefined;

  this.timeout(10000);

  beforeEach(function() {
    res = undefined;
  });

  describe("#send (EventGrid schema)", function() {
    let client: EventGridPublisherClient<"EventGrid">;

    beforeEach(function(this: Context) {
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

    beforeEach(function(this: Context) {
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
        assert.equal((error as RestError).statusCode, 404);
      }

      assert.isTrue(rejected);
    });
  });

  describe("#send (CloudEvent schema)", function() {
    let client: EventGridPublisherClient<"CloudEvent">;

    beforeEach(function(this: Context) {
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
      const tracer = setTracer();
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
            tracingContext: setSpan(context.active(), rootSpan)
          },
          onResponse: (response) => (res = response)
        }
      );

      rootSpan.end();

      const parsedBody = JSON.parse(res?.request.body as string);

      assert.isArray(parsedBody);
      assert.equal(
        parsedBody[0].traceparent,
        "00-00000000000000000000000000000001-0000000000000003-00"
      );

      const spans = tracer.getKnownSpans();

      assert.equal(spans.length, 3);
      assert.equal(spans[0].name, "root");
      assert.equal(spans[1].name, "Azure.Data.EventGrid.EventGridPublisherClient-send");
      assert.equal(spans[2].name, "/api/events");

      resetTracer();
    });
  });

  describe("#send error cases (CloudEvent schema)", function() {
    let client: EventGridPublisherClient<"CloudEvent">;

    beforeEach(function(this: Context) {
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
        assert.equal((error as RestError).statusCode, 404);
      }

      assert.isTrue(rejected);
    });
  });

  describe("#send (Custom Event Schema)", function() {
    let client: EventGridPublisherClient<"Custom">;

    beforeEach(function(this: Context) {
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

    beforeEach(function(this: Context) {
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
        assert.equal((error as RestError).statusCode, 404);
      }

      assert.isTrue(rejected);
    });
  });
});

function removeApiEventsSuffix(endpoint: string): string {
  const suffix = "/api/events";

  if (!endpoint.endsWith(suffix)) {
    throw new Error(`${endpoint} does not end with ${suffix}`);
  }

  return endpoint.substring(0, endpoint.length - suffix.length);
}
