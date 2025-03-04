// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedPrivateEndpointsClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new ManagedPrivateEndpointsClient(
      new DefaultAzureCredential(),
      "https://mysynapse.dev.azuresynapse.net",
    );
    // @ts-preserve-whitespace
    const privateEndpoints = client.managedPrivateEndpoints.list("myvnet");
    for await (const privateEndpoint of privateEndpoints) {
      console.log(`Private endpoint name: ${privateEndpoint.name}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
