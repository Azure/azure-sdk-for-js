// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { AppConfigurationClient } from "../../../src";
import { AbortController } from "@azure/abort-controller";
import nock from "nock";
import { v4 as generateUuid } from "uuid";
import { RestError } from "@azure/core-rest-pipeline";

describe("Should not retry forever", () => {
  let client: AppConfigurationClient;
  const connectionString = "Endpoint=https://myappconfig.azconfig.io;Id=key:ai/u/fake;Secret=abcd=";

  function mockErrorResponse(retryAfterMs: string, persistence: boolean = true): void {
    if (!nock.isActive()) {
      nock.activate();
    }
    nock("https://myappconfig.azconfig.io:443").persist(persistence).put(/.*/g).reply(
      429,
      {
        type: "https://azconfig.io/errors/too-many-requests",
        title: "Resource utilization has surpassed the assigned quota",
        policy: "Total Requests",
        status: 429,
      },
      ["retry-after-ms", retryAfterMs]
    );
  }

  beforeEach(() => {
    client = new AppConfigurationClient(connectionString, { retryOptions: { maxRetries: 3 } });
  });

  afterEach(async function () {
    nock.restore();
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it("simulate the service throttling - honors the abort signal passed", async () => {
    mockErrorResponse("123456");
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
              value: "added",
            },
            {
              abortSignal: AbortController.timeout(1000),
            }
          )
        );
      }
      await Promise.all(promises);
    } catch (error: any) {
      errorWasThrown = true;
      chai.assert.equal((error as any).name, "AbortError", "Unexpected error thrown");
    }
    chai.assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("should not retry forever without abortSignal", async () => {
    const responseCount = 10;
    for (let index = 0; index < responseCount; index++) {
      mockErrorResponse("100", false);
    }
    const key = generateUuid();
    let errorWasThrown = false;

    chai.assert.equal(
      nock.pendingMocks().length,
      responseCount,
      "unexpected pending mocks before making the request"
    );
    try {
      await client.addConfigurationSetting({
        key: key,
        value: "added",
      });
    } catch (error: any) {
      errorWasThrown = true;
      const err = error as RestError;
      chai.assert.equal(err.name, "RestError", "Unexpected error thrown");
      chai.assert.equal(JSON.parse(err.message).status, 429, "Unexpected error thrown");
      chai.assert.equal(
        JSON.parse(err.message).title,
        "Resource utilization has surpassed the assigned quota",
        "Unexpected error thrown"
      );
    }
    chai.assert.equal(errorWasThrown, true, "Error was not thrown");
    chai.assert.equal(
      nock.pendingMocks().length,
      responseCount - 1 - 3, // one attempt + three retries
      "unexpected pending mocks after the test was run"
    );
  });
});
