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
import { describe, it, beforeAll, afterAll, vi } from "vitest";

describe("Trace Exporter Scenarios", () => {
  describe(TraceBasicScenario.prototype.constructor.name, () => {
    const scenario = new TraceBasicScenario();
    let ingest: Envelope[] = [];

    beforeAll(() => {
      nock(DEFAULT_BREEZE_ENDPOINT)
        .matchHeader("Content-Encoding", "gzip")
        .post("/v2.1/track", (body: Envelope[]) => {
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
      await vi.waitFor(
        () => {
          assertTraceExpectation(ingest, scenario.expectation);
          assertCount(ingest, scenario.expectation);
        },
        { timeout: 5000 },
      );
    });
  });

  describe(`${TraceBasicScenario.prototype.constructor.name} with disabled OTel Resource Metric`, () => {
    const scenario = new TraceBasicScenario();
    let ingest: Envelope[] = [];

    beforeAll(() => {
      process.env[ENV_OPENTELEMETRY_RESOURCE_METRIC_DISABLED] = "true";
      nock(DEFAULT_BREEZE_ENDPOINT)
        .matchHeader("Content-Encoding", "gzip")
        .post("/v2.1/track", (body: Envelope[]) => {
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
      await vi.waitFor(
        () => {
          assertTraceExpectation(ingest, scenario.disabledExpectation);
          assertCount(ingest, scenario.disabledExpectation);
        },
        { timeout: 5000 },
      );
    });
  });
});
