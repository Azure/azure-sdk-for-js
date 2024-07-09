// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertCount, assertLogExpectation } from "../../utils/assert";
import { LogBasicScenario } from "../../utils/basic";
import { DEFAULT_BREEZE_ENDPOINT } from "../../../src/Declarations/Constants";
import nock from "nock";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils";
import { TelemetryItem as Envelope } from "../../../src/generated";

describe("Log Exporter Scenarios", () => {
  describe(LogBasicScenario.prototype.constructor.name, () => {
    const scenario = new LogBasicScenario();
    let ingest: Envelope[] = [];

    before(() => {
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

    after(() => {
      scenario.cleanup();
      nock.cleanAll();
    });

    it.skip("should work", (done) => {
      scenario
        .run()
        .then(() => {
          // promisify doesn't work on this, so use callbacks/done for now
          return scenario.flush().then(() => {
            setTimeout(() => {
              assertLogExpectation(ingest, scenario.expectation);
              assertCount(ingest, scenario.expectation);
              done();
            }, 1);
          });
        })
        .catch((e) => {
          done(e);
        });
    });
  });
});
