// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AppConfigurationClient } from "../../../src/appConfigurationClient.js";
import type { TokenCredential } from "@azure/core-auth";
import type { OperationRequestOptions } from "@azure-rest/core-client";
import { packageVersion } from "../../../src/internal/constants.js";
import { describe, it, assert, expect } from "vitest";

describe("packagejson related tests", () => {
  // if this test is failing you need to update the contant `packageVersion` referenced above
  // in the generated code.
  it("user agent string preserves a custom prefix and matches the package version", async () => {
    const customUserAgentPrefix = "custom-user-agent/1.0.0";
    let userAgent: string | undefined;
    const client = new AppConfigurationClient(
      "https://myresource.azconfig.io",
      {
        getToken: (_scopes) => {
          return Promise.resolve({
            token: "fakevalue",
            expiresOnTimestamp: new Date().getTime() + 24 * 60 * 60 * 1000,
          });
        },
      } as TokenCredential,
      {
        userAgentOptions: { userAgentPrefix: customUserAgentPrefix },
        httpClient: {
          sendRequest: async (request) => {
            userAgent = request.headers.get("user-agent") ?? request.headers.get("x-ms-useragent");
            throw new Error("only a test");
          },
        },
      },
    );

    try {
      await client.getSnapshot("name");
    } catch {
      // no-op, we don't care about the response, only the user-agent header
    }
    assert.exists(userAgent, "Expected a User-Agent header to be sent");
    assert.isTrue(
      userAgent!.startsWith(
        `${customUserAgentPrefix} azsdk-js-app-configuration/${packageVersion} `,
      ),
      "Expected the custom User-Agent prefix before the App Configuration SDK identifier",
    );
  });

  it("sends deprecated customHeaders with canonical headers taking precedence", async () => {
    const receivedHeaders = new Map<string, string | undefined>();
    const client = new AppConfigurationClient(
      "https://myresource.azconfig.io",
      {
        getToken: () =>
          Promise.resolve({
            token: "fakevalue",
            expiresOnTimestamp: Date.now() + 24 * 60 * 60 * 1000,
          }),
      } as TokenCredential,
      {
        httpClient: {
          sendRequest: async (request) => {
            receivedHeaders.set("x-legacy", request.headers.get("x-legacy"));
            receivedHeaders.set("x-current", request.headers.get("x-current"));
            receivedHeaders.set("x-shared", request.headers.get("x-shared"));
            throw new Error("request captured");
          },
        },
      },
    );

    await expect(
      client.getSnapshot("name", {
        requestOptions: {
          customHeaders: {
            "x-legacy": "legacy",
            "x-shared": "legacy",
          },
          headers: {
            "x-current": "current",
            "x-shared": "current",
          },
        } as OperationRequestOptions & { customHeaders: Record<string, string> },
      }),
    ).rejects.toThrow("request captured");

    assert.equal(receivedHeaders.get("x-legacy"), "legacy");
    assert.equal(receivedHeaders.get("x-current"), "current");
    assert.equal(receivedHeaders.get("x-shared"), "current");
  });
});
