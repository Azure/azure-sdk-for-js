// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertCount, assertExpectation } from "../common/assert";
import { BasicScenario } from "../common/scenario/basic";
import { DEFAULT_BREEZE_ENDPOINT } from "../../src/Declarations/Constants";
import nock from "nock";
import { successfulBreezeResponse } from "../unit/breezeTestUtils";
import { Envelope } from "../../src/Declarations/Contracts";
import { gunzipSync } from "zlib";
import { promisify } from "util";

const sleep = promisify(setTimeout);

describe("Trace Exporter Scenarios", () => {
  describe(BasicScenario.prototype.constructor.name, () => {
    const scenario = new BasicScenario();

    let ingest: Envelope[] = [];
    nock(DEFAULT_BREEZE_ENDPOINT)
      .post("/v2/track", (body) => {
        const buffer = gunzipSync(Buffer.from(body, "hex"));
        ingest.push(...(JSON.parse(buffer.toString("utf8")) as Envelope[]));
        return body;
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

    it("should work", async () => {
      await scenario.run();
      // Wait a bit for exporter to export everything
      await sleep(1000);
      assertExpectation(ingest, scenario.expectation);
      assertCount(ingest, scenario.expectation);
    });
  });
});
