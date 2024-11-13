// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertCount, assertLogExpectation } from "../../utils/assert.js";
import { LogBasicScenario } from "../../utils/basic.js";
import { DEFAULT_BREEZE_ENDPOINT } from "../../../src/Declarations/Constants.js";
import nock from "nock";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils.js";
import type { TelemetryItem as Envelope } from "../../../src/generated/index.js";
import { describe, it, beforeAll, afterAll } from "vitest";

describe("Log Exporter Scenarios", () => {
  describe(LogBasicScenario.prototype.constructor.name, () => {
    const scenario = new LogBasicScenario();
    const ingest: Envelope[] = [];

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
    });

    it("should work", async () => {
      await scenario.run();
      // promisify doesn't work on this, so use callbacks/done for now
      // eslint-disable-next-line promise/always-return
      await scenario.flush();
      setTimeout(() => {
        assertLogExpectation(ingest, scenario.expectation);
        assertCount(ingest, scenario.expectation);
      }, 1);
    });
  });
});
