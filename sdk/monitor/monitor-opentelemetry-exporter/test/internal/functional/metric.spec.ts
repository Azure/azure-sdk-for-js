// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertCount, assertMetricExpectation } from "../../utils/assert.js";
import { MetricBasicScenario } from "../../utils/basic.js";
import { DEFAULT_BREEZE_ENDPOINT } from "$internal/Declarations/Constants.js";
import nock from "nock";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils.js";
import type { TelemetryItem as Envelope } from "$internal/generated/index.js";
import { describe, it, beforeAll, afterAll } from "vitest";
import { delay } from "@azure/core-util";

describe("Metric Exporter Scenarios", () => {
  describe(MetricBasicScenario.prototype.constructor.name, () => {
    const scenario = new MetricBasicScenario();

    let ingest: Envelope[] = [];
    beforeAll(() => {
      nock(DEFAULT_BREEZE_ENDPOINT)
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
      // promisify doesn't work on this, so use callbacks/done for now
      await scenario.flush();
      setTimeout(() => {
        assertMetricExpectation(ingest, scenario.expectation);
        assertCount(ingest, scenario.expectation);
      }, 100);

      await delay(200); // wait enough time for timeout callback
    });
  });
});
