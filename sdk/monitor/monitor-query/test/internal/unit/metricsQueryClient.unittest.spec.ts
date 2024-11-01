// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { Durations, MetricsQueryClient } from "../../../src/index.js";
import { describe, it, expect } from "vitest";
import type { OperationOptions } from "@azure/core-client";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({ toSupportTracing });

describe("MetricsQueryClient unit tests", () => {
  it("verify tracing", async () => {
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
    const client = new MetricsQueryClient(tokenCredential, {
      endpoint: "https://customEndpoint1",
    });
    await expect(async (options: OperationOptions) => {
      const promises: Promise<any>[] = [
        client.queryResource("resourceId", ["metricName1", "metricName2"], {
          granularity: "PT1M",
          timespan: { duration: Durations.fiveMinutes },
          ...options,
        }),
        client.listMetricNamespaces("resourceUri", options).next(),
        client.listMetricDefinitions("resourceUri", options).next(),
      ];
      // We don't care about errors, only that we created (and closed) the appropriate spans.
      await Promise.all(promises.map((p) => p.catch(() => undefined)));
    }).toSupportTracing([
      "MetricsQueryClient.queryResource",
      "MetricsQueryClient.listSegmentOfMetricNamespaces",
      "MetricsQueryClient.listSegmentOfMetricDefinitions",
    ]);
  });
});
