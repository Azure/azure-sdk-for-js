// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LogsQueryOptions } from "../../../src/index.js";
import { Durations, LogsQueryClient } from "../../../src/index.js";
import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, it, assert, expect } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({ toSupportTracing });

describe("LogsQueryClient unit tests", () => {
  /**
   * Custom scopes and endpoints are needed if you're connecting to
   * a government cloud, for instance.
   */
  const scopesPassed: string[] = [];

  const tokenCredential: TokenCredential = {
    async getToken(
      scopes: string | string[],
      _options?: GetTokenOptions,
    ): Promise<AccessToken | null> {
      if (Array.isArray(scopes)) {
        scopesPassed.push(...scopes);
      } else {
        scopesPassed.push(scopes);
      }

      throw new Error("Shortcircuit auth exception");
    },
  };

  it("using custom scopes and endpoints", async () => {
    const client = new LogsQueryClient(tokenCredential, {
      endpoint: "https://customEndpoint1",
    });

    try {
      await client.queryWorkspace("workspaceId", "query", { duration: Durations.fiveMinutes });
      assert.fail("Should have thrown");
    } catch (err: any) {
      assert.deepNestedInclude(err, {
        message: "Shortcircuit auth exception",
      });
    }
  });

  it("keeps custom request options in queryWorkspace", async () => {
    const client = new LogsQueryClient(
      {
        getToken: async () => Promise.resolve({ token: "token", expiresOnTimestamp: 1234567890 }),
      },
      {
        endpoint: "https://customEndpoint1",
      },
    );
    const testPipelinePolicy = {
      name: "testPipelinePolicy",
      sendRequest: async (request: any) => {
        assert.equal(request.headers.get("randomHeader"), "4321");
        assert.equal(request.timeout, "3333");
        return {
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: `{ "tables": [] }`,
        };
      },
    };
    const testOptions: LogsQueryOptions = {
      requestOptions: {
        timeout: 3333,
        headers: {
          randomHeader: "4321",
        },
      },
    };
    client.pipeline.addPolicy(testPipelinePolicy, { afterPhase: "Sign" });

    await client.queryWorkspace(
      "workspaceId",
      "query",
      {
        duration: Durations.fiveMinutes,
      },
      testOptions,
    );
  });

  it("keeps custom request options in queryResource", async () => {
    const client = new LogsQueryClient(
      {
        getToken: async () => Promise.resolve({ token: "token", expiresOnTimestamp: 1234567890 }),
      },
      {
        endpoint: "https://customEndpoint1",
      },
    );
    const testPipelinePolicy = {
      name: "testPipelinePolicy",
      sendRequest: async (request: any) => {
        assert.equal(request.headers.get("randomHeader"), "4321");
        assert.equal(request.timeout, "3333");
        return {
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: `{ "tables": [] }`,
        };
      },
    };
    const testOptions: LogsQueryOptions = {
      requestOptions: {
        timeout: 3333,
        headers: {
          randomHeader: "4321",
        },
      },
    };
    client.pipeline.addPolicy(testPipelinePolicy, { afterPhase: "Sign" });

    await client.queryResource(
      "workspaceId",
      "query",
      {
        duration: Durations.fiveMinutes,
      },
      testOptions,
    );
  });

  it("normalizes a leading slash in queryResource resourceId", async () => {
    const requestUrls: string[] = [];
    const client = new LogsQueryClient(
      {
        getToken: async () => Promise.resolve({ token: "token", expiresOnTimestamp: 1234567890 }),
      },
      {
        endpoint: "https://customEndpoint1/v1",
      },
    );
    const testPipelinePolicy = {
      name: "captureUrlPolicy",
      sendRequest: async (request: any) => {
        requestUrls.push(request.url);
        return {
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: `{ "tables": [] }`,
        };
      },
    };
    client.pipeline.addPolicy(testPipelinePolicy, { afterPhase: "Sign" });

    const resourceId =
      "/subscriptions/sub/resourceGroups/rg/providers/microsoft.insights/components/comp";

    await client.queryResource(resourceId, "query", { duration: Durations.fiveMinutes });
    await client.queryResource(resourceId.slice(1), "query", { duration: Durations.fiveMinutes });

    assert.lengthOf(requestUrls, 2);
    // A leading slash on the resource ID must not produce a double slash after the
    // API version segment (regression test for the malformed-URL 403 bug).
    for (const url of requestUrls) {
      assert.notInclude(url, "/v1//", `URL should not contain a double slash: ${url}`);
      assert.include(
        url,
        "/v1/subscriptions/sub/resourceGroups/rg/providers/microsoft.insights/components/comp/query",
      );
    }
    // Both a leading-slash and a no-leading-slash resource ID resolve to the same URL.
    assert.equal(requestUrls[0], requestUrls[1]);
  });
});
