// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertCount, assertExpectation } from "../../utils/assert";
import { BasicScenario } from "../../utils/basic";
import { DEFAULT_BREEZE_ENDPOINT } from "../../../src/Declarations/Constants";
import { TelemetryItem as Envelope } from "../../../src/generated";
import nock from "nock";
import { successfulBreezeResponse } from "../../utils/breezeTestUtils";


describe("Trace Exporter Scenarios", () => {
  describe(BasicScenario.prototype.constructor.name, () => {
    const scenario = new BasicScenario();

    let ingest: Envelope[] = [];
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

    before(() => {
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
          // eslint-disable-next-line promise/no-nesting, promise/always-return
          return scenario.flush().then(() => {
            assertExpectation(ingest, scenario.expectation);
            assertCount(ingest, scenario.expectation);
            done(); // eslint-disable-line promise/no-callback-in-promise
          });
        })
        .catch((e) => {
          done(e); // eslint-disable-line promise/no-callback-in-promise
        });
    });
  });
});
