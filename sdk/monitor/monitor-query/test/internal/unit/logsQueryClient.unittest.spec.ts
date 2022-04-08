// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Durations, LogsQueryClient } from "../../../src";
import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { assert } from "chai";
import { DefaultAzureCredential } from "@azure/identity";

describe("LogsQueryClient unit tests", () => {
  /**
   * Custom scopes and endpoints are needed if you're connecting to
   * a government cloud, for instance.
   */
  it("using custom scopes and endpoints", async () => {
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
    const credential = new DefaultAzureCredential();
    const client = new LogsQueryClient(credential, {
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
          client.queryBatch([
            {
              workspaceId: "monitorWorkspaceId",
              query: "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1",
              timespan: { duration: "P1D" },
            },
            {
              workspaceId: "monitorWorkspaceId",
              query: "AzureActivity | summarize count()",
              timespan: { duration: "PT1H" },
            },
            {
              workspaceId: "monitorWorkspaceId",
              query:
                "AppRequests | take 10 | summarize avgRequestDuration=avg(DurationMs) by bin(TimeGenerated, 10m), _ResourceId",
              timespan: { duration: "PT1H" },
            },
            {
              workspaceId: "monitorWorkspaceId",
              query: "AppRequests | take 2",
              timespan: { duration: "PT1H" },
              includeQueryStatistics: true,
            },
          ])
        ];
        // We don't care about errors, only that we created (and closed) the appropriate spans.
        await Promise.all(promises.map((p) => p.catch(() => undefined)));
      },
      ["LogsQueryClient.queryWorkspace",
       "LogsQueryClient.queryBatch"]
    );
  });
});
