// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertCount, assertTraceExpectation } from "../../utils/assert.js";
import { TraceBasicScenario } from "../../utils/basic.js";
import {
  DEFAULT_BREEZE_ENDPOINT,
  ENV_OPENTELEMETRY_RESOURCE_METRIC_DISABLED,
} from "../../../src/Declarations/Constants.js";
import nock from "nock";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils.js";
import type { TelemetryItem as Envelope } from "../../../src/generated/index.js";
import { describe, it, beforeAll, afterAll } from "vitest";
import { delay } from "@azure/core-util";

describe("Trace Exporter Scenarios", () => {
  describe(TraceBasicScenario.prototype.constructor.name, () => {
    const scenario = new TraceBasicScenario();
    let ingest: Envelope[] = [];

    beforeAll(() => {
      nock(DEFAULT_BREEZE_ENDPOINT)
        .post("/v2.1/track", (body: Envelope[]) => {
          // todo: gzip is not supported by generated applicationInsightsClient
          // const buffer = gunzipSync(Buffer.from(body, "hex"));
          // ingest.push(...(JSON.parse(buffer.toString("utf8")) as Envelope[]));
          ingest.push(...body);
          return true;
        })
        .reply(200, successfulBreezeResponse(1))
        .persist();
      scenario.prepare();
    });

    afterAll(() => {
      scenario.cleanup();
      nock.cleanAll();
      ingest = [];
    });

    it("should work", async () => {
      await scenario.run();
      await scenario.flush();
      setTimeout(() => {
        assertTraceExpectation(ingest, scenario.expectation);
        assertCount(ingest, scenario.expectation);
      }, 100);

      await delay(200); // wait enough time for timeout callback
    });
  });

  describe(`${TraceBasicScenario.prototype.constructor.name} with disabled OTel Resource Metric`, () => {
    const scenario = new TraceBasicScenario();
    let ingest: Envelope[] = [];

    beforeAll(() => {
      process.env[ENV_OPENTELEMETRY_RESOURCE_METRIC_DISABLED] = "true";
      nock(DEFAULT_BREEZE_ENDPOINT)
        .post("/v2.1/track", (body: Envelope[]) => {
          // todo: gzip is not supported by generated applicationInsightsClient
          // const buffer = gunzipSync(Buffer.from(body, "hex"));
          // ingest.push(...(JSON.parse(buffer.toString("utf8")) as Envelope[]));
          ingest.push(...body);
          return true;
        })
        .reply(200, successfulBreezeResponse(1))
        .persist();
      scenario.prepare();
    });

    afterAll(() => {
      scenario.cleanup();
      nock.cleanAll();
      ingest = [];
    });

    it("should work with OTel resource metric disabled", async () => {
      await scenario.run();
      await scenario.flush();
      setTimeout(() => {
        assertTraceExpectation(ingest, scenario.disabledExpectation);
        assertCount(ingest, scenario.disabledExpectation);
      }, 100);

      await delay(200); // wait enough time for timeout callback
    });
  });
});
