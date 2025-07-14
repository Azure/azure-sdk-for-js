// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ArtifactsClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new ArtifactsClient(
      new DefaultAzureCredential(),
      "https://mysynapse.dev.azuresynapse.net",
    );
    // @ts-preserve-whitespace
    const pipelinesByWorkspace = client.pipelineOperations.listPipelinesByWorkspace();
    for await (const pipeline of pipelinesByWorkspace) {
      console.log(`Pipeline ID: ${pipeline.id}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
