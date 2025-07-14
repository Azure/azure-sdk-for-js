// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Durations, LogsQueryClient, LogsQueryOptions } from "../../../src/index.js";
import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, it, assert, expect } from "vitest";
import type { OperationOptions } from "@azure/core-client";
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

    assert.equal(client["_logAnalytics"].$host, "https://customendpoint1/v1");
    assert.equal(client["_logAnalytics"]["_endpoint"], "https://customendpoint1/v1");

    try {
      await client.queryWorkspace("workspaceId", "query", { duration: Durations.fiveMinutes });
      assert.fail("Should have thrown");
    } catch (err: any) {
      assert.deepNestedInclude(err, {
        message: "Shortcircuit auth exception",
      });
    }
  });

  it("verify tracing", async () => {
    const client = new LogsQueryClient(tokenCredential, {
      endpoint: "https://customEndpoint1",
    });
    await expect(async (options: OperationOptions) => {
      const promises: Promise<any>[] = [
        client.queryWorkspace("workspaceId", "query", { duration: Durations.fiveMinutes }, options),
        client.queryBatch(
          [
            {
              workspaceId: "monitorWorkspaceId",
              query: "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1",
              timespan: { duration: "P1D" },
            },
          ],
          options,
        ),
      ];
      // We don't care about errors, only that we created (and closed) the appropriate spans.
      await Promise.all(promises.map((p) => p.catch(() => undefined)));
    }).toSupportTracing(["LogsQueryClient.queryWorkspace", "LogsQueryClient.queryBatch"]);
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
        console.dir(request);
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
        customHeaders: {
          randomHeader: "4321",
        },
      },
    };
    client["_logAnalytics"].pipeline.addPolicy(testPipelinePolicy, { afterPhase: "Sign" });

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
        customHeaders: {
          randomHeader: "4321",
        },
      },
    };
    client["_logAnalytics"].pipeline.addPolicy(testPipelinePolicy, { afterPhase: "Sign" });

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
