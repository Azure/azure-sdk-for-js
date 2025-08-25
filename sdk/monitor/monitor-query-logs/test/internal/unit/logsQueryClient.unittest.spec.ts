// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LogsQueryOptions } from "@azure/monitor-query-logs";
import { Durations, LogsQueryClient } from "@azure/monitor-query-logs";
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
});
