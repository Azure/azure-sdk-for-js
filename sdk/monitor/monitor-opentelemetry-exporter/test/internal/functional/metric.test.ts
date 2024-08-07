// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertCount, assertMetricExpectation } from "../../utils/assert";
import { MetricBasicScenario } from "../../utils/basic";
import { DEFAULT_BREEZE_ENDPOINT } from "../../../src/Declarations/Constants";
import nock from "nock";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils";
import { TelemetryItem as Envelope } from "../../../src/generated";

describe("Metric Exporter Scenarios", () => {
  describe(MetricBasicScenario.prototype.constructor.name, () => {
    const scenario = new MetricBasicScenario();

    let ingest: Envelope[] = [];
    before(() => {
      nock(DEFAULT_BREEZE_ENDPOINT)
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
          // eslint-disable-next-line promise/always-return
          return scenario.flush().then(() => {
            assertMetricExpectation(ingest, scenario.expectation);
            assertCount(ingest, scenario.expectation);
            done();
          });
        })
        .catch((e) => {
          done(e);
        });
    });
  });
});
