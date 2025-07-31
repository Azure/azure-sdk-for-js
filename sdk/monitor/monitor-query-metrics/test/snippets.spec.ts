// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MetricsClient,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { config } from "dotenv";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Create a MetricsClient
    const endpoint = " https://<endpoint>.monitor.azure.com/";
    const metricsClient = new MetricsClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClientSovereign", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Create a MetricsClient
    const endpoint = " https://<endpoint>.monitor.azure.cn/";
    const metricsClient = new MetricsClient(endpoint, credential, {
      audience: "https://monitor.azure.cn/.default",
    });
  });

  it("ReadmeSampleMetricsQueryMultipleResources", async () => {
    const resourceIds = [
      "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs",
      "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs2",
    ];
    const metricsNamespace = "<YOUR_METRICS_NAMESPACE>";
    const metricNames = ["requests", "count"];
    const endpoint = " https://<endpoint>.monitor.azure.com/";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const metricsClient = new MetricsClient(endpoint, credential);
    // @ts-preserve-whitespace
    const result = await metricsClient.queryResources(resourceIds, metricNames, metricsNamespace);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });

  it("DotEnvSample", async () => {
    config();
  });
});
