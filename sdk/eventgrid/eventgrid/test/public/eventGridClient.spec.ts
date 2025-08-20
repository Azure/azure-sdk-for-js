// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient } from "./utils/recordedClient.js";
import type { EventGridPublisherClient } from "@azure/eventgrid";
import type { RestError } from "@azure/core-rest-pipeline";
import type { AdditionalPolicyConfig, OperationOptions } from "@azure/core-client";
import { getRandomNumber } from "./utils/testUtils.js";
import {
  TraceParentHeaderName,
  TraceStateHeaderName,
} from "../../src/cloudEventDistrubtedTracingEnricherPolicy.js";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({ toSupportTracing });

describe("EventGridPublisherClient", { timeout: 10000 }, () => {
  let recorder: Recorder;

  describe("#send (EventGrid schema)", () => {
    let client: EventGridPublisherClient<"EventGrid">;

    beforeEach(async (ctx) => {
      ({ client, recorder } = await createRecordedClient(
        ctx,
        "EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT",
        "EventGrid",
      ));
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("sends a single event", async () => {
      let status: number | undefined;

      await client.send(
        [
          {
            eventTime: new Date(recorder.variable("singleEventDate", new Date().toString())),
            id: recorder.variable("singleEventId", `singleEventId${getRandomNumber()}`),
            eventType: "Azure.Sdk.TestEvent1",
            subject: "Single 1",
            dataVersion: "1.0",
            data: {
              hello: "world",
            },
          },
        ],
        { onResponse: (response) => (status = response.status) },
      );

      assert.strictEqual(status, 200);
    });

    it("sends multiple events", async () => {
      let status: number | undefined;

      await client.send(
        [
          {
            eventTime: new Date(recorder.variable("multiEventDate1", new Date().toString())),
            id: recorder.variable("multiEventId1", `multiEventId1${getRandomNumber()}`),
            eventType: "Azure.Sdk.TestEvent1",
            subject: "Multiple 1",
            dataVersion: "1.0",
            data: {
              hello: "world",
            },
          },
          {
            eventTime: new Date(recorder.variable("multiEventDate2", new Date().toString())),
            id: recorder.variable("multiEventId2", `multiEventId2${getRandomNumber()}`),
            eventType: "Azure.Sdk.TestEvent1",
            subject: "Multiple 2",
            dataVersion: "1.0",
            data: {
              hello: "world",
            },
          },
        ],
        { onResponse: (response) => (status = response.status) },
      );

      assert.strictEqual(status, 200);
    });
  });

  describe("#send error cases (EventGrid schema)", () => {
    let client: EventGridPublisherClient<"EventGrid">;

    beforeEach(async (ctx) => {
      ({ client, recorder } = await createRecordedClient(
        ctx,
        "EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT",
        "EventGrid",
        {
          removeApiEventsSuffixBool: true,
        },
      ));
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("does not append /api/events", async () => {
      let rejected = true;

      try {
        await client.send([
          {
            eventTime: new Date(recorder.variable("singleEventDate", new Date().toString())),
            id: recorder.variable("singleEventId", `singleEventId${getRandomNumber()}`),
            eventType: "Azure.Sdk.TestEvent1",
            subject: "Single 1",
            dataVersion: "1.0",
            data: {
              hello: "world",
            },
          },
        ]);

        rejected = false;
      } catch (error: any) {
        assert.equal((error as RestError).statusCode, 404);
      }

      assert.isTrue(rejected);
    });
  });

  describe("#send (CloudEvent schema)", () => {
    let client: EventGridPublisherClient<"CloudEvent">;

    beforeEach(async (ctx) => {
      ({ client, recorder } = await createRecordedClient(
        ctx,
        "EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT",
        "CloudEvent",
      ));
      await recorder.setMatcher("HeaderlessMatcher");
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("sends a single event", async () => {
      let status: number | undefined;

      await client.send(
        [
          {
            type: "Azure.Sdk.TestEvent1",
            id: recorder.variable("cloudSingleEventId", `cloudSingleEventId${getRandomNumber()}`),
            time: new Date(recorder.variable("cloudSingleEventDate", new Date().toString())),
            source: "/earth/unitedstates/washington/kirkland/finnhill",
            data: {
              hello: "world",
            },
          },
        ],
        { onResponse: (response) => (status = response.status) },
      );

      assert.strictEqual(status, 200);
    });

    it("sends multiple events", async () => {
      let status: number | undefined;

      await client.send(
        [
          {
            type: "Azure.Sdk.TestEvent1",
            id: recorder.variable("cloudMultiEventId1", `cloudMultiEventId1${getRandomNumber()}`),
            time: new Date(recorder.variable("cloudMultiEventDate1", new Date().toString())),
            source: "/earth/unitedstates/washington/kirkland/finnhill",
            subject: "Multiple 1",
            data: {
              hello: "world",
            },
          },
          {
            type: "Azure.Sdk.TestEvent1",
            id: recorder.variable("cloudMultiEventId2", `cloudMultiEventId2${getRandomNumber()}`),
            time: new Date(recorder.variable("cloudMultiEventDate2", new Date().toString())),
            source: "/earth/unitedstates/washington/kirkland/finnhill",
            subject: "Multiple 2",
            data: {
              hello: "world",
            },
          },
        ],
        { onResponse: (response) => (status = response.status) },
      );

      assert.strictEqual(status, 200);
    });

    describe("when tracing headers are present in the request", () => {
      const traceparentValue = "00-00000000000000000000000000000001-0000000000000003-00";
      const tracestateValue = "00-123";

      beforeEach(async (ctx) => {
        const setHeadersPolicy: AdditionalPolicyConfig = {
          policy: {
            name: "foo",
            sendRequest(request, next) {
              request.headers.set(TraceParentHeaderName, traceparentValue);
              request.headers.set(TraceStateHeaderName, tracestateValue);
              return next(request);
            },
          },
          position: "perCall",
        };

        ({ client, recorder } = await createRecordedClient(
          ctx,
          "EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT",
          "CloudEvent",
          {
            additionalPolicies: [setHeadersPolicy],
          },
        ));
        await recorder.setMatcher("HeaderlessMatcher");
      });

      it("enriches events with distributed tracing information", async () => {
        let requestBody: string | undefined;

        await expect(async (options: OperationOptions) => {
          await client.send(
            [
              {
                type: "Azure.Sdk.TestEvent1",
                id: recorder.variable(
                  "cloudTracingEventId",
                  `cloudTracingEventId${getRandomNumber()}`,
                ),
                time: new Date(recorder.variable("cloudTracingEventDate", new Date().toString())),
                source: "/earth/unitedstates/washington/kirkland/finnhill",
                subject: "Single with Trace Parent",
                data: {
                  hello: "world",
                },
              },
            ],
            {
              ...options,
              onResponse: (response) => (requestBody = response.request.body as string),
            },
          );
        }).toSupportTracing(["EventGridPublisherClient.send"]);

        const parsedBody = JSON.parse(requestBody || "");
        assert.isArray(parsedBody);
        assert.equal(parsedBody[0].traceparent, traceparentValue);
        assert.equal(parsedBody[0].tracestate, tracestateValue);
      });
    });
  });

  describe("#send error cases (CloudEvent schema)", () => {
    let client: EventGridPublisherClient<"CloudEvent">;

    beforeEach(async (ctx) => {
      ({ client, recorder } = await createRecordedClient(
        ctx,
        "EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT",
        "CloudEvent",
        {
          removeApiEventsSuffixBool: true,
        },
      ));
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("does not append /api/events", async () => {
      let rejected = true;

      try {
        await client.send([
          {
            type: "Azure.Sdk.TestEvent1",
            id: recorder.variable("cloudSingleEventId", `cloudSingleEventId${getRandomNumber()}`),
            time: new Date(recorder.variable("cloudSingleEventDate", new Date().toString())),
            source: "/earth/unitedstates/washington/kirkland/finnhill",
            data: {
              hello: "world",
            },
          },
        ]);
        rejected = false;
      } catch (error: any) {
        assert.equal((error as RestError).statusCode, 404);
      }

      assert.isTrue(rejected);
    });
  });

  describe("#send (Custom Event Schema)", () => {
    let client: EventGridPublisherClient<"Custom">;

    beforeEach(async (ctx) => {
      ({ client, recorder } = await createRecordedClient(
        ctx,
        "EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT",
        "Custom",
      ));
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("sends a single event", async () => {
      let status: number | undefined;

      await client.send(
        [
          {
            ver: "1.0",
            typ: "Azure.Sdk.TestEvent1",
            sub: "Single",
            payload: {
              hello: "world",
            },
          },
        ],
        { onResponse: (response) => (status = response.status) },
      );

      assert.strictEqual(status, 200);
    });

    it("sends multiple events", async () => {
      let status: number | undefined;

      await client.send(
        [
          {
            ver: "1.0",
            typ: "Azure.Sdk.TestEvent1",
            sub: "Multiple 1",
            payload: {
              hello: "world",
            },
          },
          {
            ver: "1.0",
            typ: "Azure.Sdk.TestEvent1",
            sub: "Multiple 2",
            payload: {
              hello: "world",
            },
          },
        ],
        { onResponse: (response) => (status = response.status) },
      );

      assert.strictEqual(status, 200);
    });
  });

  describe("#send error cases (Custom Event Schema)", () => {
    let client: EventGridPublisherClient<"Custom">;

    beforeEach(async (ctx) => {
      ({ client, recorder } = await createRecordedClient(
        ctx,
        "EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT",
        "Custom",
        {
          removeApiEventsSuffixBool: true,
        },
      ));
    });

    afterEach(async () => {
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
              hello: "world",
            },
          },
        ]);

        rejected = false;
      } catch (error: any) {
        assert.equal((error as RestError).statusCode, 404);
      }

      assert.isTrue(rejected);
    });
  });
});
