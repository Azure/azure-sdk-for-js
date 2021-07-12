// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { AppConfigurationClient } from "../../../src";
import { AbortController } from "@azure/abort-controller";
import nock from "nock";
import { generateUuid } from "@azure/core-http";

describe("Should not retry forever - honors the abort signal passed", () => {
  let client: AppConfigurationClient;
  const connectionString = "Endpoint=https://myappconfig.azconfig.io;Id=key:ai/u/fake;Secret=abcd=";

  beforeEach(function() {
    if (!nock.isActive()) {
      nock.activate();
    }
    nock("https://myappconfig.azconfig.io:443")
      .persist()
      .put(/.*/g)
      .reply(
        429,
        {
          type: "https://azconfig.io/errors/too-many-requests",
          title: "Resource utilization has surpassed the assigned quota",
          policy: "Total Requests",
          status: 429
        },
        ["retry-after-ms", "123456"]
      );

    client = new AppConfigurationClient(connectionString);
  });

  afterEach(async function() {
    nock.restore();
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it("simulate the service throttling", async () => {
    const key = generateUuid();
    const numberOfSettings = 200;
    const promises = [];
    let errorWasThrown = false;
    try {
      for (let index = 0; index < numberOfSettings; index++) {
        promises.push(
          client.addConfigurationSetting(
            {
              key: key + "-" + index,
              value: "added"
            },
            {
              abortSignal: AbortController.timeout(1000)
            }
          )
        );
      }
      await Promise.all(promises);
    } catch (error) {
      errorWasThrown = true;
      chai.assert.equal((error as any).name, "AbortError", "Unexpected error thrown");
    }
    chai.assert.equal(errorWasThrown, true, "Error was not thrown");
  });
});
