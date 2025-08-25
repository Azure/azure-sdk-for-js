// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationClient } from "@azure/app-configuration";
import type {
  HttpClient,
  PipelineRequest,
  RestError,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { randomUUID } from "@azure/core-util";
import { NoOpCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, expect } from "vitest";

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
    await expect(Promise.all(promises)).rejects.toThrow(/The operation was aborted/);
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
      assert.equal(err.name, "RestError", "Unexpected error thrown");
      assert.equal(JSON.parse(err.message).status, 429, "Unexpected error thrown");
      assert.equal(
        JSON.parse(err.message).title,
        "Resource utilization has surpassed the assigned quota",
        "Unexpected error thrown",
      );
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
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
