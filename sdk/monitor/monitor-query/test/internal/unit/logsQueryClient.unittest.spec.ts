// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Durations, LogsQueryClient } from "../../../src";
import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { assert } from "@azure/test-utils";

describe("LogsQueryClient unit tests", () => {
  /**
   * Custom scopes and endpoints are needed if you're connecting to
   * a government cloud, for instance.
   */
  const scopesPassed: string[] = [];

  const tokenCredential: TokenCredential = {
    async getToken(
      scopes: string | string[],
      _options?: GetTokenOptions
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

    assert.equal(client["_logAnalytics"].$host, "https://customEndpoint1");
    assert.equal(client["_logAnalytics"]["_endpoint"], "https://customEndpoint1");

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
    await assert.supportsTracing(
      async (options) => {
        const promises: Promise<any>[] = [
          client.queryWorkspace(
            "workspaceId",
            "query",
            { duration: Durations.fiveMinutes },
            options
          ),
          client.queryBatch(
            [
              {
                workspaceId: "monitorWorkspaceId",
                query: "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1",
                timespan: { duration: "P1D" },
              },
            ],
            options
          ),
        ];
        // We don't care about errors, only that we created (and closed) the appropriate spans.
        await Promise.all(promises.map((p) => p.catch(() => undefined)));
      },
      ["LogsQueryClient.queryWorkspace", "LogsQueryClient.queryBatch"]
    );
  });
});
