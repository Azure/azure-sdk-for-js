// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitoringClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new MonitoringClient(
      new DefaultAzureCredential(),
      "https://mysynapse.dev.azuresynapse.net",
    );
    // @ts-preserve-whitespace
    const sparkJobList = await client.monitoring.getSparkJobList();
    // @ts-preserve-whitespace
    if (sparkJobList.sparkJobs) {
      for (const sparkJob of sparkJobList.sparkJobs) {
        console.log(`Spark job name: ${sparkJob.name}`);
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
