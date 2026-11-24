// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertCount, assertLogExpectation } from "../../utils/assert.js";
import { LogBasicScenario } from "../../utils/basic.js";
import { DEFAULT_BREEZE_ENDPOINT } from "../../../src/Declarations/Constants.js";
import nock from "nock";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils.js";
import type { TelemetryItem as Envelope } from "../../../src/generated/index.js";
import { describe, it, beforeAll, afterAll, vi } from "vitest";

describe("Log Exporter Scenarios", () => {
  describe(LogBasicScenario.prototype.constructor.name, () => {
    const scenario = new LogBasicScenario();
    const ingest: Envelope[] = [];

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

    afterAll(async () => {
      await scenario.cleanup();
      nock.cleanAll();
    });

    it("should work", async () => {
      await scenario.run();
      await scenario.flush();
      // SimpleLogRecordProcessor.forceFlush does not wait for every export callback.
      await vi.waitFor(
        () => {
          assertLogExpectation(ingest, scenario.expectation);
          assertCount(ingest, scenario.expectation);
        },
        { timeout: 5000 },
      );
    });
  });
});
