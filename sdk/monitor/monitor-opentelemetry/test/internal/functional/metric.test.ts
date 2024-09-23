// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertCount, assertMetricExpectation } from "../../utils/assert";
import { MetricBasicScenario } from "../../utils/basic";
import nock from "nock";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils";
import { TelemetryItem as Envelope } from "../../utils/models/index";

describe("Metric Exporter Scenarios", () => {
  describe(MetricBasicScenario.prototype.constructor.name, () => {
    const scenario = new MetricBasicScenario();

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
            assertMetricExpectation(ingest, scenario.expectation);
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
