// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertCount, assertTraceExpectation } from "../../utils/assert.js";
import { TraceBasicScenario } from "../../utils/basic.js";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils.js";
import type { TelemetryItem as Envelope } from "../../utils/models/index.js";
import { describe, it, afterEach, vi } from "vitest";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";

describe("Trace Exporter Scenarios", () => {
  describe(TraceBasicScenario.prototype.constructor.name, () => {
    const scenario = new TraceBasicScenario();
    let ingest: Envelope[] = [];

    afterEach(() => {
      scenario.cleanup();
      ingest = [];
    });

    it("should work", async () => {
      const azMonHttpClient: HttpClient = {
        sendRequest: vi.fn().mockImplementation((request: PipelineRequest) => {
          if (request.url !== "https://dc.services.visualstudio.com/v2.1/track") {
            throw new Error(`unexpected request to url ${request.url}`);
          }
          const envelope = JSON.parse(request.body as string) as Envelope[];
          ingest.push(...envelope);
          return Promise.resolve({
            headers: request.headers,
            request,
            status: 200,
            bodyAsText: JSON.stringify(successfulBreezeResponse(1)),
          });
        }),
      };
      scenario.prepare(azMonHttpClient);
      await scenario.run();
      await scenario.flush();
      assertTraceExpectation(ingest, scenario.expectation);
      assertCount(ingest, scenario.expectation);
    });
  });
});
