// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationClient } from "../../src/index.js";
import { describe, it, assert } from "vitest";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

describe("AppConfigurationClient constructor error cases", () => {
  it("invalid connection string gives a decent error message", () => {
    assert.throws(
      () => new AppConfigurationClient("an invalid connection string"),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/,
    );
  });

  it("undefined connection string gives a decent error message", () => {
    assert.throws(
      () => new AppConfigurationClient(undefined as any),
      /Invalid connection string\. Valid connection strings should match the regex 'Endpoint=\(\.\*\);Id=\(\.\*\);Secret=\(\.\*\)'/,
    );
  });
});

describe("AppConfigurationClient connection string requests", () => {
  const fakeConnectionString =
    "Endpoint=https://contoso.azconfig.io;Id=fake-id;Secret=ABCD";

  it("does not set an invalid 'Connection String' request header", async () => {
    let capturedRequest: PipelineRequest | undefined;
    const mockHttpClient: HttpClient = {
      sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
        capturedRequest = request;
        return { request, status: 200, headers: createHttpHeaders(), bodyAsText: "{}" };
      },
    };

    const client = new AppConfigurationClient(fakeConnectionString, {
      httpClient: mockHttpClient,
    });

    // The response is mocked, so deserialization may fail; we only care that the request was built
    // and handed to the HTTP client without an invalid header. Swallow any post-send error.
    await client.getConfigurationSetting({ key: "key" }).catch(() => {
      /* expected: the mocked response is not a real configuration setting */
    });

    assert.isDefined(capturedRequest, "the request should reach the HTTP client");
    const request = capturedRequest!;

    for (const name of Object.keys(request.headers.toJSON())) {
      assert.notMatch(name, /\s/, `request header name "${name}" must be a valid HTTP token`);
    }
    assert.isUndefined(
      request.headers.get("Connection String"),
      "the invalid 'Connection String' header must not be set",
    );

    const authorization = request.headers.get("Authorization");
    assert.isDefined(authorization, "HMAC Authorization header should be set");
    assert.match(authorization!, /^HMAC-SHA256 /, "connection-string auth should use HMAC signing");
  });
});
