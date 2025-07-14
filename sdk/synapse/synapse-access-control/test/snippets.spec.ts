// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessControlClient } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new AccessControlClient(
      new DefaultAzureCredential(),
      "https://mysynapse.dev.azuresynapse.net",
    );
    // @ts-preserve-whitespace
    const roleDefinitions = await client.roleDefinitions.listRoleDefinitions();
    for await (const roleDefinition of roleDefinitions) {
      console.log(`Role Definition ID: ${roleDefinition.id}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
