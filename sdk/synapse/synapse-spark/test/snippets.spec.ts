// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SparkClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new SparkClient(
      new DefaultAzureCredential(),
      "https://mysynapse.dev.azuresynapse.net",
      "mysparkpool",
    );
    // @ts-preserve-whitespace
    const output = await client.sparkBatch.getSparkBatchJobs();
    if (output.sessions) {
      for (const sparkBatchJob of output.sessions) {
        console.log(`Spark batch job name: ${sparkBatchJob.name}`);
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
