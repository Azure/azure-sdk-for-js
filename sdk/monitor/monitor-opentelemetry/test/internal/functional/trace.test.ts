// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertCount, assertTraceExpectation } from "../../utils/assert";
import { TraceBasicScenario } from "../../utils/basic";
import nock from "nock";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils";
import { TelemetryItem as Envelope } from "../../utils/models/index";

describe("Trace Exporter Scenarios", () => {
  describe(TraceBasicScenario.prototype.constructor.name, () => {
    const scenario = new TraceBasicScenario();
    let ingest: Envelope[] = [];

    before(() => {
      nock("https://dc.services.visualstudio.com")
        .post("/v2.1/track", (body: Envelope[]) => {
          ingest.push(...body);
          return true;
        })
        .reply(200, successfulBreezeResponse(1))
        .persist();
      scenario.prepare();
    });

    after(() => {
      scenario.cleanup();
      nock.cleanAll();
      ingest = [];
    });

    it("should work", (done) => {
      scenario
        .run()
        .then(() => {
          // promisify doesn't work on this, so use callbacks/done for now
          return scenario.flush().then(() => {
            assertTraceExpectation(ingest, scenario.expectation);
            assertCount(ingest, scenario.expectation);
            done();
            return;
          });
        })
        .catch((e) => {
          done(e);
        });
    });
  });
});
