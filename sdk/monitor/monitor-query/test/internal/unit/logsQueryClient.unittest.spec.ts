// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Durations, LogsQueryClient } from "../../../src";
import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { assert } from "chai";

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
      }
    };

    const client = new LogsQueryClient(tokenCredential, {
      endpoint: "https://customEndpoint1"
    });

    assert.equal(client["_logAnalytics"].$host, "https://customEndpoint1");
    assert.equal(client["_logAnalytics"]["_baseUri"], "https://customEndpoint1");

    try {
      await client.queryWorkspace("workspaceId", "query", { duration: Durations.fiveMinutes });
      assert.fail("Should have thrown");
    } catch (err) {
      assert.deepNestedInclude(err, {
        message: "Shortcircuit auth exception"
      });
    }
  });
});
