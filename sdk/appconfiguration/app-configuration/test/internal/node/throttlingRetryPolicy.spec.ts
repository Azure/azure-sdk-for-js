// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationClient } from "../../../src";
import {
  createHttpHeaders,
  HttpClient,
  PipelineRequest,
  RestError,
  SendRequest,
} from "@azure/core-rest-pipeline";
import chai from "chai";
import { randomUUID } from "@azure/core-util";
import { NoOpCredential } from "@azure-tools/test-credential";

describe("Should not retry forever", () => {
  let client: AppConfigurationClient;
  const connectionString = "Endpoint=https://myappconfig.azconfig.io;Id=key:ai/u/fake;Secret=abcd=";

  beforeEach(() => {
    client = new AppConfigurationClient(connectionString, { retryOptions: { maxRetries: 3 } });
  });

  it("simulate the service throttling - honors the abort signal passed", async () => {
    client = createMockAppConfigurationClient(async (request: PipelineRequest) => {
      return {
        headers: createHttpHeaders({
          "Retry-After": "10000", // 10000 seconds - a large duration
        }),
        request,
        status: 429,
        bodyAsText: JSON.stringify({
          type: "https://azconfig.io/errors/too-many-requests",
          title: "Resource utilization has surpassed the assigned quota",
          policy: "Total Requests",
          status: 429,
        }),
      };
    });
    const key = randomUUID();
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
              abortSignal: AbortSignal.timeout(1000),
            },
          ),
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
    const key = randomUUID();
    let errorWasThrown = false;

    client = createMockAppConfigurationClient(async (request: PipelineRequest) => {
      return {
        headers: createHttpHeaders({
          "Retry-After": "10",
        }),
        request,
        status: 429,
        bodyAsText: JSON.stringify({
          type: "https://azconfig.io/errors/too-many-requests",
          title: "Resource utilization has surpassed the assigned quota",
          policy: "Total Requests",
          status: 429,
        }),
      };
    });

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
        "Unexpected error thrown",
      );
    }
    chai.assert.equal(errorWasThrown, true, "Error was not thrown");
  });
});

function createMockAppConfigurationClient(sendRequest: SendRequest): AppConfigurationClient {
  const fakeHttpClient: HttpClient = {
    sendRequest,
  };

  // Use NoOpCredential to avoid interception for credential request
  return new AppConfigurationClient("https://example.com", new NoOpCredential(), {
    httpClient: fakeHttpClient,
    retryOptions: { maxRetries: 3 },
  });
}
